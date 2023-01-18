const paymentMethodTypeMap: {
  [x: string]: 'CREDIT_CARD' | 'DEBIT_CARD' | 'PIX' | 'BOLETO';
} = {
  CREDIT_CARD: 'CREDIT_CARD',
  DEBIT_CARD: 'DEBIT_CARD',
  PIX: 'PIX',
  BOLETO: 'BOLETO',
};

export type PaymentMethodType =
  (typeof paymentMethodTypeMap)[keyof typeof paymentMethodTypeMap];
