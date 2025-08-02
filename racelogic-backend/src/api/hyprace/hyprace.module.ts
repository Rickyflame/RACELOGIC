// src/api/hyprace/hyprace.module.ts
import { Module } from '@nestjs/common';
import { HypraceService } from './hyprace.service';
import { HypraceController } from './hyprace.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  providers: [HypraceService],
  controllers: [HypraceController],
  exports: [HypraceService],
})
export class HypraceModule {}
