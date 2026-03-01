/**
 * @apparatus GeographicRefineryWorker
 * @role Refinamiento de coordenadas y anonimización ISO 27701 en segundo plano.
 * @location libs/hardware/geographic/src/lib/geographic-refinery/geographic-refinery.worker.ts
 * @status <STABILIZED>
 * @version 1.0.0
 * @protocol OEDP-V8.5 Lattice
 * @hilo Deep-Pulse
 */

import {
  GeographicContextSnapshotSchema,
  CountryISOCodeSchema,
  CityIATACodeSchema,
  GeographicAccuracyInMetersSchema,
  GeographicTimestampSchema
} from './geographic-refinery.schema';

/**
 * @listener onmessage
 * @description Escucha señales crudas de hardware y ejecuta el algoritmo de truncamiento.
 */
self.onmessage = (event: MessageEvent<GeolocationPosition>) => {
  const { coords, timestamp } = event.data;

  try {
    /**
     * @algorithm TRUNCAMIENTO_DE_PRECISIÓN_ZENITH
     * TODO: Integrar aquí el mapa de densidades IATA (K-Cluster) para
     * transmutar [lat, lng] en [CityIATACode].
     */

    // Por ahora, el Cerebro ejecuta el refinado nominal ISO 27701
    const refinedSnapshot = GeographicContextSnapshotSchema.parse({
      countryCode: CountryISOCodeSchema.parse('AR'),
      cityCode: CityIATACodeSchema.parse('BUE'),
      isTruncatedForPrivacy: true,
      accuracyInMeters: GeographicAccuracyInMetersSchema.parse(coords.accuracy),
      timestampUnix: GeographicTimestampSchema.parse(timestamp)
    });

    // Envío de Reacción al SNS (Surface)
    self.postMessage({
      status: 'SUCCESS',
      payload: refinedSnapshot
    });

  } catch (caughtError: unknown) {
    // Reporte de fallo sistémico en el hilo del Worker
    self.postMessage({
      status: 'ERROR',
      error: caughtError instanceof Error ? caughtError.message : 'WORKER_REFINEMENT_FAILED'
    });
  }
};
