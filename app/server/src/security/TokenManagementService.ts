import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@config/customConfig';

@Injectable()
export class TokenManagementService {
  constructor(private configService: ConfigService, private httpService: HttpService) {}

  async getAccessToken(): Promise<string> {
    return this.configService.getStarAccessToken as string;
  }
}
