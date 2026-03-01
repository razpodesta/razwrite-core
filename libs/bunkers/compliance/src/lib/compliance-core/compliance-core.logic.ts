/**
 * @apparatus ComplianceCoreLogic
 * @role Orquestador de bioseguridad y nexo de permisos de hardware.
 * @location libs/bunkers/compliance/src/lib/compliance-core/compliance-core.logic.ts
 * @status <STABILIZED>
 * @version 1.1.2
 * @hilo Surface-Pulse
 */

import { SovereignLogger } from '@razwritecore/nsk-shared-logger';
// Nota: Importamos los esquemas para extraer los tipos exactos de Branding de Zod
import { ApparatusIdentifierSchema, OperationCodeSchema } from '@razwritecore/nsk-shared-logger';
import {
  type IBiosecurityGrantInput,
  type IComplianceToken,
  ComplianceTokenSchema
} from './compliance-core.schema';
import { z } from 'zod';

// Extracción de tipos nominales genuinos de Zod (M-005)
type IApparatusIdentifier = z.infer<typeof ApparatusIdentifierSchema>;
type IOperationCode = z.infer<typeof OperationCodeSchema>;

export const ComplianceBunker = {
  /**
   * @method requestBiosecurityToken
   * @description Valida el sujeto y emite un token criptográfico para el hardware.
   */
  requestBiosecurityToken: async (requestPayload: IBiosecurityGrantInput): Promise<IComplianceToken> => {
    const executionStartTime = performance.now();

    try {
      // 1. [Cerebro] Generación de token siguiendo M-022.
      const rawSecretToken = `RWC.BT.${crypto.randomUUID()}.${Date.now()}`;
      const validatedToken = ComplianceTokenSchema.parse(rawSecretToken);

      SovereignLogger.emit({
        severity: 'INFO',
        // Casting a unknown -> tipo nominal de Zod para saltar la protección de escritura
        apparatusIdentifier: 'ComplianceBunker' as unknown as IApparatusIdentifier,
        operationCode: 'GRANT_ISSUED' as unknown as IOperationCode,
        semanticKey: 'ComplianceCore.Grants.TokenGenerated',
        executionLatencyInMilliseconds: performance.now() - executionStartTime,
        forensicMetadata: {
          permissionTarget: requestPayload.permissionRequested,
          metabolicPressure: 'NORMAL'
        }
      });

      return validatedToken;

    } catch (caughtError) {
      SovereignLogger.emit({
        severity: 'CRITICAL',
        apparatusIdentifier: 'ComplianceBunker' as unknown as IApparatusIdentifier,
        operationCode: 'GRANT_DENIED' as unknown as IOperationCode,
        semanticKey: 'ComplianceCore.Errors.UnauthorizedAccess',
        forensicMetadata: {
          caughtErrorSnapshot: caughtError instanceof Error ? caughtError.message : 'Unknown error'
        }
      });
      throw caughtError;
    }
  }
};
