import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { validate } from './config/validation';
import { LoggerModule } from 'nestjs-pino';
import { HttpModule } from '@nestjs/axios';
import { AccountModule } from './account/account.module';
import { RoundUpModule } from './roundup/roundup.module';

@Module({
  imports: [
    LoggerModule.forRoot(),
    ConfigModule.forRoot({
      isGlobal: true,
      validate,
      envFilePath: ['.env', '.dev.env']
    }),
    HttpModule,
    AccountModule,
    RoundUpModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
