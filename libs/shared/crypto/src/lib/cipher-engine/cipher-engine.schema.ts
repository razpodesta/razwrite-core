/**
 * @apparatus CipherEngineDNA
 * @role Especificación genética para cifrado simétrico AES-GCM y paquetes de Materia Oscura.
 * @location libs/shared/crypto/src/lib/cipher-engine/cipher-engine.schema.ts
 * @status <SEALED_PRODUCTION>
 * @version 9.0.0
 * @protocol OEDP-V8.5 Lattice
 * @structure ADN
 * @compliance ISO_27001
 */

import { z } from 'zod';

/**
 * @section DIMENSIONES NOMINALES (M-005)
 * Sellado de primitivos criptográficos.
 */
export const Base64UrlStringSchema = z.string().regex(/^[A-Za-z0-9\-_]+$/).brand<'Base64UrlString'>();
export const CipherTextSchema = z.string().min(1).brand<'CipherText'>();
export const InitializationVectorSchema = z.string().min(12).brand<'InitializationVector'>();

/**
 * @section CARGAMENTO DE ENTRADA (M-010)
 * Contrato de cifrado simétrico.
 */
export const CipherTransmissionInputSchema = z.object({
  informationPayload: z.union([
    z.string(),
    z.record(z.string(), z.unknown()),
    z.instanceof(Uint8Array)
  ]).describe('Datos crudos a proteger.'),
  masterCryptionKey: z.instanceof(CryptoKey).describe('Llave AES-GCM validada.'),
}).readonly();

/**
 * @section PAQUETE DE MATERIA OSCURA (ZTM)
 * Estructura comprimida para transporte y persistencia.
 */
export const OpaqueDataPacketSchema = z.object({
  c: CipherTextSchema.describe('Ciphertext (Datos cifrados)'),
  iv: Base64UrlStringSchema.describe('Initialization Vector (Público)'),
  t: z.number().int().describe('Unix Timestamp de sellado'),
}).readonly();

/**
 * @section INFERENCIAS SOBERANAS
 */
export type IBase64UrlString = z.infer<typeof Base64UrlStringSchema>;
export type ICipherText = z.infer<typeof CipherTextSchema>;
export type IInitializationVector = z.infer<typeof InitializationVectorSchema>;

export type ICipherTransmissionInput = z.infer<typeof CipherTransmissionInputSchema>;
export type IOpaqueDataPacket = z.infer<typeof OpaqueDataPacketSchema>;
