import { Controller, Get } from '@nestjs/common';
import { RaceService } from './race.service';

@Controller('race')
export class RaceController {
  constructor(private readonly raceService: RaceService) {}

  @Get('sample')
  getSampleData() {
    return this.raceService.findAll();
  }
}
