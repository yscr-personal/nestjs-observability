import { Controller, Get, Logger } from '@nestjs/common';
import {
  DiskHealthIndicator,
  HealthCheck,
  HealthCheckService,
  MemoryHealthIndicator,
} from '@nestjs/terminus';
import { PrismaHealthIndicator } from '@app/prisma/prisma.health';

@Controller('healthcheck')
export class HealthController {
  private readonly logger = new Logger(this.constructor.name);
  private readonly MEMORY_LIMIT = 150 * 1024 * 1024;
  private readonly DISK_LIMIT = 0.9;

  constructor(
    private readonly healthService: HealthCheckService,
    private readonly disk: DiskHealthIndicator,
    private readonly memory: MemoryHealthIndicator,
    private readonly database: PrismaHealthIndicator,
  ) {}

  @Get()
  @HealthCheck()
  async check() {
    this.logger.log('[HealthController] check() called');
    return await this.healthService.check([
      () => this.database.isHealthy('database'),
      () =>
        this.disk.checkStorage('disk', {
          thresholdPercent: this.DISK_LIMIT,
          path: '/',
        }),
      () => this.memory.checkHeap('memory_heap', this.MEMORY_LIMIT),
      () => this.memory.checkRSS('memory_rss', this.MEMORY_LIMIT),
    ]);
  }
}
