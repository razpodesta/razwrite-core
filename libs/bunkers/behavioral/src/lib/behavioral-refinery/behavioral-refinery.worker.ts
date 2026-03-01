/**
 * @apparatus BehavioralRefineryBrain
 * @role Cerebro asíncrono para el análisis cinético, aceleración y entropía de micro-gestos.
 * @location libs/bunkers/behavioral/src/lib/behavioral-refinery/behavioral-refinery.worker.ts
 * @status <STABILIZED>
 * @version 9.2.0
 * @protocol OEDP-V8.5 Lattice
 * @hilo Deep-Pulse
 * @structure CEREBRO
 * @compliance ISO_27001 | ISO_27701 | ISO_25010
 */

import * as Comlink from 'comlink';
import { z } from 'zod';
import {
  type IRawInteractionPoint,
  type IRefinedBehavioralPulse,
  InteractionOpCodeSchema,
  PsychologicalStateSchema
} from './behavioral-refinery.schema';

/**
 * @context_prompt [LIA Legacy - AI-Audit]
 * DIRECTIVA: Sincronización cinemática y resolución de TS2739.
 * JUSTIFICACIÓN: Se implementa el cálculo de 'averageAcceleration' y 'burstDurationInMilliseconds'.
 * Se utiliza la diferencia de velocidad entre el inicio y el fin de la ráfaga para
 * detectar cambios bruscos de intención (Aceleración).
 * IMPACTO: Cumplimiento total del ADN 9.2.0 y alta fidelidad telemétrica.
 */

const BehavioralRefineryBrain = {
  /**
   * @method analyzeMovementPatterns
   * @description Transmuta ráfagas de coordenadas en estados psicológicos de alta fidelidad.
   */
  analyzeMovementPatterns: async (pointCollection: IRawInteractionPoint[]): Promise<IRefinedBehavioralPulse | null> => {
    // Requisito de masa crítica para el análisis cinético (M-021)
    if (pointCollection.length < 10) return null;

    const firstPoint = pointCollection[0];
    const lastPoint = pointCollection[pointCollection.length - 1];

    // 1. Cálculos de Tiempo y Desplazamiento Neto
    const burstDuration = lastPoint.timestampInMilliseconds - firstPoint.timestampInMilliseconds;
    const netDeltaX = lastPoint.coordinateX - firstPoint.coordinateX;
    const netDeltaY = lastPoint.coordinateY - firstPoint.coordinateY;
    const displacementVector = Math.sqrt(Math.pow(netDeltaX, 2) + Math.pow(netDeltaY, 2));

    // Velocidad instantánea promedio de la ráfaga
    const velocityMagnitude = displacementVector / (burstDuration || 1);

    // 2. Análisis de Aceleración (Diferencial de velocidad Segmentado)
    // Calculamos velocidad inicial (primeros 3 puntos) y final (últimos 3 puntos)
    const initialSegment = pointCollection.slice(0, 3);
    const finalSegment = pointCollection.slice(-3);

    const calcVel = (p: IRawInteractionPoint[]) => {
      const dX = p[p.length - 1].coordinateX - p[0].coordinateX;
      const dY = p[p.length - 1].coordinateY - p[0].coordinateY;
      const dT = p[p.length - 1].timestampInMilliseconds - p[0].timestampInMilliseconds;
      return Math.sqrt(Math.pow(dX, 2) + Math.pow(dY, 2)) / (dT || 1);
    };

    const velocityInitial = calcVel(initialSegment);
    const velocityFinal = calcVel(finalSegment);

    // a = (Vf - Vi) / t
    const averageAcceleration = (velocityFinal - velocityInitial) / (burstDuration || 1);

    // 3. Cálculo de Recorrido Total y Entropía (Eficiencia de Ruta)
    let totalPathDistance = 0;
    for (let i = 1; i < pointCollection.length; i++) {
      const dX = pointCollection[i].coordinateX - pointCollection[i - 1].coordinateX;
      const dY = pointCollection[i].coordinateY - pointCollection[i - 1].coordinateY;
      totalPathDistance += Math.sqrt(Math.pow(dX, 2) + Math.pow(dY, 2));
    }

    const movementEfficiency = displacementVector / (totalPathDistance || 1);
    const movementEntropy = Math.max(0, Math.min(1, 1 - movementEfficiency));

    // 4. Clasificación Psicológica Refinada (M-021)
    let detectedState: z.infer<typeof PsychologicalStateSchema> = 'ENGAGED';

    if (velocityMagnitude > 3.0 || averageAcceleration > 0.5) {
      detectedState = 'URGENCY'; // Movimiento rápido o aceleración súbita
    } else if (movementEntropy > 0.6 && pointCollection.length > 20) {
      detectedState = 'FRUSTRATED'; // Movimiento caótico/repetitivo
    } else if (velocityMagnitude < 0.15 && pointCollection.length > 30) {
      detectedState = 'HESITATION'; // Dudas sobre elementos de UI
    } else if (velocityMagnitude === 0) {
      detectedState = 'IDLE';
    }

    // 5. Sellado de Pulso Nominal
    return {
      interactionOpCode: InteractionOpCodeSchema.parse(2001),
      intentionScore: Math.min((velocityMagnitude + Math.abs(averageAcceleration)) / 5, 1),
      psychologicalState: detectedState,
      interactionMetadata: {
        samplingRateInMilliseconds: burstDuration / pointCollection.length,
        burstDurationInMilliseconds: burstDuration, // Sello TS2739
        vectorMagnitudePixels: displacementVector,
        averageAcceleration: averageAcceleration,   // Sello TS2739
        movementEntropy: movementEntropy
      }
    };
  }
} as const;

Comlink.expose(BehavioralRefineryBrain);
export type IBehavioralRefineryBrain = typeof BehavioralRefineryBrain;
