import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { firstValueFrom } from 'rxjs';
import { ConfigService } from 'src/config/customConfig';

@Injectable()
export class TokenManagementService {
  private accessToken: string;

  constructor(private configService: ConfigService, private httpService: HttpService) {}

  async getAccessToken(): Promise<string> {
    const data = new URLSearchParams();
    data.append('grant_type', 'refresh_token');
    data.append('client_id', `${this.configService.getStarClientId}`);
    data.append('client_secret', `${this.configService.getStarSecret}`);
    data.append('refresh_token', `${this.configService.getStarRefresh}`);

    try {
      const response: AxiosResponse = await firstValueFrom(
        this.httpService.post(`${this.configService.getStarHost}/oauth/access-token`, data.toString(), {
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        })
      );

      // extract access token, refresh token, and expiration time from response
      this.accessToken = response.data.access_token;
      // TODO - store the new refresh token and the inspiraction, so we don't need to fetch the token on every single resquest
    } catch (error: any) {
      console.error('Error fetching access token:', error.response?.data || error.message);
      throw new HttpException('Failed with status code 500', HttpStatus.INTERNAL_SERVER_ERROR);
    }

    return this.accessToken;
  }
}
