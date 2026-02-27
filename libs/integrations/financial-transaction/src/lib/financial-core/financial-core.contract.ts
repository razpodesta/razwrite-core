/**
 * @apparatus FinancialCoreContract
 * @role Definición de túneles de intención y metadatos de proyección SDUI.
 * @location libs/integrations/financial-transaction/src/lib/financial-core/financial-core.contract.ts
 * @status <STABILIZED>
 * @protocol OEDP-V8.5 Lattice
 */

import { FinancialIntentOpCode } from './financial-core.schema';

export const FinancialCoreContract = {
  apparatusKey: 'FinancialCore',

  /**
   * Intenciones que este aparato puede emitir o procesar.
   */
  intentions: [
    {
      opCode: FinancialIntentOpCode.EXECUTE_PAYMENT,
      priorityQoS: 0, // VITAL: Bloquea hilos secundarios hasta confirmar.
      isCancellable: false
    }
  ],

  /**
   * Metadatos para el Atomic Lego Projector (M-009)
   */
  projectionRules: {
    requiresAuth: true,
    metabolicWeight: 'MEDIUM',
    allowedTenants: ['*'] // Universal
  }
};
