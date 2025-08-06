import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RaceService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.race.findMany({
      include: {
        Result: {
          include: {
            driver: true,
            team: true,
          },
        },
        sport: true,
      },
    });
  }
}
