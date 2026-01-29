import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Application } from 'src/interfaces/application.interface';

export const AppClient = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): Application | undefined => {
    const request: any = ctx.switchToHttp().getRequest();
    return request.application as Application | undefined;
  },
);
