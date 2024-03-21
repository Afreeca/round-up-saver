import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from './config/customConfig';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.setGlobalPrefix('api'); // add 'api' as a prefix for all api routing path

  const logger = app.get(Logger);
  const configService = app.get(ConfigService);
  const appName = configService.getAppName;
  const env = configService.getEnvironment;
  const port = configService.getAppPort;

  logger.log({ msg: 'Server started', port, appName, env });
  await app.listen(port);
}
bootstrap();
