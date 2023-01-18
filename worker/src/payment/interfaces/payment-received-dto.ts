import { PaymentMethodType } from './payment-method-type';
import { PaymentSupportedCurrency } from './payment-supported-currency';

export type PaymentReceivedDTO = {
  amount: number;
  user_id: string;
  currency: PaymentSupportedCurrency;
  payment_method_type: PaymentMethodType;
  created_at: Date;
  updated_at: Date;
};
