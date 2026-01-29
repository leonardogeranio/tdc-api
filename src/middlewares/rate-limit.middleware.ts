// src/middleware/rate-limit.middleware.ts
import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

type Key = string; // ip + appKey

interface RateEntry {
  count: number;
  resetAt: number; // timestamp em ms
}

const RATE_LIMIT_WINDOW_MS = 3_600_000; // 1 hour
const RATE_LIMIT_MAX_REQUESTS = 60; // 60 req/min for IP+App

const store = new Map<Key, RateEntry>();

@Injectable()
export class RateLimitMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const ip = (req.ip || req.socket.remoteAddress || '').toString();
    const appKeyHeader =
      (req.headers['x-app-key'] as string) ||
      (req.headers['x-appkey'] as string) ||
      (req.headers['x-app_key'] as string) ||
      'unknown';

    const key = `${ip}:${appKeyHeader}`;

    const now = Date.now();
    const existing = store.get(key);

    if (!existing || existing.resetAt < now) {
      store.set(key, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
      return next();
    }

    if (existing.count >= RATE_LIMIT_MAX_REQUESTS) {
      const secondsLeft = Math.ceil((existing.resetAt - now) / 1000);
      throw new HttpException(
        `Rate limit exceeded. Try again in ${secondsLeft}s`,
        HttpStatus.TOO_MANY_REQUESTS,
      );
    }

    existing.count += 1;
    return next();
  }
}
