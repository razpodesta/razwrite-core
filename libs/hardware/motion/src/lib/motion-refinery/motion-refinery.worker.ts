/**
 * @apparatus KineticMotionWorker
 * @role Procesador de señales inerciales. Detección de gestos mediante cálculo vectorial.
 * @location libs/hardware-refineries/motion/src/lib/motion-refinery.worker.ts
 * @status <SEALED_PRODUCTION>
 * @hilo Deep-Pulse
 */

import * as Comlink from 'comlink';
import { KineticGestureSchema, type IMotionContextSnapshot } from './motion-refinery.schema';

const SHAKE_THRESHOLD = 15; // m/s²

const MotionBrain = {
  /**
   * @method refineKineticSignal
   * @description Analiza el vector de aceleración para identificar intenciones físicas.
   */
  refineKineticSignal: async (axisX: number, axisY: number, axisZ: number): Promise<IMotionContextSnapshot> => {
    // Cálculo de Magnitud Vectorial (G-Force)
    const magnitude = Math.sqrt(axisX ** 2 + axisY ** 2 + axisZ ** 2);

    let gesture: any = 'STABLE';
    if (magnitude > SHAKE_THRESHOLD) gesture = 'SHAKING';
    if (magnitude < 1.0) gesture = 'FREE_FALL';

    return {
      accelerationVector: {
        axisX: Number(axisX.toFixed(2)),
        axisY: Number(axisY.toFixed(2)),
        axisZ: Number(axisZ.toFixed(2))
      },
      detectedGesture: KineticGestureSchema.parse(gesture),
      vectorMagnitude: Number(magnitude.toFixed(2)),
      timestampUnix: Date.now()
    };
  }
};

Comlink.expose(MotionBrain);
export type IMotionBrain = typeof MotionBrain;
