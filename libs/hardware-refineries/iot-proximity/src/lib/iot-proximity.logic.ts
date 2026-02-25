/**
 * @apparatus IotProximityLogic
 * @role Orquestador de hardware para NFC/BLE con gestión de permisos y ahorro de energía.
 * @location libs/hardware-refineries/iot-proximity/src/lib/iot-proximity.logic.ts
 * @status <STABILIZED>
 * @hilo Surface-Pulse
 */

import { SovereignLogger } from '@razwritecore/nsk-shared-logger';
import { MetabolicScheduler } from '@razwritecore/nsk-shared-metabolic-scheduler';
import { ProximityInteractionPayloadSchema, type IProximityInteractionPayload } from './iot-proximity.schema';

export const IotProximityLogic = {
  /**
   * @method igniteProximityScanner
   * @description Activa la escucha de hardware NFC (NDEF). Requiere interacción humana previa.
   */
  igniteNfcReader: async (onTagCaptured: (payload: IProximityInteractionPayload) => void): Promise<void> => {
    if (typeof window === 'undefined' || !('NDEFReader' in window)) {
      throw new Error('RWC-IOT-NFC-UNSUPPORTED: Hardware NFC no disponible.');
    }

    const metabolicMode = MetabolicScheduler.getCurrentMode();
    if (metabolicMode === 'EMERGENCY') {
      console.warn('RWC-IOT: Escaneo denegado por insuficiencia energética.');
      return;
    }

    try {
      const reader = new (window as any).NDEFReader();
      await reader.scan();

      reader.addEventListener("reading", ({ message, serialNumber }: any) => {
        const pulse = ProximityInteractionPayloadSchema.parse({
          protocolType: 'NFC',
          deviceIdentifier: serialNumber,
          timestampUnix: Date.now()
        });

        SovereignLogger.buffer({
          severity: 'INFO',
          apparatusIdentifier: 'IotProximityRefinery',
          operationCode: 'NFC_TAG_CAPTURED',
          semanticKey: 'Hardware.Iot.NfcTagDetected'
        });

        onTagCaptured(pulse);
      });
    } catch (caughtError) {
      throw new Error(`RWC-IOT-NFC-ERROR: ${String(caughtError)}`);
    }
  },

  /**
   * @method scanBluetoothPeripherals
   * @description Inicia búsqueda de dispositivos BLE autorizados.
   */
  scanBluetoothPeripherals: async (): Promise<void> => {
    // Implementación asíncrona para Web Bluetooth API siguiendo el protocolo Fugu.
    // [Reservado para fase de integración física avanzada]
  }
};
