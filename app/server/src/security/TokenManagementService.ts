import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { firstValueFrom } from 'rxjs';
import { ConfigService } from '@config/customConfig';

@Injectable()
export class TokenManagementService {
  private accessToken: string | undefined = undefined;

  constructor(private configService: ConfigService, private httpService: HttpService) {}

  async getAccessToken(): Promise<string> {
    if (this.accessToken) {
      return this.accessToken;
    }

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

      this.accessToken = response.data.access_token;
      // TODO - extract refresh token and expiration time and store them
    } catch (error: any) {
      throw new HttpException('Failed with status code 500', HttpStatus.INTERNAL_SERVER_ERROR);
    }

    return this.accessToken as string;
  }
}
