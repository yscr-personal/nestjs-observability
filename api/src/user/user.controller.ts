import { Body, Controller, Get, Logger, Post, Query } from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { User } from '@prisma/client';
import { InjectMetric } from '@willsoto/nestjs-prometheus';
import { Counter } from 'prom-client';
import { CreateUserDto } from './interfaces';
import { UserService } from './user.service';

@ApiTags('user')
@Controller('user')
export class UserController {
  private readonly logger = new Logger(this.constructor.name);

  constructor(
    private readonly userService: UserService,
    @InjectMetric('list_users') private readonly counter: Counter,
  ) {}

  @Get()
  @ApiOkResponse({
    description: 'The records have been successfully retrieved.',
  })
  async getAllUsers(
    @Query('skip') skip: string,
    @Query('take') take: string,
  ): Promise<User[]> {
    this.logger.log('[UserController] getAllUsers() called');
    try {
      const users = await this.userService.users({
        skip: parseInt(skip),
        take: parseInt(take),
      });
      this.counter.inc({ status: 'success', exception: 'none' });
      return users;
    } catch (e) {
      this.logger.error(`[UserController] getAllUsers() failed: ${e.message}`);
      this.counter.inc({ status: 'error', exception: e.name });
      throw e;
    }
  }

  @Post()
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
  })
  @ApiInternalServerErrorResponse({
    description: 'An error occurred while creating the record.',
  })
  async createUser(@Body() userData: CreateUserDto): Promise<User> {
    this.logger.log('[UserController] createUser() called');
    try {
      return await this.userService.createUser(userData);
    } catch (e) {
      this.logger.error(`[UserController] createUser() failed: ${e.message}`);
      throw e;
    }
  }

  @Get('exception')
  @ApiInternalServerErrorResponse({
    description: 'test sentry integration',
  })
  callSentry() {
    this.logger.log('[UserController] callSentry() called');
    throw new Error('This is a test exception');
  }
}
