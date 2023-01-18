const ecsFormat = require('@elastic/ecs-winston-format');
import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { WinstonModule } from 'nest-winston';
import { createLogger as createWinstonLogger, transports } from 'winston';
import { AppModule } from './app.module';
import { PrismaService } from './prisma/prisma.service';

const logger = createWinstonLogger({
  level: 'debug',
  format: ecsFormat({ convertReqRes: true }),
  defaultMeta: {
    environment: process.env.NODE_ENV,
    app: 'observability-workshop-api',
  },
  transports: [
    new transports.Console(),
    new transports.File({
      filename: 'logs/log.json',
    }),
  ],
});

function setupOpenApi(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('Observability Workshop API')
    .setDescription('The API for the Observability Workshop')
    .setVersion('1.0')
    .addTag('observability-workshop-api')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
}

async function setupApi(app: INestApplication) {
  const configService = app.get(ConfigService);
  const PORT = configService.get<number>('PORT');
  return await app.listen(PORT, () => {
    logger.debug(`Listening on port ${PORT}`);
  });
}

async function setupPrisma(app: INestApplication) {
  const prismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app);
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
    logger: WinstonModule.createLogger({
      instance: logger,
    }),
  });
  setupOpenApi(app);
  await setupPrisma(app);
  return await setupApi(app);
}

bootstrap();
