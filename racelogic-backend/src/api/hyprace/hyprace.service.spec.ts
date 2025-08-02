import { Test, TestingModule } from '@nestjs/testing';
import { HypraceService } from './hyprace.service';

describe('HypraceService', () => {
  let service: HypraceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HypraceService],
    }).compile();

    service = module.get<HypraceService>(HypraceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
