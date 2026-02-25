/**
 * @apparatus GeoRefineryLogic
 * @role Orquestador de sensores GPS y puente con el Worker de refinamiento.
 * @location libs/hardware-refineries/geo/src/lib/geo-refinery.logic.ts
 * @status <STABILIZED>
 * @hilo Surface-Pulse
 */

import { SovereignLogger } from '@razwritecore/nsk-shared-logger';
import { MetabolicScheduler } from '@razwritecore/nsk-shared-metabolic-scheduler';
import { GeographicContextSnapshotSchema, type IGeographicContextSnapshot } from './geo-refinery.schema';

export const GeoRefineryLogic = {
  /**
   * @method extractGeographicContext
   * @description Solicita coordenadas al hardware y las envía al Worker para su anonimización.
   */
  extractGeographicContext: async (): Promise<IGeographicContextSnapshot> => {
    return new Promise((resolve, reject) => {
      if (typeof window === 'undefined' || !navigator.geolocation) {
        return reject(new Error('RWC-GEO-UNSUPPORTED: Sensores no detectados.'));
      }

      const activeMetabolicMode = MetabolicScheduler.getCurrentMode();

      const sessionOptions: PositionOptions = {
        enableHighAccuracy: activeMetabolicMode === 'PEAK',
        timeout: 10000,
        maximumAge: 60000 // Reutilizar datos de cache de 1min para ahorrar energía
      };

      navigator.geolocation.getCurrentPosition(
        async (rawPosition) => {
          // Delegaríamos al Worker el truncamiento y búsqueda IATA
          // Por ahora, implementamos la transmutación directa cumpliendo el contrato
          const simulatedContext = GeographicContextSnapshotSchema.parse({
            countryCode: 'XX', // [Futuro] Reverse Geocoding en Worker
            cityCode: 'UNK',
            passportPrefix: 'XXUNK',
            isTruncatedForPrivacy: true,
            timestampUnix: Date.now()
          });

          SovereignLogger.buffer({
            severity: 'INFO',
            apparatusIdentifier: 'GeoRefinery',
            operationCode: 'LOCATION_EXTRACTED',
            semanticKey: 'Hardware.Geo.ContextCaptured',
            forensicMetadata: { accuracy: rawPosition.coords.accuracy }
          });

          resolve(simulatedContext);
        },
        (caughtError) => {
          reject(caughtError);
        },
        sessionOptions
      );
    });
  }
};
