import { TokenManagementService } from './../security/TokenManagementService';
import { Logger, Module } from '@nestjs/common';

import { LoggerModule } from 'nestjs-pino';
import { HttpModule } from '@nestjs/axios';
import { AccountController } from './account.controller';
import { AccountService } from './account.service';
import { ConfigService } from 'src/config/customConfig';

@Module({
  imports: [LoggerModule.forRoot(), HttpModule],
  controllers: [AccountController],
  providers: [AccountService, ConfigService, TokenManagementService, Logger]
})
export class AccountModule {}
