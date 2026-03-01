/**
 * @apparatus EncodingEngineDNA
 * @role Especificación genética para transmutaciones entre estados binarios, Uint8Array y Base64Url.
 * @location libs/shared/crypto/src/lib/encoding-engine/encoding-engine.schema.ts
 * @status <SEALED_PRODUCTION>
 * @version 9.2.0
 * @protocol OEDP-V8.5 Lattice
 * @structure ADN
 * @compliance ISO_27001 | ISO_25010
 */

import { z } from 'zod';

/**
 * @section DIMENSIONES NOMINALES (M-005)
 * Identificador de cadena Base64 segura para transporte (URL-Safe).
 */
export const Base64UrlStringSchema = z
  .string()
  .regex(/^[A-Za-z0-9\-_]+$/)
  .brand<'Base64UrlString'>();

/**
 * @section CARGAMENTOS DE INFORMACIÓN (M-010)
 * Definición universal de material binario procesable por la Capa 0.
 */
export const InformationMaterialSchema = z.union([
  z.instanceof(Uint8Array),
  z.instanceof(ArrayBuffer)
]);

/**
 * @section INFERENCIAS SOBERANAS
 */
export type IEncodingBase64Url = z.infer<typeof Base64UrlStringSchema>;
export type IInformationMaterial = z.infer<typeof InformationMaterialSchema>;

/**
 * @context_prompt [LIA Legacy - AI-Audit]
 * DIRECTIVA: Nivelación de ADN para soporte de L2 (IndexedDB).
 * JUSTIFICACIÓN: Se sustituye 'IBufferSource' por 'IInformationMaterial' para
 * alineación técnica con 'HashingEngineLogic'. Se habilita la exportación de
 * tipos para sanar la asimetría detectada en el Worker de Persistencia.
 */
