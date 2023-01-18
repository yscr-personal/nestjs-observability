const paymentSupportedCurrencyMap: {
  [x: string]: 'BRL' | 'USD' | 'EUR';
} = {
  BRL: 'BRL',
  USD: 'USD',
  EUR: 'EUR',
};

export type PaymentSupportedCurrency =
  (typeof paymentSupportedCurrencyMap)[keyof typeof paymentSupportedCurrencyMap];
