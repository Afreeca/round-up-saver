import { Logger, Module } from '@nestjs/common';
import { LoggerModule } from 'nestjs-pino';
import { HttpModule } from '@nestjs/axios';
import { ConfigService } from '@config/customConfig';
import { RoundUpController } from '@roundup/roundup.controller';
import { RoundUpService } from '@roundup/roundup.service';
import { AccountService } from '@account/account.service';
import { TokenManagementService } from '@security/TokenManagementService';

@Module({
  imports: [LoggerModule.forRoot(), HttpModule],
  controllers: [RoundUpController],
  providers: [RoundUpService, ConfigService, AccountService, TokenManagementService, Logger]
})
export class RoundUpModule {}
