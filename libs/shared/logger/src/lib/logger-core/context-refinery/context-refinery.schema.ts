/**
 * @apparatus ContextRefineryDNA
 * @role Validación de integridad para el contexto de ejecución soberano.
 * @location libs/shared/logger/src/lib/logger-core/context-refinery/context-refinery.schema.ts
 * @status <STABILIZED>
 * @version 2.0.0
 * @protocol OEDP-V8.5 Lattice
 * @structure ADN
 */

import { z } from 'zod';
import {
  CorrelationIdentifierSchema,
  TenantIdentifierSchema,
  MutantPassportIdentifierSchema
} from '../logger-core.schema';

/**
 * @section CONTRATO DE CONTEXTO (M-022)
 * Valida que el contexto posea la tríada de identidad necesaria para el rastro forense.
 */
export const SovereignExecutionContextSchema = z.object({
  correlationIdentifier: CorrelationIdentifierSchema,
  tenantIdentifier: TenantIdentifierSchema.optional(),
  // M-022: Identidad unificada del sujeto mutante.
  mutantPassportIdentifier: MutantPassportIdentifierSchema.optional(),
}).readonly();

/**
 * @section INFERENCIA SOBERANA
 */
export type ISovereignExecutionContext = z.infer<typeof SovereignExecutionContextSchema>;
