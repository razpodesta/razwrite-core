/**
 * @apparatus OfflineMirageLogic
 * @role Orquestador de la ilusión de conectividad y gestión de colas de supervivencia.
 * @location libs/shared/offline-mirage/src/lib/mirage-core/mirage-core.logic.ts
 * @status <SEALED_PRODUCTION>
 * @version 1.0.2
 * @protocol OEDP-V8.5 Lattice
 * @hilo Surface-Pulse
 * @structure NEXO
 * @compliance ISO_25010
 */

import {
  SovereignLogger,
  ApparatusIdentifierSchema,
  OperationCodeSchema
} from '@razwritecore/nsk-shared-logger';

import {
  MetabolicScheduler,
  type IMetabolicMode
} from '@razwritecore/nsk-shared-metabolic-scheduler';

import {
  type IMirageStatus,
  MirageStatusSchema
} from './mirage-core.schema';

/**
 * @section CONSTANTES SOBERANAS
 */
const APPARATUS_ID = ApparatusIdentifierSchema.parse('OfflineMirage');

/**
 * @section ESTADO REACTIVO
 */
let currentMirageStatus: IMirageStatus = MirageStatusSchema.parse('REALITY_SYNCED');

export const OfflineMirageLogic = {
  /**
   * @method igniteMirageOrchestrator
   * @description Sincroniza el estado del Espejo con los biosensores metabólicos.
   */
  igniteMirageOrchestrator: (): void => {

    MetabolicScheduler.observeMetabolicState((metabolicMode: IMetabolicMode) => {
      /**
       * @step Resolución de TS2367
       * Al entrar en el 'else', el compilador ya sabe que metabolicMode NO es 'EMERGENCY'.
       * Se simplifica la lógica para evitar redundancia y mejorar la performance.
       */
      if (metabolicMode === 'EMERGENCY') {
        executeMirageTransition(MirageStatusSchema.parse('MIRAGE_ACTIVE'));
      } else if (currentMirageStatus === MirageStatusSchema.parse('MIRAGE_ACTIVE')) {
        // Recuperación de modo normal: El Espejo inicia reconciliación.
        executeMirageTransition(MirageStatusSchema.parse('RECONCILIATION'));
      }
    });

    // Vigilancia de superficie (Navegador)
    if (typeof window !== 'undefined') {
      window.addEventListener('online', () =>
        executeMirageTransition(MirageStatusSchema.parse('RECONCILIATION'))
      );
      window.addEventListener('offline', () =>
        executeMirageTransition(MirageStatusSchema.parse('MIRAGE_ACTIVE'))
      );
    }
  },

  /**
   * @method getStatus
   */
  getStatus: (): IMirageStatus => currentMirageStatus,

  /**
   * @method isRealityDistorted
   */
  isRealityDistorted: (): boolean => currentMirageStatus !== MirageStatusSchema.parse('REALITY_SYNCED')
} as const;

/**
 * @function executeMirageTransition
 * @internal Gestiona el cambio de fase y dispara el protocolo de reconciliación.
 */
function executeMirageTransition(nextStatus: IMirageStatus): void {
  if (currentMirageStatus === nextStatus) return;

  const previousStatusSnapshot = currentMirageStatus;
  currentMirageStatus = nextStatus;

  SovereignLogger.emit({
    severity: nextStatus === MirageStatusSchema.parse('MIRAGE_ACTIVE') ? 'WARN' : 'INFO',
    apparatusIdentifier: APPARATUS_ID,
    operationCode: OperationCodeSchema.parse('MIRAGE_STATE_SHIFT'),
    semanticKey: `Shared.OfflineMirage.status_${nextStatus}`,
    forensicMetadata: {
      previousStatusSnapshot,
      newStatusStabilized: nextStatus
    }
  });

  if (nextStatus === MirageStatusSchema.parse('RECONCILIATION')) {
    // Latencia controlada para permitir el vaciado de búferes de red.
    setTimeout(() => executeMirageTransition(MirageStatusSchema.parse('REALITY_SYNCED')), 2000);
  }
}
