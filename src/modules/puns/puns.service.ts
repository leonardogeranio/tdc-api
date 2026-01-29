// src/modules/puns/puns.service.ts
import { Injectable } from '@nestjs/common';
import { PUNS } from './puns.data';
import { Pun } from './pun.interface';

@Injectable()
export class PunsService {
  getRandom(): Pun {
    const index = Math.floor(Math.random() * PUNS.length);
    return PUNS[index];
  }
}
