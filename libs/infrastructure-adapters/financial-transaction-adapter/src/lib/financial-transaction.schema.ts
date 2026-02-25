/**
 * @apparatus FinancialTransactionDNA
 * @role Contratos genéticos para el sellado de pagos y validación de divisas.
 * @location libs/infrastructure-adapters/financial-transaction-adapter/src/lib/financial-transaction.schema.ts
 * @status <SEALED_PRODUCTION>
 * @version 1.1.0
 * @protocol OEDP-V8.5 Lattice
 */

import { z } from 'zod';

export const CurrencyCodeSchema = z.enum(['USD', 'EUR', 'CLP', 'BRL', 'CNY']).brand<'CurrencyCode'>();
export const TransactionStatusSchema = z.enum(['PENDING', 'AUTHORIZED', 'SETTLED', 'FAILED', 'REFUNDED']);

/**
 * M-010: Cargamento Único de Solicitud de Pago.
 */
export const PaymentExecutionInputSchema = z.object({
  transactionAmount: z.number().positive().describe('Monto absoluto de la operación.'),
  currencyCode: CurrencyCodeSchema,
  paymentMethodOpaqueToken: z.string().min(10).describe('Token de pasarela (Materia Oscura).'),
  orderCorrelationIdentifier: z.string().uuid().describe('Vínculo con el pedido original.'),
  forensicMetadata: z.record(z.string(), z.unknown()).optional(),
}).readonly();

export type IPaymentExecutionInput = z.infer<typeof PaymentExecutionInputSchema>;

/**
 * Snapshot de Verdad Transaccional.
 */
export const TransactionSnapshotSchema = z.object({
  transactionIdentifier: z.string().uuid().brand<'TransactionIdentifier'>(),
  status: TransactionStatusSchema,
  gatewayAuthorizationCode: z.string().optional(),
  processedAtUnix: z.number().int(),
  internalLedgerMetadata: z.unknown(),
}).readonly();

export type ITransactionSnapshot = z.infer<typeof TransactionSnapshotSchema>;
