// src/example/example.controller.ts
import { Controller, Get } from '@nestjs/common';
import { AppClient } from 'src/decorators/app.decorator';
import type { Application } from 'src/interfaces/application.interface';
import { PunsService } from './puns.service';
import { PunResponseDTO } from './pun-response.dto';

@Controller('puns')
export class PunsController {

  constructor(private readonly punsService: PunsService) {}

  @Get()
  getPublicData(@AppClient() app: Application) {
    return {
      message: 'Conteúdo público',
      client: app.id,
    };
  }

  @Get('random')
  getRandomPun(): PunResponseDTO {
    const pun = this.punsService.getRandom();

    return {
      id: pun.id,
      question: pun.question,
      answer: pun.answer,
    };
  }
}
