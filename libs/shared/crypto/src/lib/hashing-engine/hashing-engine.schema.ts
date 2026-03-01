/**
 * @apparatus HashingEngineDNA
 * @role Especificación genética para la generación de huellas digitales inmutables.
 * @location libs/shared/crypto/src/lib/hashing-engine/hashing-engine.schema.ts
 * @status <SEALED_PRODUCTION>
 * @version 9.3.0
 * @protocol OEDP-V8.5 Lattice
 * @structure ADN
 */

import { z } from 'zod';

/**
 * @section ALGORITMOS PERMITIDOS
 */
export const HashAlgorithmSchema = z.enum(['SHA-1', 'SHA-256', 'SHA-384', 'SHA-512']);
export type IHashAlgorithm = z.infer<typeof HashAlgorithmSchema>;

/**
 * @section DIMENSIONES NOMINALES (M-005)
 */
export const HashedFingerprintSchema = z.string().min(32).brand<'HashedFingerprint'>();
export type IHashedFingerprint = z.infer<typeof HashedFingerprintSchema>;

/**
 * @section CARGAMENTO DE ENTRADA (M-010)
 */
export const HashingInputSchema = z.object({
  informationMaterial: z.union([
    z.string(),
    z.instanceof(Uint8Array),
    z.instanceof(ArrayBuffer)
  ]).describe('Material crudo para el cálculo de la huella.'),
  saltContext: z.string().optional().describe('Sal criptográfica opcional.'),
  // Corrección TS2353: Inyección del campo algorithm
  algorithm: HashAlgorithmSchema.default('SHA-256').describe('Algoritmo de digestión por hardware.'),
}).readonly();

export type IHashingInput = z.infer<typeof HashingInputSchema>;
