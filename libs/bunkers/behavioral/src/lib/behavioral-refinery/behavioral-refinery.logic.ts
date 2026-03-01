/**
 * @apparatus BehavioralRefineryLogic
 * @role Orquestador de captura conductual con vinculación SDUI y vigilancia metabólica.
 * @location libs/bunkers/behavioral/src/lib/behavioral-refinery/behavioral-refinery.logic.ts
 * @status <SEALED_PRODUCTION>
 * @version 9.2.3
 * @protocol OEDP-V8.5 Lattice
 * @hilo Surface-Pulse
 * @structure NEXO
 * @compliance ISO_25010 | ISO_27001 | ISO_27701
 */

import * as Comlink from 'comlink';
import {
  SovereignLogger,
  ApparatusIdentifierSchema,
  OperationCodeSchema
} from '@razwritecore/nsk-shared-logger';
import { ErrorRefineryLogic, SystemErrorCodeSchema } from '@razwritecore/nsk-shared-error-engine';
// Sello corrección TS2307: Sincronización con Fachada de Ósmosis 9.5.1
import { OsmosisCoreLogic, PulseIdentifierSchema } from '@razwritecore/nsk-bunker-synchronization-osmosis';
import { MetabolicScheduler } from '@razwritecore/nsk-shared-metabolic-scheduler';
import { type IBehavioralRefineryBrain } from './behavioral-refinery.worker';
import { type IRawInteractionPoint } from './behavioral-refinery.schema';
import { z } from 'zod';

/**
 * @section DIMENSIONES NOMINALES (M-005)
 */
type IApparatusIdentifier = z.infer<typeof ApparatusIdentifierSchema>;
type IOperationCode = z.infer<typeof OperationCodeSchema>;

// Estado volátil de la refinería
let brainProxy: Comlink.Remote<IBehavioralRefineryBrain> | null = null;
let interactionCaptureBuffer: IRawInteractionPoint[] = [];
let lastInteractionAreaId: string | undefined = undefined;

const BUFFER_FLUSH_THRESHOLD = 50;

export const BehavioralRefineryLogic = {
  /**
   * @method igniteRefinery
   * @description Inicializa la captura pasiva sincronizada con el refresco visual (60fps).
   * @requirement M-037 (Mobile First: Passive Listeners)
   * @returns Función de des-comisionado (Cleanup).
   */
  igniteRefinery: (): (() => void) => {
    if (typeof window === 'undefined') return () => {};

    const ignitionStartTime = performance.now();

    // 1. Ignición del Hilo Secundario (Deep-Pulse) via RPC
    const nativeWorker = new Worker(
      new URL('./behavioral-refinery.worker.ts', import.meta.url),
      { type: 'module' }
    );
    brainProxy = Comlink.wrap<IBehavioralRefineryBrain>(nativeWorker);

    let isFrameLocked = false;

    const handleInteractionStream = (event: MouseEvent) => {
      // 2. Vigilancia Metabólica Preventiva (ISO 25010)
      const energyMode = MetabolicScheduler.getCurrentMode();
      if (energyMode === 'EMERGENCY' || energyMode === 'HIBERNATE') return;

      if (isFrameLocked) return;
      isFrameLocked = true;

      // 3. Captura Zero-Jank sincronizada con el Viewport
      window.requestAnimationFrame(() => {
        // Vinculación con el Manifiesto SDUI (M-009)
        const targetElement = event.target as HTMLElement;
        const areaId = targetElement?.closest('[data-sdui-id]')?.getAttribute('data-sdui-id');
        if (areaId) lastInteractionAreaId = areaId;

        interactionCaptureBuffer.push({
          coordinateX: event.clientX,
          coordinateY: event.clientY,
          timestampInMilliseconds: Date.now()
        });

        if (interactionCaptureBuffer.length >= BUFFER_FLUSH_THRESHOLD) {
          BehavioralRefineryLogic.dispatchToDeepPulse();
        }
        isFrameLocked = false;
      });
    };

    window.addEventListener('mousemove', handleInteractionStream, { passive: true });

    SovereignLogger.emit({
      severity: 'INFO',
      apparatusIdentifier: 'BehavioralRefinery' as unknown as IApparatusIdentifier,
      operationCode: 'REFINERY_IGNITED' as unknown as IOperationCode,
      semanticKey: 'BehavioralRefinery.Grants.IgnitionSuccess',
      executionLatencyInMilliseconds: performance.now() - ignitionStartTime
    });

    return () => {
      window.removeEventListener('mousemove', handleInteractionStream);
      nativeWorker.terminate();
      interactionCaptureBuffer = [];
      brainProxy = null;
    };
  },

  /**
   * @method dispatchToDeepPulse
   * @private
   * @description Delega el análisis cinético al Worker para proteger el Surface-Pulse.
   */
  dispatchToDeepPulse: async (): Promise<void> => {
    if (!brainProxy || interactionCaptureBuffer.length === 0) return;

    const snapshotBatch = [...interactionCaptureBuffer];
    const areaIdentifier = lastInteractionAreaId;

    interactionCaptureBuffer = [];
    lastInteractionAreaId = undefined;

    try {
      const refinedPulse = await brainProxy.analyzeMovementPatterns(snapshotBatch);

      if (refinedPulse) {
        // Enriquecimiento con contexto SDUI (M-009)
        const enrichedPulse = {
          ...refinedPulse,
          interactionMetadata: {
            ...refinedPulse.interactionMetadata,
            interactionAreaIdentifier: areaIdentifier
          }
        };

        // M-018: Inyección en la membrana de ósmosis (QoS 3)
        // Sello corrección TS2307: Uso de OsmosisCoreLogic (Fachada nivelada 9.5.1)
        OsmosisCoreLogic.enqueuePulse({
          pulseIdentifier: PulseIdentifierSchema.parse(crypto.randomUUID()),
          qualityOfServiceTier: 3, // BEHAVIORAL
          targetVaultPath: '/api/v1/telemetry/behavioral',
          opaquePayload: enrichedPulse,
          creationTimestampInMilliseconds: Date.now(),
          metabolicModeAtCreation: MetabolicScheduler.getCurrentMode()
        });
      }
    } catch (caughtError) {
      throw ErrorRefineryLogic.transmute({
        uniqueErrorCode: SystemErrorCodeSchema.parse('RWC-BEH-9001'),
        severity: 'ERROR',
        apparatusIdentifier: 'BehavioralRefinery',
        semanticKey: 'BehavioralRefinery.Errors.RefinementCollapse',
        caughtError
      });
    }
  }
} as const;
