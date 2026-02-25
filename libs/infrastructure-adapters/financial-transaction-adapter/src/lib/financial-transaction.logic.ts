/**
 * @apparatus FinancialTransactionLogic
 * @role Orquestador de pasarelas de pago y garante de integridad transaccional.
 * @location libs/infrastructure-adapters/financial-transaction-adapter/src/lib/financial-transaction.logic.ts
 * @status <STABILIZED>
 * @hilo Surface-Pulse / Acid-Pulse
 */

import { SovereignLogger } from '@razwritecore/nsk-shared-logger';
import {
  type IPaymentExecutionInput,
  type ITransactionSnapshot,
  PaymentExecutionInputSchema,
  TransactionSnapshotSchema
} from './financial-transaction.schema';

export const FinancialTransactionAdapter = {
  /**
   * @method executePaymentRefinement
   * @description Procesa un pago naturalizando la respuesta del proveedor bajo la ley RWC.
   */
  executePaymentRefinement: async (requestPayload: IPaymentExecutionInput): Promise<ITransactionSnapshot> => {
    const executionStartTime = performance.now();

    try {
      // 1. Aduana de ADN
      const validatedInput = PaymentExecutionInputSchema.parse(requestPayload);

      // 2. [Simulación de Diplomacia]
      // En este punto, el adaptador selecciona la estrategia (Stripe/WA/Alipay)
      const simulatedGatewayResponse = {
        transactionIdentifier: crypto.randomUUID() as any,
        status: 'AUTHORIZED' as const,
        gatewayAuthorizationCode: 'AUTH-ZENITH-2026',
        processedAtUnix: Date.now(),
        internalLedgerMetadata: { executionBridge: 'NATIVE_FETCH_KEEPALIVE' }
      };

      const transactionSnapshot = TransactionSnapshotSchema.parse(simulatedGatewayResponse);

      // 3. Rastro Forense Vital (QoS 0)
      SovereignLogger.emit({
        severity: 'INFO',
        apparatusIdentifier: 'FinancialTransactionAdapter',
        operationCode: 'TRANSACTION_AUTHORIZED',
        semanticKey: 'Infrastructure.Financial.PaymentSuccessful',
        executionLatencyInMilliseconds: performance.now() - executionStartTime,
        forensicMetadata: {
          orderReference: validatedInput.orderCorrelationIdentifier,
          settledAmount: validatedInput.transactionAmount
        }
      });

      return transactionSnapshot;

    } catch (caughtError) {
      SovereignLogger.emit({
        severity: 'CRITICAL',
        apparatusIdentifier: 'FinancialTransactionAdapter',
        operationCode: 'TRANSACTION_FAILED',
        semanticKey: 'Infrastructure.Financial.PaymentError',
        forensicMetadata: { caughtError }
      });
      throw caughtError;
    }
  }
};
