/**
 * @apparatus HashingEngineDNA
 * @role Especificación genética para la generación de huellas digitales inmutables.
 * @location libs/shared/crypto/src/lib/hashing-engine/hashing-engine.schema.ts
 * @status <SEALED_PRODUCTION>
 * @version 9.0.0
 * @protocol OEDP-V8.5 Lattice
 * @structure ADN
 */

import { z } from 'zod';

/**
 * @section DIMENSIONES NOMINALES (M-005)
 * Identificador único generado por hashing (Deterministic Fingerprint).
 */
export const HashedFingerprintSchema = z.string().min(32).brand<'HashedFingerprint'>();

/**
 * @section CARGAMENTO DE ENTRADA (M-010)
 */
export const HashingInputSchema = z.object({
  informationMaterial: z.union([
    z.string(),
    z.instanceof(Uint8Array),
    z.instanceof(ArrayBuffer)
  ]).describe('Material crudo para el cálculo de la huella.'),
  saltContext: z.string().optional().describe('Sal criptográfica opcional para evitar colisiones.'),
}).readonly();

/**
 * @section INFERENCIAS SOBERANAS
 */
export type IHashedFingerprint = z.infer<typeof HashedFingerprintSchema>;
export type IHashingInput = z.infer<typeof HashingInputSchema>;
