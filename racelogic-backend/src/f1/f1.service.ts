import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { ConfigService } from '@nestjs/config';
import { AxiosResponse } from 'axios';
import { QualifyingResult } from './dto/qualifying-result.dto';

@Injectable()
export class F1Service {
  private readonly logger = new Logger(F1Service.name);
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async getAllRaces() {
    const apikey = this.configService.get<string>('HYPRACE_API_KEY');
    const apihost = this.configService.get<string>('HYPRACE_API_HOST');

    if (!apikey || !apihost) {
      const errorMsg = 'HYPRACE_API_KEY or HYPRACE_API_HOST is not configured';
      this.logger.error(errorMsg);
      return { error: errorMsg, message: '' };
    }

    const options = {
      method: 'GET',
      url: 'https://hyprace-api.p.rapidapi.com/v2/grands-prix/4c0fc237-e21e-4b9c-b70d-c0d68764e338/qualifying/01e0a0e2-04cb-4bd5-80a8-999aa88f764c/results',
      headers: {
        'x-rapidapi-key': apikey,
        'x-rapidapi-host': apihost,
      },
    };

    try {
      const response$ =
        this.httpService.request<AxiosResponse<QualifyingResult[]>>(options);
      const response = await firstValueFrom(response$);

      this.logger.debug(
        'Hyprace raw response:\n' + JSON.stringify(response.data, null, 2),
      );

      if (!response.data || typeof response.data !== 'object') {
        throw new Error('Invalid API response structure');
      }

      this.logger.log('Successfully fetched F1 data from Hyprace');
      return response.data;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error occurred';
      this.logger.error('Failed to fetch from Hyprace:', error);

      return {
        error: 'Failed to fetch F1 data',
        message: errorMessage,
      };
    }
  }
}
