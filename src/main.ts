import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppKeyGuard } from './guards/app-key.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalGuards(new AppKeyGuard());

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
