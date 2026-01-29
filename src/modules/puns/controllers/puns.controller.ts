// src/example/example.controller.ts
import { Controller, Get } from '@nestjs/common';
import { AppClient } from 'src/decorators/app.decorator';
import type { Application } from 'src/interfaces/application.interface';

@Controller('puns')
export class PunsController {
  @Get()
  getPublicData(@AppClient() app: Application) {
    return {
      message: 'Conteúdo público',
      client: app.id,
    };
  }
}
