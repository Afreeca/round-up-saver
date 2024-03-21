import { Injectable } from '@nestjs/common';
import { ConfigService as NestConfigService } from '@nestjs/config';

@Injectable()
export class ConfigService extends NestConfigService {
  get getAppPort(): number {
    return this.get<number>('APP_PORT');
  }

  get getAppName(): number {
    return this.get<number>('APP_NAME');
  }

  get getEnvironment(): number {
    return this.get<number>('NODE_ENV');
  }

  get getStarHost(): string {
    return this.get<string>('STARLING_SANDBOX_HOST');
  }

  get getStarClientId(): string {
    return this.get<string>('STARLING_CLIENT_ID');
  }

  get getStarSecret(): string {
    return this.get<string>('STARLING_SECRET');
  }
}
