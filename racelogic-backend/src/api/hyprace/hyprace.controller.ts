// src/api/hyprace/hyprace.controller.ts
import { Controller, Get } from '@nestjs/common';
import { HypraceService, QualifyingResult } from './hyprace.service';

@Controller('hyprace')
export class HypraceController {
  constructor(private readonly hypraceService: HypraceService) {}

  @Get('qualifying')
  async getQualifyingResults(): Promise<QualifyingResult[]> {
    return this.hypraceService.fetchQualifyingResults();
  }
}
