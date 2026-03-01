/**
 * @apparatus KineticMotionDNA
 * @role Contratos genéticos para vectores de aceleración e identificación de gestos.
 * @location libs/hardware/motion/src/lib/motion-refinery/motion-refinery.schema.ts
 * @status <STABILIZED>
 * @version 1.1.0
 * @protocol OEDP-V8.5 Lattice
 */

import { z } from 'zod';

// 1. Branding Nominal (M-005) - Unidades de Medida Soberanas
export const KineticCoordinateSchema = z.number().describe('Valor de aceleración en m/s² con truncamiento de precisión.').brand<'KineticCoordinate'>();
export const KineticMagnitudeSchema = z.number().nonnegative().brand<'KineticMagnitude'>();
export const KineticTimestampSchema = z.number().int().positive().brand<'KineticTimestamp'>();

/**
 * @schema KineticVectorSchema
 * @description Representación absoluta del movimiento en el espacio euclidiano.
 */
export const KineticVectorSchema = z.object({
  accelerationXAxis: KineticCoordinateSchema,
  accelerationYAxis: KineticCoordinateSchema,
  accelerationZAxis: KineticCoordinateSchema,
}).readonly();

/**
 * @schema KineticGestureSchema
 * @description Clasificación determinística de estados físicos detectados.
 */
export const KineticGestureSchema = z.enum([
  'STABLE',
  'SHAKING',
  'TILTED',
  'FREE_FALL',
  'UNKNOWN_MOTION'
]).brand<'KineticGesture'>();

// 2. Esquema de Cargamento Único (Snapshot de Contexto)
export const MotionContextSnapshotSchema = z.object({
  accelerationVector: KineticVectorSchema,
  detectedGesture: KineticGestureSchema,
  vectorMagnitude: KineticMagnitudeSchema,
  timestampUnix: KineticTimestampSchema,
}).readonly();

// 3. Inferencia de Tipos Soberanos
export type IKineticGesture = z.infer<typeof KineticGestureSchema>;
export type IKineticVector = z.infer<typeof KineticVectorSchema>;
export type IMotionContextSnapshot = z.infer<typeof MotionContextSnapshotSchema>;

/**
 * @note Este ADN impone el truncamiento decimal para cumplir con la ISO 27701,
 * evitando que micro-vibraciones sean usadas para ingeniería inversa de audio.
 */
