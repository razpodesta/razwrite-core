/**
 * @apparatus FinancialCoreDNA
 * @role Contratos genéticos para el sellado de pagos y comunicación inter-hilos.
 * @location libs/integrations/financial-transaction/src/lib/financial-core/financial-core.schema.ts
 * @status <SEALED_PRODUCTION>
 * @version 1.3.0
 * @protocol OEDP-V8.5 Lattice
 */

import { z } from 'zod';

// Identificadores Nominales (Branding)
export const CurrencyCodeSchema = z.enum(['USD', 'EUR', 'CLP', 'BRL', 'CNY']).brand<'CurrencyCode'>();
export const TransactionStatusSchema = z.enum(['PENDING', 'AUTHORIZED', 'SETTLED', 'FAILED', 'REFUNDED']);
export const TransactionIdentifierSchema = z.string().uuid().brand<'TransactionIdentifier'>();
export const OrderCorrelationIdentifierSchema = z.string().uuid().brand<'OrderCorrelationIdentifier'>();
export const PaymentMethodOpaqueTokenSchema = z.string().min(10).brand<'PaymentMethodOpaqueToken'>();

// OpCodes para el Sistema Nervioso Soberano (SNS)
export const FinancialIntentOpCode = {
  EXECUTE_PAYMENT: 'INTENT_EXECUTE_FINANCIAL_PAYMENT',
  REFUND_TRANSACTION: 'INTENT_REFUND_FINANCIAL_TRANSACTION'
} as const;

/**
 * M-010: Cargamento Único de Ejecución de Pago.
 */
export const PaymentExecutionInputSchema = z.object({
  transactionAmount: z.number().positive(),
  currencyCode: CurrencyCodeSchema,
  paymentMethodOpaqueToken: PaymentMethodOpaqueTokenSchema,
  orderCorrelationIdentifier: OrderCorrelationIdentifierSchema,
  forensicMetadata: z.record(z.string(), z.unknown()).optional(),
}).readonly();

export type IPaymentExecutionInput = z.infer<typeof PaymentExecutionInputSchema>;

/**
 * Snapshot de Verdad Transaccional.
 */
export const TransactionSnapshotSchema = z.object({
  transactionIdentifier: TransactionIdentifierSchema,
  status: TransactionStatusSchema,
  gatewayAuthorizationCode: z.string().optional(),
  processedAtUnixTimestamp: z.number().int(),
  internalLedgerMetadata: z.record(z.string(), z.unknown()),
}).readonly();

export type ITransactionSnapshot = z.infer<typeof TransactionSnapshotSchema>;
