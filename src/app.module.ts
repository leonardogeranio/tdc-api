import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { PunsModule } from './modules/puns/puns.module';
import { RateLimitMiddleware } from './middlewares/rate-limit.middleware';
import { SignatureMiddleware } from './middlewares/signature.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PunsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(SignatureMiddleware, RateLimitMiddleware).forRoutes('*');
  }
}
