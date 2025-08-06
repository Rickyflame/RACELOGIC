import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HealthController } from './health/health.controller';
import { ScheduleModule } from '@nestjs/schedule';
import { CronService } from './jobs/cron/cron.service';
import { HypraceService } from './api/hyprace/hyprace.service';
import { HypraceModule } from './api/hyprace/hyprace.module';
import { PrismaModule } from './prisma/prisma.module';
import { F1Module } from './f1/f1.module';
import { RaceModule } from './race/race.module';
import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({
      isGlobal: true, //makes config available everywhere
    }),
    HypraceModule,
    PrismaModule,
    F1Module,
    RaceModule,
  ],
  controllers: [AppController, HealthController],
  providers: [AppService, CronService, HypraceService, PrismaService],
})
export class AppModule {}
