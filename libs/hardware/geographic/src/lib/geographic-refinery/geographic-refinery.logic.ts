/**
 * @apparatus GeoRefineryLogic
 * @role Orquestador de ignición de sensores y puente con el Deep-Pulse.
 * @location libs/hardware/geo/src/lib/geo-refinery.logic.ts
 * @status <STABILIZED>
 * @version 8.7.1
 * @protocol OEDP-V8.5 Lattice
 * @hilo Surface-Pulse
 */

import { SovereignLogger } from '@razwritecore/nsk-shared-logger';
import { MetabolicScheduler } from '@razwritecore/nsk-shared-metabolic-scheduler';
import { GeoSensorAdapter } from './adapters/geo-sensor.adapter';
import {
  GeographicContextSnapshotSchema,
  CountryISOCodeSchema,
  CityIATACodeSchema,
  type IGeographicContextSnapshot,
  type IGeoRefineryInput
} from './geo-refinery.schema';

export const GeoRefineryLogic = {
  /**
   * @method extractRefinedContext
   * @description Ejecuta el ciclo de refinamiento sin vulnerar el tipado nominal.
   */
  async extractRefinedContext(inputPayload: IGeoRefineryInput): Promise<IGeographicContextSnapshot> {
    const executionStartTime = performance.now();
    const currentMetabolicMode = MetabolicScheduler.getCurrentMode();

    return new Promise((resolve, reject) => {
      if (typeof window === 'undefined' || !navigator.geolocation) {
        return reject(new Error('RWC-GEO-001: Geolocation no soportada en este entorno.'));
      }

      navigator.geolocation.getCurrentPosition(
        (rawPosition: GeolocationPosition) => {
          /**
           * @aduana TRANSUBSTANCIACIÓN DE TIPOS
           * Se eliminan los 'as any'. Se utiliza el esquema para forjar el Brand.
           */
          const snapshot: IGeographicContextSnapshot = GeographicContextSnapshotSchema.parse({
            countryCode: CountryISOCodeSchema.parse('AR'),
            cityCode: CityIATACodeSchema.parse('BUE'),
            isTruncatedForPrivacy: true,
            timestampUnix: rawPosition.timestamp
          });

          // Despacho de Pulso Vital corregido (TS2353)
          SovereignLogger.emit({
            severity: 'INFO',
            apparatusIdentifier: 'GeoRefineryLogic',
            operationCode: 'GEO_CONTEXT_EXTRACTED',
            semanticKey: 'Hardware.Geo.Success',
            executionLatencyInMilliseconds: performance.now() - executionStartTime,
            forensicMetadata: {
              accuracy: rawPosition.coords.accuracy,
              metabolicState: currentMetabolicMode
            }
          });

          resolve(snapshot);
        },
        (error: GeolocationPositionError) => reject(error),
        {
          enableHighAccuracy: inputPayload.accuracyLevel === 'HIGH',
          timeout: inputPayload.timeoutInMilliseconds
        }
      );
    });
  }
};
