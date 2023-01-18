import { PrismaService } from '@app/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { PaymentReceivedDTO } from './interfaces';

@Injectable()
export class PaymentService {
  constructor(private readonly prisma: PrismaService) {}

  async createPayment(paymentDTO: PaymentReceivedDTO) {
    return await this.prisma.payment.create({
      data: paymentDTO,
    });
  }
}
