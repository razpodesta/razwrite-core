/**
 * @apparatus ProximityEngineLogic
 * @role Orquestador de hardware para NFC/BLE con gestión de bioseguridad.
 * @location libs/hardware/iot-proximity/src/lib/proximity-engine/proximity-engine.logic.ts
 * @status <SEALED_PRODUCTION>
 * @version 1.1.2
 * @protocol OEDP-V8.5 Lattice
 * @hilo Surface-Pulse
 */

import { SovereignLogger } from '@razwritecore/nsk-shared-logger';
import { MetabolicScheduler } from '@razwritecore/nsk-shared-metabolic-scheduler';
import {
  ProximityInteractionPayloadSchema,
  type IProximityInteractionPayload
} from './proximity-engine.schema';

/**
 * @augmentation WebNFC_Sovereignty
 * Blindaje de tipos para la Web NFC API (Project Fugu).
 */
interface INDEFReader extends EventTarget {
  scan: () => Promise<void>;
}

const APPARATUS_IDENTIFIER = 'ProximityEngine' as never;

export const ProximityEngineLogic = {
  /**
   * @method igniteNfcReader
   * @description Activa la escucha de hardware NFC (NDEF) con protección metabólica.
   */
  igniteNfcReader: async (
    onTagCaptured: (payload: IProximityInteractionPayload) => void
  ): Promise<void> => {

    const isSupported = typeof window !== 'undefined' && 'NDEFReader' in window;
    if (!isSupported) {
      throw new Error('ProximityEngine.Errors.Unsupported');
    }

    const metabolicMode = MetabolicScheduler.getCurrentMode();
    if (metabolicMode === 'EMERGENCY') {
      // CORRECCIÓN TS2322: Se utiliza 'WARN' alineado con el LoggerCoreSchema
      SovereignLogger.emit({
        severity: 'WARN',
        apparatusIdentifier: APPARATUS_IDENTIFIER,
        operationCode: 'METABOLIC_RESTRICTION' as never,
        semanticKey: 'ProximityEngine.Errors.EmergencyMode'
      });
      return;
    }

    try {
      const reader = new (window as any).NDEFReader() as INDEFReader;
      await reader.scan();

      reader.addEventListener("reading", (event: any) => {
        const { serialNumber } = event;

        // Transubstanciación de Datos vía ADN
        const pulse = ProximityInteractionPayloadSchema.parse({
          protocolType: 'NFC',
          deviceIdentifier: serialNumber,
          timestampUnix: Date.now()
        });

        // Rastro Forense Isomórfico
        SovereignLogger.emit({
          severity: 'INFO',
          apparatusIdentifier: APPARATUS_IDENTIFIER,
          operationCode: 'NFC_TAG_CAPTURED' as never,
          semanticKey: 'ProximityEngine.Status.TagDetected',
          forensicMetadata: { deviceIdentifier: serialNumber }
        });

        onTagCaptured(pulse);
      });
    } catch (caughtError) {
      throw new Error('ProximityEngine.Errors.ReadError');
    }
  }
};
