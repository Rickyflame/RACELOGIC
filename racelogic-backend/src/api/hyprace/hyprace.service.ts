import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import * as fs from 'fs/promises';
import NodeCache from 'node-cache';

export interface QualifyingResult {
  id: string;
  driver: string;
  position: number;
  time: string;
}

@Injectable()
export class HypraceService {
  private readonly logger = new Logger(HypraceService.name);
  private readonly cache: NodeCache;

  constructor(private configService: ConfigService) {
    this.cache = new NodeCache({ stdTTL: 86400 }); // 24 hours
  }

  async fetchQualifyingResults(): Promise<QualifyingResult[]> {
    const isDev = this.configService.get<string>('NODE_ENV') === 'development';
    const cacheKey = 'qualifyingResults';

    // 1. Use mock data in development
    if (isDev) {
      try {
        const mockJson = await fs.readFile(
          'src/api/hyprace/mock-data.json',
          'utf-8',
        );
        const mockData: unknown = JSON.parse(mockJson);

        if (Array.isArray(mockData)) {
          this.logger.log('Using mock data for qualifying results');
          return mockData as QualifyingResult[];
        } else {
          throw new Error('Mock data is not an array');
        }
      } catch (error) {
        this.logger.error('Failed to load or parse mock data:', error);
        throw error;
      }
    }

    // 2. Use cache in production
    const cached = this.cache.get<QualifyingResult[]>(cacheKey);
    if (cached && Array.isArray(cached)) {
      this.logger.log('Serving qualifying results from cache');
      return cached;
    }

    // 3. Fetch from Hyprace API
    const url =
      'https://hyprace-api.p.rapidapi.com/v2/grands-prix/4c0fc237-e21e-4b9c-b70d-c0d6874e3382/qualifying/01e0a0e2-04cb-4bd5-80a8-999aa88f764c/results';

    const headers = {
      'X-RapidAPI-Key': this.configService.get<string>('HYPRACE_API_KEY') ?? '',
      'X-RapidAPI-Host':
        this.configService.get<string>('HYPRACE_API_HOST') ?? '',
    };

    try {
      const response = await axios.get(url, { headers });
      const results: unknown = response.data;

      if (Array.isArray(results)) {
        this.cache.set(cacheKey, results);
        this.logger.log('Fetched qualifying results from Hyprace API');
        return results as QualifyingResult[];
      } else {
        throw new Error('API response is not an array');
      }
    } catch (error) {
      this.logger.error('Error fetching Hyprace data:', error);
      throw error;
    }
  }
}
