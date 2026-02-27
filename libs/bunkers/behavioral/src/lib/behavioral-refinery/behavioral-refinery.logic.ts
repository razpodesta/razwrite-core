/**
 * @apparatus BehavioralRefineryLogic
 * @role Orquestador consciente de recursos para la captura de telemetría conductual.
 * @location libs/modular-units/behavioral-events/src/lib/behavioral-refinery/behavioral-refinery.logic.ts
 * @status <SEALED_PRODUCTION>
 * @version 1.2.0
 * @protocol OEDP-V8.5 Lattice
 * @hilo Surface-Pulse
 */

import * as Comlink from 'comlink';
import { SyncOsmosisEngine } from '@razwritecore/unit-sync-osmosis';
import { MetabolicScheduler } from '@razwritecore/nsk-shared-metabolic-scheduler';
import { type IBehavioralBrain } from './behavioral-refinery.worker';
import { type IRawInteractionPoint } from './behavioral-refinery.schema';

let brainProxy: Comlink.Remote<IBehavioralBrain> | null = null;
let captureBuffer: IRawInteractionPoint[] = [];
const BUFFER_FLUSH_LIMIT = 40;

export const BehavioralRefineryLogic = {
  /**
   * @method igniteRefinery
   * @description Activa la extracción bajo vigilancia del MetabolicScheduler.
   */
  igniteRefinery: (): void => {
    if (typeof window === 'undefined') return;

    // 1. Inicialización del Cerebro (Deep-Pulse)
    const worker = new Worker(new URL('./behavioral-refinery.worker.ts', import.meta.url), { type: 'module' });
    brainProxy = Comlink.wrap<IBehavioralBrain>(worker);

    // 2. Registro de Listener Pasivo con Vigilancia Metabólica
    let isWaitingForNextFrame = false;

    window.addEventListener('mousemove', (event: MouseEvent) => {
      // M-015: Suspensión inmediata en modo de emergencia energética
      const activeMetabolicMode = MetabolicScheduler.getCurrentMode();
      if (activeMetabolicMode === 'EMERGENCY' || activeMetabolicMode === 'HIBERNATE') return;

      if (isWaitingForNextFrame) return;
      isWaitingForNextFrame = true;

      window.requestAnimationFrame(() => {
        captureBuffer.push({
          coordinateX: event.clientX,
          coordinateY: event.clientY,
          timestampUnix: Date.now()
        });

        if (captureBuffer.length >= BUFFER_FLUSH_LIMIT) {
          BehavioralRefineryLogic.flushToBrain();
        }
        isWaitingForNextFrame = false;
      });
    }, { passive: true });
  },

  /**
   * @method flushToBrain
   * @description Delegación de carga al Worker.
   */
  flushToBrain: async (): Promise<void> => {
    if (!brainProxy || captureBuffer.length === 0) return;

    const informationBatch = [...captureBuffer];
    captureBuffer = [];

    try {
      const refinedPulse = await brainProxy.analyzeMovementPatterns(informationBatch);

      if (refinedPulse) {
        // M-018: Inyección en la membrana de ósmosis para transporte inteligente
        SyncOsmosisEngine.enqueuePulse({
          pulseIdentifier: crypto.randomUUID() as any,
          qualityOfServiceTier: 3, // QoS BEHAVIORAL
          targetVaultEndpoint: '/api/v1/telemetry/behavioral-flux',
          opaquePayload: refinedPulse,
          creationTimestampUnix: Date.now()
        });
      }
    } catch (caughtError) {
      // Los fallos en telemetría no deben detener la UI; se descartan tras el rastro forense.
      console.warn('RWC-BEHAVIORAL-FLUSH-FAILED', caughtError);
    }
  }
};
