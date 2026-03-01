/**
 * @apparatus IdentityMutantIndex
 * @role Ministerio de Relaciones Exteriores del Clúster de Identidad (Fachada Opaca).
 * @location libs/bunkers/identity/src/index.ts
 * @status <SEALED_PRODUCTION>
 * @version 9.0.0
 * @protocol OEDP-V8.5 Lattice
 */

/**
 * 1. ORQUESTADORES DE LÓGICA (NEXOS)
 * Único punto de ignición para la forja y recuperación de pasaportes.
 */
export { IdentityMutantEngine } from './lib/identity-mutant/identity-mutant.logic';

/**
 * 2. CONTRATOS DE ADN (ESQUEMAS DE VALIDACIÓN)
 * Sello de bioseguridad para identidades y contextos geográficos.
 */
export {
  MutantPassportIdentifierSchema,
  GeoContextPayloadSchema,
  MutantIdentityPayloadSchema,
} from './lib/identity-mutant/identity-mutant.schema';

/**
 * 3. INFERENCIAS SOBERANAS (TIPOS NOMINALES)
 * Tipado estricto para la circulación de información en el Sistema Nervioso.
 */
export type {
  IMutantPassportIdentifier,
  IGeoContextPayload,
  IMutantIdentityPayload,
} from './lib/identity-mutant/identity-mutant.schema';

/**
 * @context_prompt [LIA Legacy - AI-Audit]
 * DIRECTIVA: Restauración de Soberanía de Dominio.
 * JUSTIFICACIÓN: Se elimina el contenido erróneo de 'error-engine' y se inyectan
 * las exportaciones reales del búnker de identidad. Se utiliza exportación
 * nominativa para cumplir con el Manifiesto 010.
 * IMPACTO: Sanación de error TS2307 y restauración del ruteo en el tsconfig.
 */
