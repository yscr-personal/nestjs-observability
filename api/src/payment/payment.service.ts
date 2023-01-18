import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { CreatePaymentDTO } from './interfaces';

@Injectable()
export class PaymentService {
  private readonly logger = new Logger(this.constructor.name);

  constructor(
    @Inject('PAYMENT_MICROSERVICE') private readonly paymentClient: ClientKafka,
  ) {}

  async receivePayment(payment: CreatePaymentDTO) {
    this.logger.log(`[PaymentService] receivePayment() called`);
    this.paymentClient.send('process-payment', payment);
  }
}
