import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import * as express from 'express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule, { cors: true },
  );
  const configService: ConfigService = app.get(ConfigService);
  const port   = configService.get<string>('PORT') || 3000;
  const logger = new Logger('App start');
  app.use('/public', express.static(join(__dirname, '..', 'public')));
  app.setGlobalPrefix('api');
  await app.listen(port);
  logger.log('server running on port: ' + port);
}
bootstrap();
