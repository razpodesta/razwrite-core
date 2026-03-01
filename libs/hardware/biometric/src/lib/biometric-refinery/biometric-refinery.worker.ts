/**
 * @apparatus BiometricRefineryWorker
 * @role Cerebro asíncrono para el filtrado de telemetría de hardware.
 * @location libs/hardware/biometric/src/lib/biometric-refinery/biometric-refinery.worker.ts
 * @status <STABILIZED>
 * @hilo Deep-Pulse
 */

import { expose } from 'comlink';

let lastLevelReported = 0;

const biometricWorkerBrain = {
  /**
   * @method shouldEmitPulse
   * @description Determina si el cambio energético justifica un pulso al sistema nervioso.
   */
  shouldEmitPulse: (currentLevel: number): boolean => {
    const delta = Math.abs(currentLevel - lastLevelReported);
    if (delta >= 1) { // Umbral de sensibilidad del 1%
      lastLevelReported = currentLevel;
      return true;
    }
    return false;
  }
};

expose(biometricWorkerBrain);
export type IBiometricRefineryWorker = typeof biometricWorkerBrain;
