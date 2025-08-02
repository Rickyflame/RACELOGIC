import { Controller, Get } from '@nestjs/common';
import { F1Service } from './f1.service';

@Controller('f1')
export class F1Controller {
  constructor(private readonly f1Service: F1Service) {}

  @Get('races')
  getRaces() {
    return this.f1Service.getAllRaces();
  }
}
