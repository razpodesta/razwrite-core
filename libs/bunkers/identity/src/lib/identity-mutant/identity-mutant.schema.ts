/**
 * @apparatus IdentityMutantDNA
 * @role Contratos genéticos para la forja y validación del Pasaporte Mutante.
 * @location libs/modular-units/identity-mutant/src/lib/identity-core/identity-mutant.schema.ts
 * @status <LATTICE_FORGING>
 * @version 8.5.0
 * @protocol OEDP-V8.5 Lattice
 */

import { z } from 'zod';

/**
 * @context_prompt [LIA Legacy - AI-Audit]
 * DIRECTIVA: Forja del ADN del Identity Mutant (M-022).
 * JUSTIFICACIÓN: Se establece un tipado nominal estricto para evitar que un ID de base de datos 
 * ordinario sea confundido con un Pasaporte Mutante. La regex valida la fórmula [GEO]-[BASE62]-[SIG].
 * IMPACTO: Bioseguridad total. El `SovereignNervousSystem` rechazará cualquier intención que no 
 * posea un `MutantPassportIdentifier` válido criptográficamente.
 */

// Fórmula: [A-Z]{5} (Geo) . [a-zA-Z0-9]{10,12} (NanoID) . [A-Za-z0-9_-]{4,8} (HMAC)
const MUTANT_ID_REGEX = /^[A-Z]{5}\.[a-zA-Z0-9]{10,12}\.[A-Za-z0-9_-]{4,8}$/;

export const MutantPassportIdentifierSchema = z.string()
  .regex(MUTANT_ID_REGEX, "RWC-ID-400: Entropía de Pasaporte Inválida.")
  .brand<'MutantPassportIdentifier'>();

export type IMutantPassportIdentifier = z.infer<typeof MutantPassportIdentifierSchema>;

export const GeoContextPayloadSchema = z.object({
  countryIsoCode: z.string().length(2).toUpperCase(),
  cityIataCode: z.string().length(3).toUpperCase(),
}).readonly();

export type IGeoContextPayload = z.infer<typeof GeoContextPayloadSchema>;

export const MutantIdentityPayloadSchema = z.object({
  mutantPassportIdentifier: MutantPassportIdentifierSchema,
  creationEpoch: z.number().int().nonnegative(),
  roamingTenantIds: z.array(z.string()),
}).readonly();

export type IMutantIdentityPayload = z.infer<typeof MutantIdentityPayloadSchema>;