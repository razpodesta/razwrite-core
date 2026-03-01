/**
 * @apparatus AdaptiveTransportLogic
 * @role Selector de vehículo de red (Fetch vs Beacon) optimizado para cargamentos binarios normalizados.
 * @location libs/bunkers/synchronization-osmosis/src/lib/osmosis-core/adaptive-transport.logic.ts
 * @status <SEALED_PRODUCTION>
 * @version 9.2.1
 * @protocol OEDP-V8.5 Lattice
 * @hilo Surface-Pulse
 * @structure NEXO
 * @compliance ISO_25010 | ISO_27001
 */

import {
  SovereignLogger,
  ApparatusIdentifierSchema,
  OperationCodeSchema
} from '@razwritecore/nsk-shared-logger';
import { z } from 'zod';

/**
 * @section DIMENSIONES NOMINALES (M-005)
 */
type IApparatusIdentifier = z.infer<typeof ApparatusIdentifierSchema>;
type IOperationCode = z.infer<typeof OperationCodeSchema>;

/**
 * @constant VAULT_BASE_URL
 * @private
 */
const VAULT_BASE_URL = process.env['NEXT_PUBLIC_VAULT_URL'] || 'https://vault.razwrite.core';

export const AdaptiveTransportLogic = {

  /**
   * @method dispatchPayload
   * @description Decide el vehículo de transporte y ejecuta el despacho hacia la Bóveda Cloud.
   * @requirement M-018 (Estrategia de Supervivencia)
   */
  dispatchPayload: async (
    informationMaterial: Uint8Array | string,
    isPageTerminating: boolean,
    targetPath = '/api/v1/telemetry/osmosis'
  ): Promise<boolean> => {
    const requestStartTime = performance.now();
    const destinationUrl = `${VAULT_BASE_URL}${targetPath}`;

    try {
      /**
       * @step Normalización de Memoria (Resolución TS2322)
       * El constructor de Blob exige BlobPart[]. Refinamos el material para
       * asegurar que no contenga SharedArrayBuffer (ilegal para transporte).
       */
      const transportSafeMaterial = AdaptiveTransportLogic.refineMaterialForTransport(informationMaterial);

      const binaryBlob = new Blob([transportSafeMaterial], {
        type: typeof informationMaterial === 'string' ? 'application/json' : 'application/octet-stream'
      });

      // 1. Selección de Vehículo (M-035)
      if (isPageTerminating) {
        return await AdaptiveTransportLogic.executeSurvivalDispatch(destinationUrl, binaryBlob);
      }

      // 2. Transporte Estándar
      const responseSnapshot = await fetch(destinationUrl, {
        method: 'POST',
        body: binaryBlob,
        headers: {
          'X-RWC-Protocol': 'OEDP-V8.5-ZENITH',
          'X-Correlation-ID': crypto.randomUUID()
        }
      });

      return responseSnapshot.ok;

    } catch (caughtError) {
      SovereignLogger.emit({
        severity: 'WARN',
        apparatusIdentifier: 'AdaptiveTransport' as unknown as IApparatusIdentifier,
        operationCode: 'NETWORK_DISRUPTION' as unknown as IOperationCode,
        semanticKey: 'Osmosis.Errors.TransportDeliveryFailed',
        executionLatencyInMilliseconds: performance.now() - requestStartTime,
        forensicMetadata: {
          destinationUrl,
          caughtErrorSnapshot: caughtError instanceof Error ? caughtError.message : String(caughtError)
        }
      });

      return false;
    }
  },

  /**
   * @method executeSurvivalDispatch
   * @private
   */
  executeSurvivalDispatch: async (url: string, payloadBlob: Blob): Promise<boolean> => {
    if (typeof navigator !== 'undefined' && navigator.sendBeacon) {
      // El Blob ya está normalizado y es una BlobPart legal.
      const isAcceptedByQueue = navigator.sendBeacon(url, payloadBlob);
      if (isAcceptedByQueue) return true;
    }

    try {
      const response = await fetch(url, {
        method: 'POST',
        body: payloadBlob,
        keepalive: true,
      });
      return response.ok;
    } catch {
      return false;
    }
  },

  /**
   * @method refineMaterialForTransport
   * @private
   * @description Asegura que el material binario sea compatible con BlobPart (ArrayBuffer estándar).
   * @fix_error TS2322: Normalización de SharedArrayBuffer a ArrayBuffer.
   */
  refineMaterialForTransport: (material: Uint8Array | string): BlobPart => {
    if (typeof material === 'string') return material;

    // Si es un Uint8Array, verificamos si su buffer es compartido (SharedArrayBuffer)
    const isShared = (material.buffer as any).constructor.name === 'SharedArrayBuffer';

    if (!isShared) {
      // Retorno directo si la memoria es privada
      return material as Uint8Array<ArrayBuffer>;
    }

    // Transmutación atómica: Copia de memoria compartida a memoria privada de transporte
    const privateBuffer = new ArrayBuffer(material.byteLength);
    const privateView = new Uint8Array(privateBuffer);
    privateView.set(material);

    return privateView;
  }
} as const;
