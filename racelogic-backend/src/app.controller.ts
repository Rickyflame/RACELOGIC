import { Controller, Get } from '@nestjs/common';

import { HypraceService } from './api/hyprace/hyprace.service';

@Controller()
export class AppController {
  constructor(private readonly hypraceService: HypraceService) {}

  @Get('hyprace/test')
  async testHyprace() {
    return this.hypraceService.fetchQualifyingResults();
  }
}
