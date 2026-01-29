// src/modules/puns/puns.module.ts
import { Module } from '@nestjs/common';
import { PunsController } from './puns.controller';
import { PunsService } from './puns.service';

@Module({
  controllers: [PunsController],
  providers: [PunsService],
})
export class PunsModule {}
