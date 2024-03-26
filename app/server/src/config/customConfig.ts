import { Injectable } from '@nestjs/common';
import { ConfigService as NestConfigService } from '@nestjs/config';

@Injectable()
export class ConfigService extends NestConfigService {
  get getAppPort(): number | undefined {
    return this.get<number>('APP_PORT');
  }

  get getAppName(): number | undefined {
    return this.get<number>('APP_NAME');
  }

  get getEnvironment(): number | undefined {
    return this.get<number>('NODE_ENV');
  }

  get getStarHost(): string | undefined {
    return this.get<string>('STARLING_SANDBOX_HOST');
  }

  get getStarClientId(): string | undefined {
    return this.get<string>('STARLING_CLIENT_ID');
  }

  get getStarSecret(): string | undefined {
    return this.get<string>('STARLING_SECRET');
  }

  get getStarRefresh(): string | undefined {
    return this.get<string>('STARLING_REFRESH');
  }

  get getStarAccessToken(): string | undefined {
    return this.get<string>('STARLING_ACCESS_TOKEN');
  }
}
