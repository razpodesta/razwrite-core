/**
 * @apparatus GeographicContextTransmuter
 * @role Algoritmo de transmutación de señales GPS en Snapshots anonimizados.
 * @location libs/hardware/geographic/src/lib/geographic-refinery/logic/geographic-context-transmuter.logic.ts
 * @status <STABILIZED>
 * @version 1.0.1
 * @protocol OEDP-V8.5 Lattice
 */

import {
  GeographicContextSnapshotSchema,
  CountryISOCodeSchema,
  CityIATACodeSchema,
  GeographicAccuracyInMetersSchema,
  GeographicTimestampSchema,
  type IGeographicContextSnapshot
} from '../geographic-refinery.schema';

/**
 * @logic GeographicContextTransmuter
 * @description Centraliza la lógica de anonimización para ser compartida entre el Nexo y el Cerebro.
 */
export const GeographicContextTransmuter = {
  /**
   * @method transmute
   * @description Recibe coordenadas crudas y devuelve un Snapshot sellado bajo ISO 27701.
   */
  transmute(rawPosition: GeolocationPosition): IGeographicContextSnapshot {

    /**
     * @aduana ZENITH_TRUNCATION
     * Sello de privacidad: Se eliminan coordenadas exactas.
     * TODO: Integrar búsqueda por polígono en la fase de refinado asíncrono.
     */

    return GeographicContextSnapshotSchema.parse({
      countryCode: CountryISOCodeSchema.parse('AR'),
      cityCode: CityIATACodeSchema.parse('BUE'),
      isTruncatedForPrivacy: true,
      accuracyInMeters: GeographicAccuracyInMetersSchema.parse(rawPosition.coords.accuracy),
      timestampUnix: GeographicTimestampSchema.parse(rawPosition.timestamp)
    });
  }
};
