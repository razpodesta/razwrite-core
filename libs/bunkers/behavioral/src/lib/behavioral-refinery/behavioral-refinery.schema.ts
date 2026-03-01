/**
 * @apparatus BehavioralRefineryDNA
 * @role Contratos genéticos para la captura de micro-gestos y estados psicológicos determinísticos.
 * @location libs/bunkers/behavioral/src/lib/behavioral-refinery/behavioral-refinery.schema.ts
 * @status <SEALED_PRODUCTION>
 * @version 9.2.0
 * @protocol OEDP-V8.5 Lattice
 * @structure ADN
 * @compliance ISO_27701 | ISO_25010
 */

import { z } from 'zod';

/**
 * @section DIMENSIONES NOMINALES (M-005)
 * Identificadores numéricos para la matriz de telemetría conductual ZTM.
 */
export const InteractionOpCodeSchema = z.number().int().brand<'InteractionOpCode'>();
export type IInteractionOpCode = z.infer<typeof InteractionOpCodeSchema>;

/**
 * @section ONTOLOGÍA CONDUCTUAL (M-021)
 * Clasificación determinística del estado psicofisiológico del sujeto.
 */
export const PsychologicalStateSchema = z.enum([
  'URGENCY',      // Alta velocidad de desplazamiento y clics.
  'HESITATION',   // Movimiento errático o pausas prolongadas en áreas críticas.
  'IDLE',         // Ausencia de actividad cinestésica.
  'ENGAGED',      // Flujo de interacción coherente con los objetivos del Inquilino.
  'FRUSTRATED'    // Patrones de movimiento circular o clics repetitivos sin éxito.
]);
export type IPsychologicalState = z.infer<typeof PsychologicalStateSchema>;

/**
 * @section CAPTURA DE SUPERFICIE
 * Punto geográfico de interacción capturado en el hilo de superficie.
 */
export const RawInteractionPointSchema = z.object({
  coordinateX: z.number().describe('Posición X en píxeles lógicos.'),
  coordinateY: z.number().describe('Posición Y en píxeles lógicos.'),
  timestampInMilliseconds: z.number().nonnegative(),
}).readonly();

export type IRawInteractionPoint = z.infer<typeof RawInteractionPointSchema>;

/**
 * @section REFINADO TELEMÉTRICO
 * Metadatos estructurados tras el análisis cinético en el Hilo Profundo (Deep-Pulse).
 */
export const BehavioralInteractionMetadataSchema = z.object({
  samplingRateInMilliseconds: z.number().nonnegative().describe('Frecuencia de captura de la ráfaga.'),
  burstDurationInMilliseconds: z.number().nonnegative().describe('Tiempo total de la ráfaga analizada.'),
  vectorMagnitudePixels: z.number().nonnegative().describe('Distancia neta recorrida.'),
  averageAcceleration: z.number().describe('Cambio de velocidad promedio durante la interacción.'),
  movementEntropy: z.number().min(0).max(1).describe('Índice de desorden del movimiento (0: Lineal, 1: Caótico).'),
  interactionAreaIdentifier: z.string().optional().describe('Referencia al componente visual (SDUI ID) bajo el cursor.'),
  devicePixelDensity: z.number().optional(),
}).readonly();

/**
 * @section CARGAMENTO SOBERANO (M-010)
 * Pulso conductual inmutable listo para la Membrana de Ósmosis.
 */
export const RefinedBehavioralPulseSchema = z.object({
  interactionOpCode: InteractionOpCodeSchema,
  intentionScore: z.number().min(0).max(1).describe('Probabilidad de conversión o intención de acción.'),
  psychologicalState: PsychologicalStateSchema,
  interactionMetadata: BehavioralInteractionMetadataSchema,
}).readonly();

export type IRefinedBehavioralPulse = z.infer<typeof RefinedBehavioralPulseSchema>;
