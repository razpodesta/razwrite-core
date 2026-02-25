/**
 * @apparatus SovereignLoggerDNA
 * @role Contrato de validación genética para pulsos de telemetría y rastro forense.
 * @location libs/shared-fundamentals/logger/src/lib/sovereign-logger.schema.ts
 * @status <SEALED_PRODUCTION>
 * @version 8.5.0
 * @protocol OEDP-V8.5 Lattice
 */

import { z } from 'zod';

/**
 * Tipado Nominal (Nominal Branding) para evitar colisiones de primitivos (M-005).
 */
export const CorrelationIdentifierSchema = z.string().uuid().brand<'CorrelationIdentifier'>();
export const TenantIdentifierSchema = z.string().min(3).brand<'TenantIdentifier'>();

/**
 * Niveles de Severidad Soberanos.
 */
export const LOG_LEVELS = ['INFO', 'WARN', 'ERROR', 'CRITICAL', 'FATAL'] as const;
export const SeverityLevelSchema = z.enum(LOG_LEVELS);

/**
 * Esquema de Cargamento Único de Entrada (M-010).
 */
export const TelemetryPulseInputSchema = z.object({
  severity: SeverityLevelSchema,
  apparatusIdentifier: z.string().min(2).describe('Nombre PascalCase del aparato emisor.'),
  operationCode: z.string().min(3).describe('Código UPPER_SNAKE_CASE de la intención ejecutada.'),
  semanticKey: z.string().describe('Ruta en el diccionario i18n (Ej: IdentityEngine.UserLoggedIn).'),
  interpolationVariables: z.record(z.string(), z.union([z.string(), z.number(), z.boolean()])).optional().describe('Variables para hidratación semántica.'),
  forensicMetadata: z.record(z.string(), z.unknown()).optional().describe('Metadatos contextuales para el Neural Sentinel.'),
  executionLatencyInMilliseconds: z.number().nonnegative().optional().describe('Medición de latencia atómica.'),
}).readonly();

/**
 * Inferencia de tipos para consumo interno.
 */
export type ICorrelationIdentifier = z.infer<typeof CorrelationIdentifierSchema>;
export type ITenantIdentifier = z.infer<typeof TenantIdentifierSchema>;
export type ITelemetryPulseInput = z.infer<typeof TelemetryPulseInputSchema>;

/**
 * ADN del Pulso Comprimido (ZTM) para el Neural Sentinel (M-001).
 */
export interface ICompressedTelemetryPulse {
  readonly s: number; // Severity OpCode
  readonly a: number; // Apparatus OpCode
  readonly o: number; // Operation OpCode
  readonly c: string; // Correlation Identifier
  readonly t?: string; // Tenant Identifier
  readonly l?: number; // Latency In Milliseconds
  readonly k: string; // Semantic Key (M-007)
  readonly v?: string; // Interpolation Variables (JSON)
  readonly m?: string; // Serialized Forensic Metadata
}

/**
 * Contexto de Ejecución Asíncrono.
 */
export interface ISovereignExecutionContext {
  readonly correlationIdentifier: ICorrelationIdentifier;
  readonly tenantIdentifier?: ITenantIdentifier;
}