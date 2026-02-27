/**
 * @apparatus KineticMotionLogic
 * @role Orquestador de listeners inerciales con filtrado metabólico de eventos.
 * @location libs/hardware-refineries/motion/src/lib/motion-refinery.logic.ts
 * @status <SEALED_PRODUCTION>
 * @hilo Surface-Pulse
 */

import * as Comlink from 'comlink';
import { SovereignLogger } from '@razwritecore/nsk-shared-logger';
import { MetabolicScheduler } from '@razwritecore/nsk-shared-metabolic-scheduler';
import { type IMotionBrain } from './motion-refinery.worker';
import { type IMotionContextSnapshot } from './motion-refinery.schema';

let brainProxy: Comlink.Remote<IMotionBrain> | null = null;

export const KineticMotionLogic = {
  /**
   * @method igniteRefinery
   * @description Activa la escucha de DeviceMotion bajo vigilancia metabólica.
   */
  igniteRefinery: async (onPulse: (snapshot: IMotionContextSnapshot) => void): Promise<void> => {
    if (typeof window === 'undefined' || !window.DeviceMotionEvent) return;

    // 1. Inicialización de Cerebro
    const worker = new Worker(new URL('./motion-refinery.worker.ts', import.meta.url), { type: 'module' });
    brainProxy = Comlink.wrap<IMotionBrain>(worker);

    // 2. Listener Pasivo con Throttling Natural
    let isProcessing = false;
    window.addEventListener('devicemotion', async (event) => {
      const mode = MetabolicScheduler.getCurrentMode();
      if (mode === 'EMERGENCY' || isProcessing) return;

      isProcessing = true;
      const acc = event.accelerationIncludingGravity;

      if (acc && brainProxy) {
        const refinedPulse = await brainProxy.refineKineticSignal(
          acc.x || 0, acc.y || 0, acc.z || 0
        );
        onPulse(refinedPulse);
      }

      // Throttling dinámico basado en Metabolismo
      const delay = mode === 'PEAK' ? 16 : 100;
      setTimeout(() => { isProcessing = false; }, delay);
    }, { passive: true });

    SovereignLogger.buffer({
      severity: 'INFO',
      apparatusIdentifier: 'KineticMotionRefinery',
      operationCode: 'REFINERY_IGNITED',
      semanticKey: 'Hardware.Motion.ignitionSuccess'
    });
  }
};
