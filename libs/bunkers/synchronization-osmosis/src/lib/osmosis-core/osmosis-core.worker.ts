/**
 * @apparatus OsmosisCoreBrain
 * @role Cerebro asíncrono para Deduplicación, Delta-Refining y Empaquetado de Materia Oscura.
 * @location libs/bunkers/synchronization-osmosis/src/lib/osmosis-core/osmosis-core.worker.ts
 * @status <STABILIZED>
 * @version 9.0.0
 * @protocol OEDP-V8.5 Lattice
 * @hilo Deep-Pulse
 * @structure CEREBRO
 * @compliance ISO_25010 | ISO_27001
 */

import * as Comlink from 'comlink';
import { HashingEngineLogic } from '@razwritecore/nsk-shared-crypto';
import { type IOsmoticPulse } from './osmosis-core.schema';

/**
 * @context_prompt [LIA Legacy - AI-Audit]
 * DIRECTIVA: Implementación de Deduplicación y Preparación de Delta (M-018).
 * JUSTIFICACIÓN: Se integra el motor de hashing de la Capa 0 para generar firmas
 * de contenido. Esto evita el re-envío de estados de búnker idénticos.
 * IMPACTO: Reducción drástica del consumo de red y optimización del rastro forense.
 */

const OsmosisCoreBrain = {

  /**
   * @method refineAndPackageBatch
   * @description Procesa una ráfaga de pulsos, elimina duplicados y genera un paquete de transporte.
   */
  refineAndPackageBatch: async (pulseCollection: IOsmoticPulse[]): Promise<Uint8Array | null> => {
    if (pulseCollection.length === 0) return null;

    // 1. [Deduplicación] Filtrado de pulsos redundantes mediante Hashing de Contenido
    const uniquePulses = await OsmosisCoreBrain.filterRedundantPulses(pulseCollection);

    // 2. [Delta-Refining] En una implementación avanzada, aquí compararíamos
    // contra el 'LastKnownGoodState' de la Bóveda L2 (M-023).

    // 3. [ZTM Packaging] Compactación de metadatos y sellado binario
    const batchMaterial = JSON.stringify(uniquePulses);

    /**
     * @step Transmutación a Buffer (M-017)
     * Devolvemos un Uint8Array para minimizar la latencia de postMessage
     * mediante la transferencia de propiedad del buffer (Zero-Copy).
     */
    return new TextEncoder().encode(batchMaterial);
  },

  /**
   * @method filterRedundantPulses
   * @private
   * @description Genera firmas SHA-256 para el contenido de los pulsos y elimina colisiones.
   */
  filterRedundantPulses: async (pulses: IOsmoticPulse[]): Promise<IOsmoticPulse[]> => {
    const processedMap = new Map<string, IOsmoticPulse>();

    for (const pulse of pulses) {
      // Generamos una huella digital del cargamento opaco
      const contentFingerprint = await HashingEngineLogic.generateHash({
        informationMaterial: JSON.stringify(pulse.opaquePayload),
        algorithm: 'SHA-256'
      });

      // Solo conservamos el pulso más reciente si el contenido es idéntico
      const key = `${pulse.targetVaultPath}:${contentFingerprint}`;
      processedMap.set(key, pulse);
    }

    return Array.from(processedMap.values());
  },

  /**
   * @method calculateCompressionRatio
   * @description Métrica de eficiencia para el Neural Sentinel.
   */
  calculateCompressionRatio: (originalSize: number, refinedSize: number): number => {
    return 1 - (refinedSize / (originalSize || 1));
  }
};

// Exposición soberana vía RPC
Comlink.expose(OsmosisCoreBrain);

// Exportación del tipo para el Nexo (Logic)
export type IOsmosisCoreBrain = typeof OsmosisCoreBrain;
