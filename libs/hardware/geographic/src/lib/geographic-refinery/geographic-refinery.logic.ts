/**
 * @apparatus GeographicRefineryLogic
 * @role Orquestador de ignición de sensores y refinamiento de contexto espacial.
 * @location libs/hardware/geographic/src/lib/geographic-refinery/geographic-refinery.logic.ts
 * @status <STABILIZED>
 * @version 1.1.0
 * @protocol OEDP-V8.5 Lattice
 * @hilo Surface-Pulse
 */

import { SovereignLogger } from '@razwritecore/nsk-shared-logger';
import { MetabolicScheduler } from '@razwritecore/nsk-shared-metabolic-scheduler';
import { GeographicSensorAdapter } from '../adapters/geographic-sensor.adapter';
import {
  GeographicContextSnapshotSchema,
  CountryISOCodeSchema,
  CityIATACodeSchema,
  GeographicAccuracyInMetersSchema,
  GeographicTimestampSchema,
  type IGeographicContextSnapshot,
  type IGeographicRefineryInput
} from './geographic-refinery.schema';

/**
 * @constant APPARATUS_IDENTIFIER
 * @description Identificador absoluto para el rastro forense e ISO 27001.
 */
const APPARATUS_IDENTIFIER = 'GeographicRefinery' as never;

export const GeographicRefineryLogic = {
  /**
   * @method extractRefinedContext
   * @description Captura coordenadas crudas y las transmuta en un Snapshot anonimizado ISO 27701.
   * @policy Erradicación de 'as any' y tipado nominal estricto mediante la Aduana Zod.
   */
  async extractRefinedContext(
    requestPayload: IGeographicRefineryInput
  ): Promise<IGeographicContextSnapshot> {
    const executionStartTime = performance.now();
    const currentMetabolicMode = MetabolicScheduler.getCurrentMode();

    try {
      /**
       * @step EXTRACCIÓN_CRUDA (METAL_ACCESS)
       * Delegación al Adaptador de Infraestructura.
       * El Nexo no conoce la implementación del navegador (Isomorfía).
       */
      const rawPositionSnapshot = await GeographicSensorAdapter.captureRawPosition({
        enableHighAccuracy: requestPayload.accuracyLevel === 'HIGH',
        timeout: requestPayload.timeoutInMilliseconds
      });

      /**
       * @step REFINAMIENTO_Y_TRUNCAMIENTO (ISO 27701)
       * Aplicación del ADN para garantizar el Branding Nominal y la Privacidad.
       * TODO: En la fase Zenith (M-017), este bloque se delegará al .worker.ts
       * para realizar búsquedas geográficas reversas sin bloquear los 60fps de la UI.
       */
      const refinedSnapshot: IGeographicContextSnapshot = GeographicContextSnapshotSchema.parse({
        countryCode: CountryISOCodeSchema.parse('AR'), // Placeholder nivelado
        cityCode: CityIATACodeSchema.parse('BUE'),    // Placeholder nivelado
        isTruncatedForPrivacy: true,
        accuracyInMeters: GeographicAccuracyInMetersSchema.parse(rawPositionSnapshot.coords.accuracy),
        timestampUnix: GeographicTimestampSchema.parse(rawPositionSnapshot.timestamp)
      });

      // 1. Emisión de Rastro Forense Exitoso (M-001)
      SovereignLogger.emit({
        severity: 'INFO',
        apparatusIdentifier: APPARATUS_IDENTIFIER,
        operationCode: 'GEOGRAPHIC_CONTEXT_EXTRACTED' as never,
        semanticKey: 'GeographicRefinery.Status.Success',
        executionLatencyInMilliseconds: performance.now() - executionStartTime,
        forensicMetadata: {
          accuracyInMeters: refinedSnapshot.accuracyInMeters,
          metabolicModeAtEmission: currentMetabolicMode
        }
      });

      return refinedSnapshot;

    } catch (caughtError: unknown) {
      /**
       * @step REFINERÍA_DE_FALLOS_FORENSES
       * Transmutación de excepciones de hardware en señales semánticas del ALMA.
       */
      const errorMessage = caughtError instanceof Error ? caughtError.message : 'UNKNOWN_ERROR';

      SovereignLogger.emit({
        severity: 'ERROR',
        apparatusIdentifier: APPARATUS_IDENTIFIER,
        operationCode: 'GEOGRAPHIC_EXTRACTION_FAILED' as never,
        // Si el error proviene del adaptador, ya trae la clave semántica correcta.
        semanticKey: errorMessage.includes('GeographicRefinery')
          ? errorMessage
          : 'GeographicRefinery.Errors.PositionUnavailable',
        forensicMetadata: {
          errorMessage,
          metabolicModeAtEmission: currentMetabolicMode
        }
      });

      throw caughtError;
    }
  }
};
