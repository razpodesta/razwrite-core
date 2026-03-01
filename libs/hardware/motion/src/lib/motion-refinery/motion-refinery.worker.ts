/**
 * @apparatus KineticMotionWorker
 * @role Procesador de señales inerciales y detección de gestos mediante cálculo vectorial.
 * @location libs/hardware/motion/src/lib/motion-refinery/motion-refinery.worker.ts
 * @status <STABILIZED>
 * @version 1.1.0
 * @protocol OEDP-V8.5 Lattice
 * @hilo Deep-Pulse
 */

import * as Comlink from 'comlink';
import {
  KineticGestureSchema,
  KineticCoordinateSchema,
  KineticMagnitudeSchema,
  KineticTimestampSchema,
  MotionContextSnapshotSchema,
  type IMotionContextSnapshot,
  type IKineticGesture
} from './motion-refinery.schema';

/**
 * @constant SHAKE_CRITICAL_THRESHOLD
 * @description Umbral de aceleración (m/s²) para considerar un gesto de agitación.
 */
const SHAKE_CRITICAL_THRESHOLD = 15;
const FREE_FALL_THRESHOLD = 1.0;

const KineticMotionBrain = {
  /**
   * @method refineInertialSignal
   * @description Ejecuta el refinamiento vectorial y anonimización de la señal inercial.
   */
  refineInertialSignal: async (
    accelerationXAxis: number,
    accelerationYAxis: number,
    accelerationZAxis: number
  ): Promise<IMotionContextSnapshot> => {

    // 1. Cálculo de Magnitud Vectorial (Norma Euclidiana)
    const rawVectorMagnitude = Math.sqrt(
      Math.pow(accelerationXAxis, 2) +
      Math.pow(accelerationYAxis, 2) +
      Math.pow(accelerationZAxis, 2)
    );

    // 2. Determinación de Gesto con Seguridad Atómica
    let inferredGesture: IKineticGesture = 'STABLE' as never;

    if (rawVectorMagnitude > SHAKE_CRITICAL_THRESHOLD) {
      inferredGesture = 'SHAKING' as never;
    } else if (rawVectorMagnitude < FREE_FALL_THRESHOLD) {
      inferredGesture = 'FREE_FALL' as never;
    }

    /**
     * @aduana SELLADO_ZENITH
     * Transmutamos los primitivos en tipos nominales (Brands).
     * El truncamiento a 2 decimales es una política de privacidad ISO 27701.
     */
    return MotionContextSnapshotSchema.parse({
      accelerationVector: {
        accelerationXAxis: KineticCoordinateSchema.parse(Number(accelerationXAxis.toFixed(2))),
        accelerationYAxis: KineticCoordinateSchema.parse(Number(accelerationYAxis.toFixed(2))),
        accelerationZAxis: KineticCoordinateSchema.parse(Number(accelerationZAxis.toFixed(2)))
      },
      detectedGesture: KineticGestureSchema.parse(inferredGesture),
      vectorMagnitude: KineticMagnitudeSchema.parse(Number(rawVectorMagnitude.toFixed(2))),
      timestampUnix: KineticTimestampSchema.parse(Date.now())
    });
  }
};

// Exposición del cerebro al hilo de superficie mediante el protocolo Comlink
Comlink.expose(KineticMotionBrain);

// Tipo de exportación para el Proxy de superficie
export type IKineticMotionBrain = typeof KineticMotionBrain;
