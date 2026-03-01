/**
 * @apparatus GeographicRefineryDNA
 * @role Especificación técnica de datos geográficos anonimizados y contratos de entrada.
 * @location libs/hardware/geographic/src/lib/geographic-refinery/geographic-refinery.schema.ts
 * @status <STABILIZED>
 * @version 1.0.1
 * @protocol OEDP-V8.5 Lattice
 */

import { z } from 'zod';

// 1. Branding Nominal (M-005) - Unidades de Medida Soberanas
export const CountryISOCodeSchema = z.string().length(2).toUpperCase().brand<'CountryISOCode'>();
export const CityIATACodeSchema = z.string().length(3).toUpperCase().brand<'CityIATACode'>();
export const GeographicAccuracyInMetersSchema = z.number().nonnegative().brand<'GeographicAccuracyInMeters'>();
export const GeographicTimestampSchema = z.number().int().positive().brand<'GeographicTimestamp'>();

// 2. Esquema de Cargamento de Entrada (M-010)
export const GeographicRefineryInputSchema = z.object({
  accuracyLevel: z.enum(['HIGH', 'LOW']),
  timeoutInMilliseconds: z.number().min(1000).max(30000).default(10000),
  forceImmediateCapture: z.boolean().default(false),
}).readonly();

// 3. Esquema de Salida (Snapshot de Contexto Refinado - ISO 27701)
export const GeographicContextSnapshotSchema = z.object({
  countryCode: CountryISOCodeSchema,
  cityCode: CityIATACodeSchema,
  isTruncatedForPrivacy: z.literal(true),
  accuracyInMeters: GeographicAccuracyInMetersSchema,
  timestampUnix: GeographicTimestampSchema,
}).readonly();

// 4. Inferencia de Tipos Soberanos (CORREGIDO)
export type ICountryISOCode = z.infer<typeof CountryISOCodeSchema>;
export type ICityIATACode = z.infer<typeof CityIATACodeSchema>;
export type IGeographicContextSnapshot = z.infer<typeof GeographicContextSnapshotSchema>;
export type IGeographicRefineryInput = z.infer<typeof GeographicRefineryInputSchema>;
