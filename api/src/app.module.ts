import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Sentry from '@sentry/node';
import '@sentry/tracing';
import { PrometheusModule } from '@willsoto/nestjs-prometheus';
import { HealthModule } from './health/health.module';
import { PaymentModule } from './payment/payment.module';
import { PrismaModule } from './prisma/prisma.module';
import { SentryModule } from './sentry/sentry.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrometheusModule.register({
      defaultLabels: { app: 'observability-workshop' },
    }),
    SentryModule.forRoot({
      tracesSampleRate: 1.0,
      debug: process.env.NODE_ENV !== 'production',
      environment: process.env.NODE_ENV ?? 'development',
    }),
    HealthModule,
    PrismaModule,
    UserModule,
    PaymentModule,
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(Sentry.Handlers.requestHandler()).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });
  }
}
