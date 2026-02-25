/**
 * @apparatus SovereignErrorDNA
 * @role Contratos de bioseguridad para transmutación de fallos y sanitización ISO 27701.
 * @location libs/shared-fundamentals/error-engine/src/lib/error-refinery.schema.ts
 * @status <SEALED_PRODUCTION>
 * @version 8.5.0
 * @protocol OEDP-V8.5 Lattice
 */

import { z } from 'zod';

/**
 * Niveles de Severidad Soberanos (Desacoplados del Logger para independencia de Capa 0).
 */
export const LOG_LEVELS = ['INFO', 'WARN', 'ERROR', 'CRITICAL', 'FATAL'] as const;
export const SeverityLevelSchema = z.enum(LOG_LEVELS);

/**
 * Identificador Nominal del Sistema.
 */
export const SystemErrorCodeSchema = z.string().regex(/^RWC-[A-Z]+-\d{4}$/).brand<'SystemErrorCode'>();
export type ISystemErrorCode = z.infer<typeof SystemErrorCodeSchema>;

/**
 * Cargamento Único de Entrada (Superficie) - M-010
 */
export const ErrorTransmutationInputSchema = z.object({
  uniqueErrorCode: SystemErrorCodeSchema,
  severity: SeverityLevelSchema,
  apparatusIdentifier: z.string().min(2),
  semanticKey: z.string().optional().describe('Clave i18n para el usuario (Fallback automático si no se provee).'),
  caughtError: z.unknown().describe('La excepción nativa capturada en el bloque catch.'),
  informationPayloadSnapshot: z.record(z.string(), z.unknown()).optional().describe('Contexto de la memoria local en el momento del fallo.'),
}).readonly();

export type IErrorTransmutationInput = z.infer<typeof ErrorTransmutationInputSchema>;

/**
 * ADN del Paquete Forense Sanitizado (Materia Oscura).
 */
export const ForensicErrorPacketSchema = z.object({
  z: z.number().int().describe('Compound Bitwise OpCode (ZTM)'),
  c: z.string().uuid().describe('Correlation Identifier'),
  t: z.string().optional().describe('Tenant Identifier'),
  k: z.string().describe('Semantic Key (Alma)'),
  v: z.string().optional().describe('Interpolation Variables (JSON)'),
  forensicTrace: z.object({
    timestampUnix: z.number().int(),
    scrubbedStackTrace: z.string(),
    memorySnapshot: z.string().optional(),
  }),
}).readonly();

export type IForensicErrorPacket = z.infer<typeof ForensicErrorPacketSchema>;