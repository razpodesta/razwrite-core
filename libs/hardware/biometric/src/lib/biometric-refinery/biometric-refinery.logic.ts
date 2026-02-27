/**
 * @apparatus BioRefineryLogic
 * @role Orquestador de biosensores y traductor de señales de hardware.
 * @location libs/hardware-refineries/bio/src/lib/bio-refinery.logic.ts
 * @status <STABILIZED>
 * @hilo Surface-Pulse
 */

import { SovereignLogger } from '@razwritecore/nsk-shared-logger';
import { BioMetabolicPulseSchema, type IBioMetabolicPulse } from './bio-refinery.schema';

export const BioRefineryLogic = {
  /**
   * @method extractSystemVitalSigns
   * @description Captura el estado térmico y energético actual del dispositivo anfitrión.
   */
  extractSystemVitalSigns: async (): Promise<IBioMetabolicPulse> => {
    const hardwareContext = navigator as any; // Navigator extendido isomórficamente

    // 1. Extracción de Bio-Energía (Si el hardware lo permite)
    let batteryData = { chargeLevelPercentage: 100, isPowerPlugged: true, estimatedTimeRemainingMinutes: null };

    if (hardwareContext.getBattery) {
      try {
        const batteryManager = await hardwareContext.getBattery();
        batteryData = {
          chargeLevelPercentage: batteryManager.level * 100,
          isPowerPlugged: batteryManager.charging,
          estimatedTimeRemainingMinutes: batteryManager.dischargingTime === Infinity ? null : batteryManager.dischargingTime / 60
        };
      } catch (caughtError) {
        // Fallo silencioso en navegadores restrictivos
      }
    }

    // 2. Extracción de Capacidad de Cómputo
    const resourceData = {
      logicalCoreCount: hardwareContext.hardwareConcurrency || 2,
      availableMemoryGigabytes: hardwareContext.deviceMemory || 4,
      devicePerformanceTier: (hardwareContext.deviceMemory && hardwareContext.deviceMemory > 4) ? 'HIGH' : 'MEDIUM'
    };

    // 3. Sellado y Validación de ADN
    const vitalPulse = BioMetabolicPulseSchema.parse({
      batterySnapshot: batteryData,
      resourceCapacity: resourceData,
      networkEffectiveType: hardwareContext.connection?.effectiveType || '4g',
      timestampUnix: Date.now()
    });

    // 4. Rastro Forense Metabólico
    SovereignLogger.buffer({
      severity: 'INFO',
      apparatusIdentifier: 'BioRefinery',
      operationCode: 'VITALS_EXTRACTED',
      semanticKey: 'Hardware.Bio.VitalsCaptured',
      forensicMetadata: { battery: batteryData.chargeLevelPercentage, net: vitalPulse.networkEffectiveType }
    });

    return vitalPulse;
  }
};
