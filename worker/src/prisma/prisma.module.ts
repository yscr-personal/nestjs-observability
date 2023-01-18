import { Module } from '@nestjs/common';
import { PrismaHealthIndicator } from './prisma.health';
import { PrismaService } from './prisma.service';

@Module({
  providers: [PrismaService, PrismaHealthIndicator],
  exports: [PrismaHealthIndicator],
})
export class PrismaModule {}
