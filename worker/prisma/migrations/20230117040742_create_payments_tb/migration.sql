-- CreateEnum
CREATE TYPE "EnumCurrency" AS ENUM ('BRL', 'USD', 'EUR');

-- CreateEnum
CREATE TYPE "EnumPaymentMethodType" AS ENUM ('CREDIT_CARD', 'DEBIT_CARD', 'PIX', 'BOLETO');

-- CreateTable
CREATE TABLE "Payment" (
    "id" SERIAL NOT NULL,
    "amount" DECIMAL(65,30) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,
    "currency" "EnumCurrency" NOT NULL,
    "payment_method_type" "EnumPaymentMethodType" NOT NULL,

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("id")
);
