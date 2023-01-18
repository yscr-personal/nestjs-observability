import { PaymentMethodType } from './payment-method-type';
import { PaymentSupportedCurrency } from './payment-supported-currency';

export type CreatePaymentDTO = {
  amount: number;
  currency: PaymentSupportedCurrency;
  payment_method_type: PaymentMethodType;
};
