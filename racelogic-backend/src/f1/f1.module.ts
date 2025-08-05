import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { F1Controller } from './f1.controller';
import { F1Service } from './f1.service';

@Module({
  imports: [HttpModule],
  controllers: [F1Controller],
  providers: [F1Service],
})
export class F1Module {}
