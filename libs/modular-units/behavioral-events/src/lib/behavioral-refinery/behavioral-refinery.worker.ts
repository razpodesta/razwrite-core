/**
 * @apparatus BehavioralRefineryWorker
 * @role Cerebro asíncrono para análisis de micro-gestos y estados psicológicos.
 * @location libs/modular-units/behavioral-events/src/lib/behavioral-refinery/behavioral-refinery.worker.ts
 * @status <SEALED_PRODUCTION>
 * @version 1.1.0
 * @protocol OEDP-V8.5 Lattice
 * @hilo Deep-Pulse
 */

import * as Comlink from 'comlink';
import {
  type IRawInteractionPoint,
  type IRefinedBehavioralPulse,
  InteractionOpCodeSchema,
  PsychologicalStateSchema
} from './behavioral-refinery.schema';

const BehavioralBrain = {
  /**
   * @method analyzeMovementPatterns
   * @description Procesa ráfagas de coordenadas para detectar frustración, urgencia o duda.
   */
  analyzeMovementPatterns: async (pointCollection: IRawInteractionPoint[]): Promise<IRefinedBehavioralPulse | null> => {
    if (pointCollection.length < 5) return null;

    const firstPoint = pointCollection[0];
    const lastPoint = pointCollection[pointCollection.length - 1];

    const distanceVector = Math.sqrt(
      Math.pow(lastPoint.coordinateX - firstPoint.coordinateX, 2) +
      Math.pow(lastPoint.coordinateY - firstPoint.coordinateY, 2)
    );
    const timeDelta = lastPoint.timestampUnix - firstPoint.timestampUnix;
    const velocityMagnitude = distanceVector / (timeDelta || 1);

    // Clasificación Determinística según Manifiesto 021
    let detectedStateString: string = 'ENGAGED';

    if (velocityMagnitude > 3.5) {
      detectedStateString = 'URGENCY';
    } else if (velocityMagnitude < 0.2 && pointCollection.length > 25) {
      detectedStateString = 'HESITATION';
    } else if (velocityMagnitude === 0) {
      detectedStateString = 'IDLE';
    }

    return {
      interactionOpCode: InteractionOpCodeSchema.parse(2001), // Código de ráfaga refinada
      intentionScore: Math.min(velocityMagnitude / 5, 1),
      psychologicalState: PsychologicalStateSchema.parse(detectedStateString),
      interactionMetadata: {
        samplingRateInMilliseconds: timeDelta / pointCollection.length,
        vectorMagnitudePixels: distanceVector
      }
    };
  }
};

Comlink.expose(BehavioralBrain);
export type IBehavioralBrain = typeof BehavioralBrain;
