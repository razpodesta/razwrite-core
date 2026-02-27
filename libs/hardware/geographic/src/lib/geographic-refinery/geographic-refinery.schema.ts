/**
 * @apparatus GeoRefineryDNA
 * @role Especificación técnica de datos geográficos anonimizados.
 * @location libs/hardware/geo/src/lib/geo-refinery.schema.ts
 * @status <SEALED_PRODUCTION>
 */
import { z } from 'zod';

export const CountryISOCodeSchema = z.string().length(2).brand<'CountryISOCode'>();
export const CityIATACodeSchema = z.string().length(3).brand<'CityIATACode'>();

export const GeographicContextSnapshotSchema = z.object({
  countryCode: CountryISOCodeSchema,
  cityCode: CityIATACodeSchema,
  isTruncatedForPrivacy: z.literal(true),
  timestampUnix: z.number().int().positive(),
}).readonly();

export const GeoRefineryInputSchema = z.object({
  accuracyLevel: z.enum(['HIGH', 'LOW']),
  timeoutInMilliseconds: z.number().default(10000),
}).readonly();

export type IGeographicContextSnapshot = z.infer<typeof GeographicContextSnapshotSchema>;
export type IGeoRefineryInput = z.infer<typeof GeoRefineryInputSchema>;
