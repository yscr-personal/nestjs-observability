const ecsFormat = require('@elastic/ecs-winston-format');
import { INestMicroservice } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { WinstonModule } from 'nest-winston';
import { createLogger as createWinstonLogger, transports } from 'winston';
import { AppModule } from './app.module';
import { PrismaService } from './prisma/prisma.service';

const logger = createWinstonLogger({
  level: 'debug',
  format: ecsFormat({ convertReqRes: true }),
  defaultMeta: {
    environment: process.env.NODE_ENV,
    app: 'observability-workshop-worker',
  },
  transports: [
    new transports.Console(),
    new transports.File({
      filename: 'logs/log.json',
    }),
  ],
});

async function setupPrisma(app: INestMicroservice) {
  const prismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app);
}

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.KAFKA,
      options: {
        client: {
          brokers: ['kafka:9092'],
        },
        consumer: {
          groupId: 'payment-consumer',
        },
      },
      logger: WinstonModule.createLogger({
        instance: logger,
      }),
    },
  );
  await setupPrisma(app);
  return await app.listen();
}

bootstrap();
