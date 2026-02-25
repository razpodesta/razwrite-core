/**
 * @apparatus CryptoCoreDNA
 * @role Definición de contratos de entrada/salida y tipos nominales criptográficos.
 * @location libs/shared-fundamentals/crypto/src/lib/crypto-core.schema.ts
 * @status <SEALED_PRODUCTION>
 * @version 8.5.3
 * @protocol OEDP-V8.5 Lattice
 */

import { z } from 'zod';

/**
 * @context_prompt [LIA Legacy - AI-Audit]
 * DIRECTIVA: Inyección de Tipos Inferidos Soberanos.
 * JUSTIFICACIÓN: Se detectó la ausencia de `ICipherText` e `IInitializationVector` en el ADN, 
 * lo que impedía la validación nominal en búnkeres de persistencia y telemetría.
 * IMPACTO: Estabilización de la Capa Zero y eliminación de errores de compilación TS 2305.
 */

// Tipos Nominales (Branded Types) - M-005
export const Base64UrlStringSchema = z.string().regex(/^[A-Za-z0-9\-_]+$/).brand<'Base64UrlString'>();
export const CipherTextSchema = z.string().min(1).brand<'CipherText'>();
export const InitializationVectorSchema = z.string().length(16).brand<'InitializationVector'>(); // 12 bytes = 16 base64 chars aprox

// Input para Cifrado
export const EncryptionInputSchema = z.object({
  dataPayload: z.union([z.string(), z.record(z.string(), z.unknown())]),
  masterKey: z.instanceof(CryptoKey),
}).readonly();

// Output de Cifrado (JWE Compact-like structure)
export const EncryptedPacketSchema = z.object({
  c: CipherTextSchema.describe('Ciphertext (Datos cifrados)'),
  iv: Base64UrlStringSchema.describe('Initialization Vector (Público, aleatorio)'),
  t: z.number().int().describe('Timestamp de creación'),
}).readonly();

// Input para Derivación de Llaves
export const KeyDerivationInputSchema = z.object({
  secretMaterial: z.string().min(8).describe('Contraseña o secreto base'),
  saltContext: z.string().min(5).describe('Contexto único (ej: UserID o TenantID)'),
}).readonly();

// Tipos inferidos soberanos
export type IBase64UrlString = z.infer<typeof Base64UrlStringSchema>;
export type ICipherText = z.infer<typeof CipherTextSchema>;
export type IInitializationVector = z.infer<typeof InitializationVectorSchema>;

export type IEncryptionInput = z.infer<typeof EncryptionInputSchema>;
export type IEncryptedPacket = z.infer<typeof EncryptedPacketSchema>;
export type IKeyDerivationInput = z.infer<typeof KeyDerivationInputSchema>;