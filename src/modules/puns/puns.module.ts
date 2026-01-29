// src/modules/puns/puns.module.ts
import { Module } from '@nestjs/common';
import { PunsController } from './controllers/puns.controller';

@Module({
  controllers: [PunsController],
})
export class PunsModule {}
