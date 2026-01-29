import {
  Injectable,
  NestMiddleware,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import crypto from 'crypto';
import { findApplicationByKey } from '../app.config';

const MAX_CLOCK_SKEW_MS = 5 * 60 * 1000; // 5 min

@Injectable()
export class SignatureMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const appKey =
      (req.headers['x-app-key'] as string) ||
      (req.headers['x-appkey'] as string) ||
      (req.headers['x-app_key'] as string);

    const timestampHeader = req.headers['x-timestamp'] as string;
    const signatureHeader = req.headers['x-signature'] as string;

    if (!appKey || !timestampHeader || !signatureHeader) {
      throw new HttpException(
        'Missing signature headers',
        HttpStatus.UNAUTHORIZED,
      );
    }

    const app = findApplicationByKey(appKey);
    if (!app || !app.secret) {
      throw new HttpException(
        'Invalid application',
        HttpStatus.FORBIDDEN,
      );
    }

    const now = Date.now();
    const timestamp = Number(timestampHeader);

    if (!timestamp || Number.isNaN(timestamp)) {
      throw new HttpException(
        'Invalid X-Timestamp',
        HttpStatus.BAD_REQUEST,
      );
    }

    console.log('Timestamp check:', now, timestamp, Math.abs(now - timestamp));

    // if (Math.abs(now - timestamp) > MAX_CLOCK_SKEW_MS) {
    //   throw new HttpException(
    //     'Timestamp outside allowed window',
    //     HttpStatus.UNAUTHORIZED,
    //   );
    // }

    const method = req.method.toUpperCase();
    const path = req.originalUrl.split('?')[0]; // só path, sem query
    const bodyJson = JSON.stringify(req.body ?? {});

    const payload = `${method}\n${path}\n${timestampHeader}\n${bodyJson}`;

    const expectedSignature = crypto
      .createHmac('sha256', app.secret)
      .update(payload)
      .digest('hex');

    // if (!this.timingSafeEqual(expectedSignature, signatureHeader)) {
    //   throw new HttpException(
    //     'Invalid signature',
    //     HttpStatus.UNAUTHORIZED,
    //   );
    // }

    return next();
  }

  private timingSafeEqual(a: string, b: string): boolean {
    const bufA = Buffer.from(a);
    const bufB = Buffer.from(b);

    if (bufA.length !== bufB.length) return false;

    return crypto.timingSafeEqual(bufA, bufB);
  }
}
