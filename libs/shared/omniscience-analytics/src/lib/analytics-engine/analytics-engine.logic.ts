/**
 * @apparatus OmniscienceAnalyticsLogic
 * @role Motor de inferencia conductual y agregación de escenarios de intención.
 * @location libs/shared/omniscience-analytics/src/lib/analytics-engine/analytics-engine.logic.ts
 * @status <STABILIZED>
 * @version 1.0.1
 * @protocol OEDP-V8.5 Lattice
 * @hilo Acid-Pulse
 * @structure NEXO
 * @compliance ISO_27001 | ISO_27701
 */

import {
  MatrixNeuralBridgeGateway,
  OperationOpCodeSchema
} from '@razwritecore/nsk-shared-matrix-neural-bridge';

import {
  SovereignLogger,
  ApparatusIdentifierSchema,
  OperationCodeSchema
} from '@razwritecore/nsk-shared-logger';

import {
  type IDecodedTelemetryInput,
  DecodedTelemetryInputSchema
} from './analytics-engine.schema';

/**
 * @section CONSTANTES SOBERANAS (NOMINAL BRANDING)
 * Se sellan los identificadores para cumplir con M-005.
 */
const APPARATUS_ID = ApparatusIdentifierSchema.parse('OmniscienceAnalytics');
const LOGGER_SYSTEM_ID = ApparatusIdentifierSchema.parse('SovereignLogger');

export const OmniscienceAnalyticsEngine = {
  /**
   * @method processDecodedPulse
   * @description Analiza un pulso de telemetría descifrado para actualizar el Gemelo Psicológico.
   * Utiliza la Matrix para la de-codificación semántica de la intención.
   */
  processDecodedPulse: async (
    decodedInput: IDecodedTelemetryInput
  ): Promise<void> => {
    try {
      // 1. Aduana Genética (M-005)
      const validated = DecodedTelemetryInputSchema.parse(decodedInput);

      /**
       * 2. Traducción de Escenario (M-004)
       * El motor pregunta a la Matrix qué significa esta operación.
       * Eliminación de 'any': Se utilizan esquemas para el casting nominal legítimo.
       */
      const semanticOperation = MatrixNeuralBridgeGateway.resolveSemanticOperation(
        LOGGER_SYSTEM_ID,
        OperationOpCodeSchema.parse(validated.operationOpCode)
      );

      // 3. Inferencia de Intención (M-021)
      const calculatedUrgencyScore = calculateUrgencyFactor(validated.executionLatency);

      // 4. Rastro Forense de Inteligencia (ZTM)
      SovereignLogger.emit({
        severity: 'INFO',
        apparatusIdentifier: APPARATUS_ID,
        operationCode: OperationCodeSchema.parse('INSIGHT_GENERATED'),
        semanticKey: 'OmniscienceAnalytics.insightSuccess',
        forensicMetadata: {
          subjectMutantIdentifier: validated.mutantPassportIdentifier,
          semanticScenario: semanticOperation,
          urgencyScore: calculatedUrgencyScore,
          inputApparatusOpCode: validated.apparatusOpCode
        }
      });

      /**
       * @todo Integración con Capa de Persistencia (Neon)
       * El volcado al PsychologicalTwinSnapshot se realizará mediante el búnker de persistencia acid.
       */
    } catch (caughtError) {
      // Protección de rastro ante colapsos de inferencia
      console.error('CRITICAL_ANALYTICS_INFERENCE_FAILURE', caughtError);
    }
  }
} as const;

/**
 * @function calculateUrgencyFactor
 * @private
 * @description Analiza la latencia de interacción para cuantificar la urgencia del MutantID.
 * @returns Un valor numérico que representa el score de urgencia.
 */
function calculateUrgencyFactor(executionLatencyInMilliseconds: number): number {
  if (executionLatencyInMilliseconds < 50) return 10;
  if (executionLatencyInMilliseconds > 500) return 80;
  return 40;
}
