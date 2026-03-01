/**
 * @apparatus LoggerCoreDNA
 * @role Especificação genética para pulsos de telemetria, rastro forense e snapshots cuánticos.
 * @location libs/shared/logger/src/lib/logger-core/logger-core.schema.ts
 * @status <STABILIZED>
 * @version 9.3.2
 * @protocol OEDP-V8.5 Lattice
 * @structure ADN
 * @compliance ISO_25010 | ISO_27001
 */

import { z } from 'zod';

/**
 * @section DIMENSIONES NOMINALES (M-005)
 * Sellado de identificadores para evitar radiación de tipos primitivos y colisiones de dominio.
 */
export const CorrelationIdentifierSchema = z.string().uuid().brand<'CorrelationIdentifier'>();
export const TenantIdentifierSchema = z.string().min(3).brand<'TenantIdentifier'>();
export const MutantPassportIdentifierSchema = z.string().min(12).brand<'MutantPassportIdentifier'>();
export const ApparatusIdentifierSchema = z.string().min(2).brand<'ApparatusIdentifier'>();
export const OperationCodeSchema = z.string().min(3).regex(/^[A-Z_]+$/).brand<'OperationCode'>();

/**
 * @section GOBERNANZA DE SEVERIDAD
 * Niveles determinísticos para la gestión de QoS y filtrado del Neural Sentinel.
 */
export const SeverityLevelSchema = z.enum(['INFO', 'WARN', 'ERROR', 'CRITICAL', 'FATAL']);

/**
 * @section CONTEXTO SOBERANO (ISOMORFÍA)
 * Define el contrato de identidad mínima inyectado silenciosamente en cada hilo de ejecución.
 */
export const SovereignExecutionContextSchema = z.object({
  correlationIdentifier: CorrelationIdentifierSchema,
  tenantIdentifier: TenantIdentifierSchema,
  mutantPassportIdentifier: MutantPassportIdentifierSchema,
}).readonly();

/**
 * @section CARGAMENTO DE ENTRADA (M-010)
 * Contrato único para la emisión de pulsos desde cualquier plano (Surface/Deep/Acid).
 */
export const TelemetryPulseInputSchema = z.object({
  severity: SeverityLevelSchema,

  apparatusIdentifier: ApparatusIdentifierSchema
    .describe('Identificador PascalCase del aparato emisor.'),

  operationCode: OperationCodeSchema
    .describe('Código de operación registrado en la Matrix Neural Bridge.'),

  semanticKey: z.string()
    .min(1)
    .describe('Ruta absoluta en el diccionario Alma (i18n) para resolución de mensajes.'),

  interpolationVariables: z.record(
    z.string(),
    z.union([z.string(), z.number(), z.boolean()])
  ).optional().describe('Variables para inyectar en el mensaje semántico.'),

  forensicMetadata: z.record(z.string(), z.unknown())
    .optional()
    .describe('Carga útil de rastro forense libre de PII.'),

  // Adéndum 001-A: Captura del estado de memoria compartida en fallos críticos.
  quantumStateSnapshot: z.instanceof(Uint8Array)
    .optional()
    .describe('Snapshot binario de la memoria atómica capturado pre-fallo.'),

  executionLatencyInMilliseconds: z.number()
    .nonnegative()
    .optional()
    .describe('Latencia de ejecución medida por el cronômetro del aparato.'),
}).readonly();

/**
 * @section INFERENCIAS SOBERANAS
 */
export type ICorrelationIdentifier = z.infer<typeof CorrelationIdentifierSchema>;
export type ITenantIdentifier = z.infer<typeof TenantIdentifierSchema>;
export type IMutantPassportIdentifier = z.infer<typeof MutantPassportIdentifierSchema>;
export type ISovereignExecutionContext = z.infer<typeof SovereignExecutionContextSchema>;
export type ITelemetryPulseInput = z.infer<typeof TelemetryPulseInputSchema>;

/**
 * @section MATERIA OSCURA (ZTM)
 * Interfaz para el transporte comprimido hacia el Neural Sentinel.
 * M-001: Se mantiene nomenclatura corta solo para el paquete binario final de red.
 */
export interface ICompressedTelemetryPulse {
  readonly s: number;  // Severity OpCode (ZTM)
  readonly a: number;  // Apparatus OpCode (ZTM)
  readonly o: number;  // Operation OpCode (ZTM)
  readonly c: string;  // Correlation Identifier (UUID)
  readonly u: string;  // Mutant Passport Identifier (M-022)
  readonly t?: string; // Tenant Identifier (Context)
  readonly l?: number; // Latency In Milliseconds (Performance)
  readonly k: string;  // Semantic Key (Alma)
  readonly m?: string; // Serialized Forensic Metadata + Base64 Quantum Snapshot
}
