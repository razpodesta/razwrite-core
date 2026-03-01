/**
 * @apparatus OsmosisCoreLogic
 * @role Orquestador de la membrana semi-permeable para la gestión de presión de datos.
 * @location libs/bunkers/synchronization-osmosis/src/lib/osmosis-core/osmosis-core.logic.ts
 * @status <SEALED_PRODUCTION>
 * @version 9.2.0
 * @protocol OEDP-V8.5 Lattice
 * @hilo Surface-Pulse
 * @structure NEXO
 * @compliance ISO_25010 | ISO_27001
 */

import * as Comlink from 'comlink';
import {
  SovereignLogger,
  ApparatusIdentifierSchema,
  OperationCodeSchema
} from '@razwritecore/nsk-shared-logger';
import { MetabolicScheduler } from '@razwritecore/nsk-shared-metabolic-scheduler';
import { ErrorRefineryLogic, SystemErrorCodeSchema } from '@razwritecore/nsk-shared-error-engine';
import {
  type IOsmoticPulse,
  type IOsmosisConfiguration,
  OsmoticPulseSchema,
  OsmosisConfigurationSchema
} from './osmosis-core.schema';
import { type IOsmosisCoreBrain } from './osmosis-core.worker';
import { AdaptiveTransportLogic } from './adaptive-transport.logic';
import { z } from 'zod';

/**
 * @section DIMENSIONES NOMINALES (M-005)
 * Casting de bioseguridad para el rastro forense del Sistema Nervioso.
 */
type IApparatusIdentifier = z.infer<typeof ApparatusIdentifierSchema>;
type IOperationCode = z.infer<typeof OperationCodeSchema>;

// Límite físico para evitar desbordamiento de RAM (Backpressure)
const MAX_QUEUE_DEPTH = 500;

// Esclusas de Memoria (Buckets por QoS)
const osmoticQueues = {
  VITAL: [] as IOsmoticPulse[],      // QoS 0
  CRITICAL: [] as IOsmoticPulse[],   // QoS 1
  RESILIENT: [] as IOsmoticPulse[],  // QoS 2
  BEHAVIORAL: [] as IOsmoticPulse[]  // QoS 3
};

let brainProxy: Comlink.Remote<IOsmosisCoreBrain> | null = null;
let drainIntervalTimer: ReturnType<typeof setInterval> | null = null;
let isSystemTerminating = false;

export const OsmosisCoreLogic = {

  /**
   * @method igniteMembrane
   * @description Inicializa el motor de ósmosis y activa el Cerebro asíncrono (Deep-Pulse).
   * @requirement M-017 (Potencia Proyectada)
   */
  igniteMembrane: (configuration: IOsmosisConfiguration): void => {
    if (typeof window === 'undefined') return;

    const validatedConfig = OsmosisConfigurationSchema.parse(configuration);
    const ignitionStartTime = performance.now();

    try {
      // 1. Ignición del Hilo Secundario (RPC Proxy)
      const nativeWorker = new Worker(
        new URL('./osmosis-core.worker.ts', import.meta.url),
        { type: 'module' }
      );
      brainProxy = Comlink.wrap<IOsmosisCoreBrain>(nativeWorker);

      // 2. Protocolo de Supervivencia (M-035)
      window.addEventListener('pagehide', () => {
        isSystemTerminating = true;
        OsmosisCoreLogic.forceImmediateDrain();
      });

      // 3. Activación del Latido de Vaciado
      if (!drainIntervalTimer) {
        drainIntervalTimer = setInterval(
          () => OsmosisCoreLogic.executeOsmoticDrain(),
          validatedConfig.drainIntervalInMilliseconds
        );
      }

      if (validatedConfig.enableForensicLogging) {
        SovereignLogger.emit({
          severity: 'INFO',
          apparatusIdentifier: 'OsmosisCore' as unknown as IApparatusIdentifier,
          operationCode: 'MEMBRANE_ACTIVE' as unknown as IOperationCode,
          semanticKey: 'Osmosis.Grants.IgnitionSuccess',
          executionLatencyInMilliseconds: performance.now() - ignitionStartTime
        });
      }
    } catch (caughtError) {
      // Transmutación del colapso de ignición (M-002)
      throw ErrorRefineryLogic.transmute({
        uniqueErrorCode: SystemErrorCodeSchema.parse('RWC-OSM-5001'),
        severity: 'FATAL',
        apparatusIdentifier: 'OsmosisCore',
        semanticKey: 'Osmosis.Errors.IgnitionFailed',
        caughtError
      });
    }
  },

  /**
   * @method enqueuePulse
   * @description Absorbe material telemétrico y lo clasifica según su QoS (M-015).
   */
  enqueuePulse: (pulsePayload: IOsmoticPulse): void => {
    const validatedPulse = OsmoticPulseSchema.parse(pulsePayload);
    let targetQueue: IOsmoticPulse[];

    switch (validatedPulse.qualityOfServiceTier) {
      case 0: targetQueue = osmoticQueues.VITAL; break;
      case 1: targetQueue = osmoticQueues.CRITICAL; break;
      case 2: targetQueue = osmoticQueues.RESILIENT; break;
      case 3: targetQueue = osmoticQueues.BEHAVIORAL; break;
      default: targetQueue = osmoticQueues.BEHAVIORAL;
    }

    // Protección de Backpressure (Drop-Tail)
    if (targetQueue.length >= MAX_QUEUE_DEPTH) {
      targetQueue.shift();
    }

    targetQueue.push(validatedPulse);

    // Los pulsos VITALES (QoS 0) fuerzan un drenaje instantáneo
    if (validatedPulse.qualityOfServiceTier === 0) {
      OsmosisCoreLogic.executeOsmoticDrain(true);
    }
  },

  /**
   * @method executeOsmoticDrain
   * @private
   * @description Algoritmo de Presión de Datos (APD) basado en el modo metabólico.
   * @fix_error TS2305: Sincronización con el facade 'MetabolicScheduler'.
   */
  executeOsmoticDrain: async (bypassMetabolism = false): Promise<void> => {
    // Sello corrección TS2305: Uso de MetabolicScheduler (Interface nivelada)
    const energyMode = MetabolicScheduler.getCurrentMode();

    // 1. Drenaje VITAL y CRÍTICO (Prioridad Absoluta)
    await OsmosisCoreLogic.flushBucket(osmoticQueues.VITAL);
    await OsmosisCoreLogic.flushBucket(osmoticQueues.CRITICAL);

    // 2. Drenaje RESILIENTE (Bloqueado en modo de emergencia energética)
    if (bypassMetabolism || energyMode !== 'EMERGENCY') {
      await OsmosisCoreLogic.flushBucket(osmoticQueues.RESILIENT);
    }

    // 3. Drenaje CONDUCTUAL (Solo permitido en estados de alta fidelidad o carga AC)
    if (bypassMetabolism || energyMode === 'PEAK') {
      await OsmosisCoreLogic.flushBucket(osmoticQueues.BEHAVIORAL);
    }
  },

  /**
   * @method flushBucket
   * @private
   * @description Procesa una esclusa delegando el refinado cinético al Cerebro (Worker).
   */
  flushBucket: async (queue: IOsmoticPulse[]): Promise<void> => {
    if (queue.length === 0 || !brainProxy) return;

    try {
      const snapshotBatch = [...queue];

      // Delegación al Hilo Profundo para refinado masivo (Deduplicación/ZTM)
      const refinedBatchBuffer = await brainProxy.refineAndPackageBatch(snapshotBatch);

      if (refinedBatchBuffer) {
        // Despacho vía transporte adaptativo binario
        const success = await AdaptiveTransportLogic.dispatchPayload(
          refinedBatchBuffer,
          isSystemTerminating
        );

        if (success) {
          queue.length = 0; // Vaciado atómico tras confirmación de red
        }
      }
    } catch (caughtError) {
      SovereignLogger.emit({
        severity: 'ERROR',
        apparatusIdentifier: 'OsmosisCore' as unknown as IApparatusIdentifier,
        operationCode: 'DRAIN_FAILURE' as unknown as IOperationCode,
        semanticKey: 'Osmosis.Errors.BatchRefinementFailed',
        forensicMetadata: { caughtErrorSnapshot: String(caughtError) }
      });
    }
  },

  /**
   * @method forceImmediateDrain
   * @description Vaciado de emergencia ante des-comisionado de página (M-035).
   */
  forceImmediateDrain: (): void => {
    OsmosisCoreLogic.executeOsmoticDrain(true);
  }
} as const;
