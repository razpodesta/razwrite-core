/**
 * @apparatus KineticMotionDNA
 * @role Contratos genéticos para vectores de aceleración e identificación de gestos.
 * @location libs/hardware-refineries/motion/src/lib/motion-refinery.schema.ts
 * @status <SEALED_PRODUCTION>
 * @version 1.0.0
 * @protocol OEDP-V8.5 Lattice
 */

import { z } from 'zod';

export const KineticVectorSchema = z.object({
  axisX: z.number().describe('Aceleración lateral.'),
  axisY: z.number().describe('Aceleración longitudinal.'),
  axisZ: z.number().describe('Aceleración vertical.'),
}).readonly();

export const KineticGestureSchema = z.enum([
  'STABLE',
  'SHAKING',
  'TILTED',
  'FREE_FALL'
]).brand<'KineticGesture'>();

export type IKineticGesture = z.infer<typeof KineticGestureSchema>;

export const MotionContextSnapshotSchema = z.object({
  accelerationVector: KineticVectorSchema,
  detectedGesture: KineticGestureSchema,
  vectorMagnitude: z.number(),
  timestampUnix: z.number().int(),
}).readonly();

export type IMotionContextSnapshot = z.infer<typeof MotionContextSnapshotSchema>;
