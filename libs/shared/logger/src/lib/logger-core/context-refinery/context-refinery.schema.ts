/**
 * @apparatus ContextRefineryDNA
 * @role Validación de integridad para el contexto de ejecución soberano.
 * @location libs/shared/logger/src/lib/logger-core/context-refinery/context-refinery.schema.ts
 * @status <STABILIZED>
 * @version 2.0.1
 * @protocol OEDP-V8.5 Lattice
 * @structure ADN
 * @compliance ISO_27001 | ISO_25010
 */

import { z } from 'zod';

/**
 * @section Sincronia_NodeNext
 * CURA TS2307: Inserção do rastro .js para conformidade com o motor de busca de 2026.
 */
import {
  CorrelationIdentifierSchema,
  TenantIdentifierSchema,
  MutantPassportIdentifierSchema
} from '../logger-core.schema.js';

/**
 * @section CONTRATO DE CONTEXTO (M-022)
 * Valida que o contexto possua a tríada de identidade necessária para o rastro forense.
 * Nota: Propriedades marcadas como opcionais para permitir a resolução progressiva no Refinery.
 */
export const SovereignExecutionContextSchema = z.object({
  correlationIdentifier: CorrelationIdentifierSchema
    .describe('Identificador Zenith herdado ou gerado na ignição do rastro.'),

  tenantIdentifier: TenantIdentifierSchema.optional()
    .describe('Identificador do inquilino (SDUI Context) capturado no rastro de rede.'),

  // M-022: Identidade unificada do sujeito mutante (Passport).
  mutantPassportIdentifier: MutantPassportIdentifierSchema.optional()
    .describe('Identificador inalterável do rastro biométrico/hardware do cidadão.'),
}).readonly();

/**
 * @section INFERÊNCIA SOBERANA
 */
export type ISovereignExecutionContext = z.infer<typeof SovereignExecutionContextSchema>;
