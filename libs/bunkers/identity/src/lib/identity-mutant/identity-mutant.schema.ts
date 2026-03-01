/**
 * @apparatus IdentityMutantDNA
 * @role Contratos genéticos para la forja del Pasaporte Mutante.
 * @location libs/bunkers/identity/src/lib/identity-mutant/identity-mutant.schema.ts
 * @status <SEALED_PRODUCTION>
 * @version 8.7.0
 */

import { z } from 'zod';

const MUTANT_ID_REGEX = /^[A-Z]{5}\.[a-zA-Z0-9]{10,12}\.[A-Za-z0-9_-]{4,8}$/;

export const MutantPassportIdentifierSchema = z.string()
  .regex(MUTANT_ID_REGEX, "RWC-ID-400: Entropía de Pasaporte Inválida.")
  .brand<'MutantPassportIdentifier'>();

export type IMutantPassportIdentifier = z.infer<typeof MutantPassportIdentifierSchema>;

// FIX TS2305: Exportación explícita del esquema y el tipo
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
