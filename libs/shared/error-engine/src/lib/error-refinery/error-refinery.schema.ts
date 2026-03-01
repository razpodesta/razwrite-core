/**
 * @apparatus SovereignErrorDNA
 * @role Contratos de bioseguridade para transmutação de falhas e sanitização ISO 27701.
 * @location libs/shared/error-engine/src/lib/error-refinery/error-refinery.schema.ts
 * @status <STABILIZED>
 * @version 9.3.2
 * @protocol OEDP-V8.5 Lattice
 * @structure ADN
 * @compliance ISO_27701 | ISO_27001
 */

import { z } from 'zod';

/**
 * @section DIMENSIONES NOMINALES (M-005)
 */
export const SeverityLevelSchema = z.enum(['INFO', 'WARN', 'ERROR', 'CRITICAL', 'FATAL']);
export const SystemErrorCodeSchema = z
  .string()
  .regex(/^RWC-[A-Z]+-\d{4}$/)
  .brand<'SystemErrorCode'>();

/**
 * @section CARGAMENTO DE TRANSMUTACIÓN (INPUT)
 * M-010: Contrato único para a neutralização de exceções.
 */
export const ErrorTransmutationInputSchema = z.object({
  uniqueErrorCode: SystemErrorCodeSchema,
  severity: SeverityLevelSchema,
  apparatusIdentifier: z.string().min(2).describe('Nome PascalCase do aparato de origem.'),

  /** ✅ CURADO: semanticKey em conformidade com M-004 */
  semanticKey: z.string()
    .min(1)
    .describe('Ruta absoluta no dicionário Alma (i18n).'),

  caughtError: z.unknown().describe('A exceção nativa capturada pela aduana.'),

  informationPayloadSnapshot: z
    .record(z.string(), z.unknown())
    .optional()
    .describe('Snapshot do Quantum-State no momento do colapso (Adéndum 001-A).'),
}).readonly();

/**
 * @section PAQUETE FORENSE (DARK MATTER)
 * M-002: Esquema de validação para transporte comprimido para o Neural Sentinel.
 */
export const ForensicErrorPacketSchema = z.object({
  o: z.number().int().describe('Operation OpCode (Matrix)'),
  s: z.number().int().describe('Severity OpCode (Matrix)'),
  c: z.string().uuid().describe('Correlation Identifier (Context)'),
  u: z.string().min(12).describe('Mutant Passport Identifier (Identity)'),
  t: z.string().min(3).describe('Tenant Identifier (SDUI)'),
  l: z.number().int().describe('Metabolic State OpCode (Energy)'),
  p: z.string().describe('Encrypted Payload (JWE)'),
  st: z.string().describe('Compressed & Scrubbed StackTrace'),
  msg: z.string().describe('Semantic Message (Alma)'),
}).readonly();

/**
 * @section INFERENCIAS SOBERANAS
 */
export type ISeverityLevel = z.infer<typeof SeverityLevelSchema>;
export type ISystemErrorCode = z.infer<typeof SystemErrorCodeSchema>;
export type IErrorTransmutationInput = z.infer<typeof ErrorTransmutationInputSchema>;
export type IForensicErrorPacket = z.infer<typeof ForensicErrorPacketSchema>;
