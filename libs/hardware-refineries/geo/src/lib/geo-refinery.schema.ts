/**
 * @apparatus GeoRefineryDNA
 * @role Contratos genéticos para la localización truncada y códigos de ciudad.
 * @location libs/hardware-refineries/geo/src/lib/geo-refinery.schema.ts
 * @status <STABILIZED>
 * @version 1.0.0
 * @protocol OEDP-V8.5 Lattice
 */

import { z } from 'zod';

export const CountryISOCodeSchema = z.string().length(2).toUpperCase().brand<'CountryISOCode'>();
export const CityIATACodeSchema = z.string().length(3).toUpperCase().brand<'CityIATACode'>();

/**
 * M-022: El prefijo geográfico del pasaporte mutante (5 caracteres).
 * Ejemplo: CLSCL (Chile, Santiago).
 */
export const GeoPassportPrefixSchema = z.string().length(5).brand<'GeoPassportPrefix'>();

export const GeographicCoordinateSchema = z.object({
  latitude: z.number(),
  longitude: z.number(),
  accuracyInMeters: z.number(),
}).readonly();

export const GeographicContextSnapshotSchema = z.object({
  countryCode: CountryISOCodeSchema,
  cityCode: CityIATACodeSchema,
  passportPrefix: GeoPassportPrefixSchema,
  isTruncatedForPrivacy: z.boolean(),
  timestampUnix: z.number(),
}).readonly();

export type IGeographicContextSnapshot = z.infer<typeof GeographicContextSnapshotSchema>;
export type IGeographicCoordinate = z.infer<typeof GeographicCoordinateSchema>;
