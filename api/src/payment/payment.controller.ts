import {
  Body,
  Controller,
  Inject,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
  Post,
} from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import { CreatePaymentDTO } from './interfaces/create-payment-dto';
import { PaymentService } from './payment.service';

@Controller('payment')
export class PaymentController implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(this.constructor.name);

  constructor(
    private readonly paymentService: PaymentService,
    @Inject('PAYMENT_MICROSERVICE') private readonly paymentClient: ClientKafka,
  ) {}

  async onModuleInit() {
    this.paymentClient.subscribeToResponseOf('process-payment');
    await this.paymentClient.connect();
  }

  async onModuleDestroy() {
    await this.paymentClient.close();
  }

  @Post('pay')
  @ApiOkResponse({ description: 'Payment created' })
  @ApiBadRequestResponse({ description: 'Payment not created' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  async createPayment(@Body() paymentData: CreatePaymentDTO) {
    this.logger.log('Payment received from API');
    try {
      return await this.paymentService.receivePayment(paymentData);
    } catch (error) {
      this.logger.error(
        `[PaymentController] createPayment() failed: ${error.message}`,
      );
      throw error;
    }
  }
}
