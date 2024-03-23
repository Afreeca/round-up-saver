import { Logger, Module } from '@nestjs/common';

import { LoggerModule } from 'nestjs-pino';
import { HttpModule } from '@nestjs/axios';

import { ConfigService } from 'src/config/customConfig';
import { RoundUpController } from './roundup.controller';
import { RoundUpService } from './roundup.service';
import { AccountService } from 'src/account/account.service';
import { TokenManagementService } from 'src/security/TokenManagementService';

@Module({
  imports: [LoggerModule.forRoot(), HttpModule],
  controllers: [RoundUpController],
  providers: [RoundUpService, ConfigService, AccountService, TokenManagementService, Logger]
})
export class RoundUpModule {}
