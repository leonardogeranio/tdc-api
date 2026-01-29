import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { findApplicationByKey } from '../app.config';

@Injectable()
export class AppKeyGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const req: any = context.switchToHttp().getRequest();

    const appKey = (req.headers['x-app-key'] ??
      req.headers['x-appkey'] ??
      req.headers['x-app_key']) as string | string[] | undefined;

    const key: string | undefined = Array.isArray(appKey) ? appKey[0] : appKey;

    const app = findApplicationByKey(key);

    if (!key) {
      throw new UnauthorizedException('Missing X-App-Key header');
    }

    if (!app) {
      throw new ForbiddenException('Invalid or inactive app key');
    }

    req.application = app;

    return true;
  }
}
