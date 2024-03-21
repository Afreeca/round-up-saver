import { Logger, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { validate } from './config/validation';
import { ConfigService } from './config/customConfig';
import { LoggerModule } from 'nestjs-pino';

@Module({
  imports: [
    LoggerModule.forRoot(),
    ConfigModule.forRoot({
      isGlobal: true,
      validate,
      envFilePath: ['.env', '.dev.env'],
    }),
  ],
  controllers: [AppController],
  providers: [AppService, ConfigService, Logger],
})
export class AppModule {}
