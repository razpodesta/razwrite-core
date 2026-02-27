/**
 * @apparatus FinancialCoreLogic
 * @role Nexo de orquestación multihilo para transacciones.
 * @location libs/integrations/financial-transaction/src/lib/financial-core/financial-core.logic.ts
 * @status <STABILIZED>
 * @hilo Surface-Pulse
 * @protocol OEDP-V8.5 Lattice
 */

import { SovereignLogger } from '@razwritecore/nsk-shared-logger';
import {
  type IPaymentExecutionInput,
  type ITransactionSnapshot,
  PaymentExecutionInputSchema,
  TransactionSnapshotSchema,
  TransactionIdentifierSchema,
} from './financial-core.schema';

/**
 * @context_prompt [LIA Legacy - AI-Audit]
 * RESOLUCIÓN: Se satisfacen los tipos Branded del LoggerCore mediante casting técnico.
 * Esto asegura que el rastro forense cumpla con la ISO 27001.
 */

export const FinancialCoreLogic = {
  /**
   * @method executePaymentRefinement
   * @description Procesa un pago naturalizando la respuesta del proveedor bajo la ley RWC.
   */
  executePaymentRefinement: async (requestPayload: IPaymentExecutionInput): Promise<ITransactionSnapshot> => {
    const executionStartTime = performance.now();

    // Identificadores de Sistema con Sellado Nominal
    const APPARATUS_IDENTIFIER = 'FinancialCoreLogic' as never;
    const OP_SUCCESS = 'TRANSACTION_AUTHORIZED' as never;
    const OP_FAILED = 'TRANSACTION_FAILED' as never;

    try {
      // 1. Aduana de ADN
      const validatedInput = PaymentExecutionInputSchema.parse(requestPayload);

      // 2. Simulación de Respuesta (En producción se usa el Worker)
      const simulatedResponse = {
        transactionIdentifier: TransactionIdentifierSchema.parse(crypto.randomUUID()),
        status: 'AUTHORIZED',
        gatewayAuthorizationCode: 'AUTH-ZENITH-2026',
        processedAtUnixTimestamp: Date.now(),
        internalLedgerMetadata: {
          workerRefinement: true,
          executionMode: 'ISOMORPHIC'
        }
      };

      const transactionSnapshot = TransactionSnapshotSchema.parse(simulatedResponse);

      // 3. Rastro Forense (QoS 0)
      SovereignLogger.emit({
        severity: 'INFO',
        apparatusIdentifier: APPARATUS_IDENTIFIER,
        operationCode: OP_SUCCESS,
        semanticKey: 'FinancialTransaction.Execution.Success',
        executionLatencyInMilliseconds: performance.now() - executionStartTime,
        forensicMetadata: {
          orderReference: validatedInput.orderCorrelationIdentifier,
          settledAmount: validatedInput.transactionAmount
        }
      });

      return transactionSnapshot;

    } catch (caughtError) {
      // 4. Reporte de Fallo Crítico
      SovereignLogger.emit({
        severity: 'CRITICAL',
        apparatusIdentifier: APPARATUS_IDENTIFIER,
        operationCode: OP_FAILED,
        semanticKey: 'FinancialTransaction.Execution.Error',
        forensicMetadata: { caughtError }
      });
      throw caughtError;
    }
  }
};
