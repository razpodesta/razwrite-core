/**
 * @apparatus IdentityMutantIndex
 * @role Ministerio de Relaciones Exteriores del Clúster de Identidad (Fachada Opaca).
 * @location libs/modular-units/identity-mutant/src/index.ts
 * @status <LATTICE_FORGING>
 * @version 8.5.0
 * @protocol OEDP-V8.5 Lattice
 */

export { IdentityMutantEngine } from './lib/identity-core/identity-mutant.logic';

export type { 
  IMutantPassportIdentifier,
  IMutantIdentityPayload,
  IGeoContextPayload
} from './lib/identity-core/identity-mutant.schema';

export { 
  MutantPassportIdentifierSchema,
  MutantIdentityPayloadSchema,
  GeoContextPayloadSchema
} from './lib/identity-core/identity-mutant.schema';

// Nota de Bioseguridad: IdentityMutantBrain (El Worker) NO se exporta. 
// Es materia oscura confidencial. Ningún otro aparato puede invocarlo directamente.