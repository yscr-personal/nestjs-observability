import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../prisma/prisma.service';
import { UserController } from '../user.controller';
import { UserService } from '../user.service';

describe('UserController', () => {
  let controller: UserController;

  beforeEach(async () => {
    const User: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService, PrismaService],
    }).compile();

    controller = User.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
