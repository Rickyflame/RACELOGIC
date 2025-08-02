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

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({
      isGlobal: true, //makes config available everywhere
    }),
    HypraceModule,
    PrismaModule,
  ],
  controllers: [AppController, HealthController],
  providers: [AppService, CronService, HypraceService],
})
export class AppModule {}
