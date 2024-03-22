import { Logger, Module } from '@nestjs/common';

import { LoggerModule } from 'nestjs-pino';
import { HttpModule } from '@nestjs/axios';

import { ConfigService } from 'src/config/customConfig';
import { RoundUpController } from './roundup.controller';
import { RoundUpService } from './roundup.service';
import { AccountService } from 'src/account/account.service';

@Module({
  imports: [LoggerModule.forRoot(), HttpModule],
  controllers: [RoundUpController],
  providers: [RoundUpService, ConfigService, AccountService, Logger],
})
export class RoundUpModule {}
