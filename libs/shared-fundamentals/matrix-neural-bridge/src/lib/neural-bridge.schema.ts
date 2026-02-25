/**
 * @apparatus MatrixNeuralDNA
 * @role Definición de la ontología numérica, registro dinámico y tipado nominal de OpCodes.
 * @location libs/shared-fundamentals/matrix-neural-bridge/src/lib/neural-bridge.schema.ts
 * @status <SEALED_PRODUCTION>
 * @version 8.5.0
 * @protocol OEDP-V8.5 Lattice
 */

import { z } from 'zod';

/**
 * Branding Nominal para la Matriz Cognitiva (M-005).
 * Límites basados en la arquitectura Bitwise de 32 bits.
 */
export const OperationOpCodeSchema = z.number().int().min(1).max(32767).brand<'OperationOpCode'>();
export const SeverityOpCodeSchema = z.number().int().min(1).max(7).brand<'SeverityOpCode'>();
export const ApparatusOpCodeSchema = z.number().int().min(1).max(1023).brand<'ApparatusOpCode'>();
export const LayerOpCodeSchema = z.number().int().min(1).max(7).brand<'LayerOpCode'>();
export const CompoundOpCodeSchema = z.number().int().nonnegative().brand<'CompoundOpCode'>();

export type IOperationOpCode = z.infer<typeof OperationOpCodeSchema>;
export type ISeverityOpCode = z.infer<typeof SeverityOpCodeSchema>;
export type IApparatusOpCode = z.infer<typeof ApparatusOpCodeSchema>;
export type ILayerOpCode = z.infer<typeof LayerOpCodeSchema>;
export type ICompoundOpCode = z.infer<typeof CompoundOpCodeSchema>;

/**
 * Niveles de Severidad y su traducción numérica estática.
 */
export const LOG_LEVELS = ['INFO', 'WARN', 'ERROR', 'CRITICAL', 'FATAL'] as const;
export const SeverityLevelSchema = z.enum(LOG_LEVELS);
export type ISeverityLevel = z.infer<typeof SeverityLevelSchema>;

/**
 * Cargamento Único (M-010) para el Registro Dinámico de Dialectos.
 */
export const DialectRegistrationPayloadSchema = z.object({
  apparatusIdentifier: z.string().min(2).describe('Identificador semántico del aparato emisor.'),
  apparatusOpCode: z.number().int().min(1).max(1023),
  layerOpCode: z.number().int().min(1).max(7).describe('Identificador de la Capa de Soberanía (L0-L4).'),
  operationDialect: z.record(z.string(), z.number().int().min(1).max(32767)).describe('Mapa semántico a OpCode.'),
}).readonly();

export type IDialectRegistrationPayload = z.infer<typeof DialectRegistrationPayloadSchema>;

/**
 * Cargamentos Únicos (M-010) para las Búsquedas en el Gateway.
 */
export const ApparatusLookupPayloadSchema = z.object({
  apparatusIdentifier: z.string(),
}).readonly();

export const OperationLookupPayloadSchema = z.object({
  apparatusIdentifier: z.string(),
  operationIdentifier: z.string(),
}).readonly();

export const ReverseLookupPayloadSchema = z.object({
  apparatusIdentifier: z.string(),
  operationOpCode: z.number().int(),
}).readonly();

export const CompoundOpCodePayloadSchema = z.object({
  severityLevel: SeverityLevelSchema,
  apparatusIdentifier: z.string(),
  operationIdentifier: z.string(),
}).readonly();

export type IApparatusLookupPayload = z.infer<typeof ApparatusLookupPayloadSchema>;
export type IOperationLookupPayload = z.infer<typeof OperationLookupPayloadSchema>;
export type IReverseLookupPayload = z.infer<typeof ReverseLookupPayloadSchema>;
export type ICompoundOpCodePayload = z.infer<typeof CompoundOpCodePayloadSchema>;