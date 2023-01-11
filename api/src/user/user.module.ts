import { Module } from '@nestjs/common';
import { PrismaService } from '@app/prisma/prisma.service';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { makeCounterProvider } from '@willsoto/nestjs-prometheus';

@Module({
  controllers: [UserController],
  providers: [
    UserService,
    PrismaService,
    makeCounterProvider({
      name: 'list_users',
      help: 'Number of times the list users endpoint has been called',
      labelNames: ['status', 'exception'],
    }),
  ],
})
export class UserModule {}
