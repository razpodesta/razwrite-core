/**
 * @apparatus NeuralBridgeDNA
 * @role Especificación genética de la ontología numérica y contratos de transporte Bitwise.
 * @location libs/shared/matrix-neural-bridge/src/lib/neural-bridge-core/neural-bridge-core.schema.ts
 * @status <STABILIZED>
 * @version 9.1.0
 * @protocol OEDP-V8.5 Lattice
 * @structure ADN
 * @compliance ISO_27001 | ISO_25010
 */

import { z } from 'zod';

/**
 * @section IDENTIFICADORES SOBERANOS (M-004)
 * Evitan la inyección de hilos de texto crudo en la Matrix.
 */
export const ApparatusIdentifierSchema = z.string().min(2).brand<'ApparatusIdentifier'>();
export const OperationIdentifierSchema = z.string().min(2).brand<'OperationIdentifier'>();

export type IApparatusIdentifier = z.infer<typeof ApparatusIdentifierSchema>;
export type IOperationIdentifier = z.infer<typeof OperationIdentifierSchema>;

/**
 * @section DIMENSIONES BINARIAS (M-005)
 * Arquitectura Bitwise Int32: [Sev: 3b][Lay: 3b][App: 10b][Op: 16b]
 */
export const OperationOpCodeSchema = z.number().int().min(0).max(65535).brand<'OperationOpCode'>();
export const SeverityOpCodeSchema = z.number().int().min(0).max(7).brand<'SeverityOpCode'>();
export const ApparatusOpCodeSchema = z.number().int().min(0).max(1023).brand<'ApparatusOpCode'>();
export const LayerOpCodeSchema = z.number().int().min(0).max(7).brand<'LayerOpCode'>();
export const CompoundOpCodeSchema = z.number().int().brand<'CompoundOpCode'>();

export type IOperationOpCode = z.infer<typeof OperationOpCodeSchema>;
export type ISeverityOpCode = z.infer<typeof SeverityOpCodeSchema>;
export type IApparatusOpCode = z.infer<typeof ApparatusOpCodeSchema>;
export type ILayerOpCode = z.infer<typeof LayerOpCodeSchema>;
export type ICompoundOpCode = z.infer<typeof CompoundOpCodeSchema>;

/**
 * @section TAXONOMÍA DE SEVERIDAD
 */
export const SeverityLevelSchema = z.enum(['INFO', 'WARN', 'ERROR', 'CRITICAL', 'FATAL']);
export type ISeverityLevel = z.infer<typeof SeverityLevelSchema>;

/**
 * @section CONTRATOS DE REGISTRO (M-010)
 * Protocolo de inyección de dialectos técnicos en la Matrix.
 */
export const DialectRegistrationInputSchema = z.object({
  apparatusIdentifier: ApparatusIdentifierSchema,
  apparatusOpCode: ApparatusOpCodeSchema,
  layerOpCode: LayerOpCodeSchema,
  operationDialect: z.record(OperationIdentifierSchema, OperationOpCodeSchema),
}).readonly();

export type IDialectRegistrationInput = z.infer<typeof DialectRegistrationInputSchema>;

/**
 * @section CONTRATOS DE BÚSQUEDA Y FORJA (QUERY PAYLOADS)
 */
export const OperationSearchInputSchema = z.object({
  apparatusIdentifier: ApparatusIdentifierSchema,
  operationIdentifier: OperationIdentifierSchema,
}).readonly();

export const CompoundForgeInputSchema = z.object({
  severityLevel: SeverityLevelSchema,
  apparatusIdentifier: ApparatusIdentifierSchema,
  operationIdentifier: OperationIdentifierSchema,
}).readonly();

export type IOperationSearchInput = z.infer<typeof OperationSearchInputSchema>;
export type ICompoundForgeInput = z.infer<typeof CompoundForgeInputSchema>;
