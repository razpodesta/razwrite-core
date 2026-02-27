/**
 * @apparatus ProjectorCoreLogic
 * @role Orquestador maestro de ignición, validación genética y rastro forense.
 * @location libs/shared/atomic-scene-projector/src/lib/projector-core/projector-core.logic.ts
 * @status <SEALED_PRODUCTION>
 * @version 9.3.5
 */

import { SovereignLogger, ApparatusIdentifierSchema, OperationCodeSchema } from '@razwritecore/nsk-shared-logger';
import { SovereignError, SystemErrorCodeSchema } from '@razwritecore/nsk-shared-error-engine';
import { ProjectorResolverLogic } from '../projector-resolver/projector-resolver.logic';
import { ProjectorRegistryLogic } from './projector-registry.logic';
import { TenantManifestSchema, type ILayoutCell } from './projector-core.schema';

const APPARATUS_ID = ApparatusIdentifierSchema.parse('AtomicSceneProjector');

export const ProjectorCoreLogic = {
  igniteProjectionSequence: async (informationPayload: unknown): Promise<ILayoutCell[]> => {
    const executionStartTime = performance.now();

    try {
      // 1. Aduana Genética
      const validatedManifest = TenantManifestSchema.parse(informationPayload);

      // 2. Telemetría de Ignición
      SovereignLogger.emit({
        severity: 'INFO',
        apparatusIdentifier: APPARATUS_ID,
        operationCode: OperationCodeSchema.parse('PROJECTION_IGNITION_START'),
        semanticKey: 'AtomicSceneProjector.initializationStatus',
        forensicMetadata: { tenant: validatedManifest.tenantIdentifier }
      });

      // 3. Resolución Metabólica
      const refinedMatrix = await ProjectorResolverLogic.resolveProjectableMatrix(validatedManifest);

      // 4. Auditoría de Integridad
      auditMatrixIntegrity(refinedMatrix);

      // 5. Cierre y Métrica ISO 25010
      SovereignLogger.emit({
        severity: 'INFO',
        apparatusIdentifier: APPARATUS_ID,
        operationCode: OperationCodeSchema.parse('PROJECTION_STABILIZED'),
        semanticKey: 'AtomicSceneProjector.stabilizationComplete',
        executionLatencyInMilliseconds: performance.now() - executionStartTime
      });

      return refinedMatrix;

    } catch (caughtError) {
      throw SovereignError.transmute({
        caughtError,
        uniqueErrorCode: SystemErrorCodeSchema.parse('RWC-SDUI-4001'),
        severity: 'CRITICAL',
        semanticKey: 'AtomicSceneProjector.validationError',
        apparatusIdentifier: APPARATUS_ID,
        informationPayloadSnapshot: { latency: performance.now() - executionStartTime }
      });
    }
  }
} as const;

function auditMatrixIntegrity(matrix: ILayoutCell[]): void {
  for (const cell of matrix) {
    if (!ProjectorRegistryLogic.getApparatus(cell.apparatusIdentifier)) {
      SovereignLogger.emit({
        severity: 'WARN',
        apparatusIdentifier: APPARATUS_ID,
        operationCode: OperationCodeSchema.parse('APPARATUS_NOT_FOUND'),
        semanticKey: 'AtomicSceneProjector.apparatusMissing',
        forensicMetadata: { identifier: cell.apparatusIdentifier }
      });
    }
  }
}
