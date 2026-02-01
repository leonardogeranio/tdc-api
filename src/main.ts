import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppKeyGuard } from './guards/app-key.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalGuards(new AppKeyGuard());

  app.enableCors({
    origin: '*', // em dev pode deixar *, depois você restringe se quiser
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: [
      'Content-Type',
      'Accept',
      'x-app-key',
      'x-appkey',
      'x-app_key',
      'x-signature',
      'x-timestamp',
    ],
  });

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
