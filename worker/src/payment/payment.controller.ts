import { Controller, Logger } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { PaymentReceivedDTO } from './interfaces';
import { PaymentService } from './payment.service';

@Controller('payment')
export class PaymentController {
  private readonly logger = new Logger(this.constructor.name);

  constructor(private readonly paymentService: PaymentService) {}

  @MessagePattern('process-payment')
  handleUserCreate(@Payload() data: { value: PaymentReceivedDTO }) {
    const { value: payment } = data;
    this.logger.log(`Payment received: ${JSON.stringify(payment)}`);
    this.paymentService.createPayment(payment);
  }
}
