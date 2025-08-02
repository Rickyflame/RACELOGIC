import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class F1Service {
  async getAllRaces() {
    const options = {
      method: 'GET',
      url: 'https://hyprace-api.p.rapidapi.com/v2/grands-prix/4c0fc237-e21e-4b9c-b70d-c0d68764e338/qualifying/01e0a0e2-04cb-4bd5-80a8-999aa88f764c/results',
      headers: {
        'x-rapidapi-key': 'c39a4159cdmshd1311c99a2dde7cp1ae580jsn0ddfa30e4a38',
        'x-rapidapi-host': 'hyprace-api.p.rapidapi.com',
      },
    };

    try {
      const response = await axios.request(options);
      return response.data as unknown;
    } catch (error) {
      console.error(
        'Failed to fetch data from Hyprace:',
        error instanceof Error ? error.message : 'Unknown error',
      );
      return { error: 'Unable to fetch race data' };
    }
  }
}
