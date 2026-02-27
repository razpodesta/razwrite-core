/**
 * @apparatus EncodingEngineDNA
 * @role Especificación genética para transmutaciones entre estados binarios y textuales.
 * @location libs/shared/crypto/src/lib/encoding-engine/encoding-engine.schema.ts
 * @status <SEALED_PRODUCTION>
 * @version 9.0.0
 * @protocol OEDP-V8.5 Lattice
 * @structure ADN
 */

import { z } from 'zod';

/**
 * @section DIMENSIONES NOMINALES (M-005)
 */
export const Base64UrlStringSchema = z
  .string()
  .regex(/^[A-Za-z0-9\-_]+$/)
  .brand<'Base64UrlString'>();

/**
 * @section CARGAMENTOS DE ENTRADA
 */
export const BufferToTextInternalSchema = z.instanceof(Uint8Array).or(z.instanceof(ArrayBuffer));

/**
 * @section INFERENCIAS SOBERANAS
 */
export type IBase64UrlString = z.infer<typeof Base64UrlStringSchema>;
export type IBufferSource = z.infer<typeof BufferToTextInternalSchema>;
