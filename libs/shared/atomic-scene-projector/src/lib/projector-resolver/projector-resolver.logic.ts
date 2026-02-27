/**
 * @apparatus ProjectorResolverLogic
 * @role Motor de resolución asíncrono para el filtrado de escenas SDUI.
 * @location libs/shared/atomic-scene-projector/src/lib/projector-resolver/projector-resolver.logic.ts
 * @status <STABILIZED>
 * @version 9.2.0
 */

import { MetabolicScheduler } from '@razwritecore/nsk-shared-metabolic-scheduler';
import { SovereignLogger, ApparatusIdentifierSchema, OperationCodeSchema } from '@razwritecore/nsk-shared-logger';
import { type ILayoutCell, type ITenantManifest } from '../projector-core/projector-core.schema';

const APPARATUS_ID = ApparatusIdentifierSchema.parse('ProjectorResolver');

export const ProjectorResolverLogic = {
  resolveProjectableMatrix: async (tenantManifest: ITenantManifest): Promise<ILayoutCell[]> => {

    // M-015-B: Umbral de Masa Crítica
    if (tenantManifest.layoutMatrix.length > 25) {
      SovereignLogger.emit({
        severity: 'WARN',
        apparatusIdentifier: APPARATUS_ID,
        operationCode: OperationCodeSchema.parse('CRITICAL_DENSITY_DETECTED'),
        semanticKey: 'AtomicSceneProjector.resourceConstraint'
      });
    }

    const refinedMatrix = tenantManifest.layoutMatrix.filter((cell) => {
      return MetabolicScheduler.consultExecutionPermit({
        qualityOfServiceTier: cell.priorityQoS,
        estimatedComplexity: mapWeightToComplexity(cell.metabolicWeight),
      });
    });

    return refinedMatrix;
  }
} as const;

function mapWeightToComplexity(weight: string): number {
  const table: Record<string, number> = { LIGHT: 10, MEDIUM: 40, HEAVY: 80, CRITICAL: 100 };
  return table[weight] ?? 50;
}
