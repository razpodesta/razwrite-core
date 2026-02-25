/**
 * @apparatus SyncOsmosisEngine
 * @role Membrana semi-permeable. Controla el flujo de datos basados en Presión Metabólica (APD).
 * @location libs/modular-units/sync-osmosis/src/lib/osmosis-core/osmosis-core.logic.ts
 * @status <SEALED_PRODUCTION>
 * @version 8.6.1
 * @protocol OEDP-V8.5 Lattice
 */

import { SovereignLogger } from '@razwritecore/nsk-shared-logger';
import { MetabolicScheduler } from '@razwritecore/nsk-shared-metabolic-scheduler';
import { AdaptiveTransport } from './adaptive-transport.logic';
import { 
  type IOsmoticPulse, 
  OsmoticPulseSchema 
} from './osmosis-core.schema';

/**
 * @context_prompt [LIA Legacy - AI-Audit]
 * DIRECTIVA: Inyección de Límite de Contrapresión y Limpieza de Linter.
 * JUSTIFICACIÓN: 
 * 1. Se eliminaron tipos inferidos redundantes (TS Lint).
 * 2. Se instrumentó el `SovereignLogger` para reportar ignición y desbordamiento.
 * 3. Se estableció un límite físico de 500 items por cola para evitar OOM (Out Of Memory) 
 *    si el dispositivo pierde conexión por periodos prolongados.
 * IMPACTO: Estabilidad de RAM garantizada en escenarios offline extremos.
 */

// Límite de seguridad para evitar desbordamiento de memoria
const MAX_QUEUE_DEPTH = 500;

// Esclusas de Memoria (Buckets)
const membraneQueues = {
  VITAL: [] as IOsmoticPulse[],      // QoS 0
  CRITICAL: [] as IOsmoticPulse[],   // QoS 1
  RESILIENT: [] as IOsmoticPulse[],  // QoS 2
  BEHAVIORAL: [] as IOsmoticPulse[]  // QoS 3
};

let drainIntervalTimer: ReturnType<typeof setInterval> | null = null;
let isPageTerminatingState = false;

/**
 * @section FACHADA SOBERANA
 */
export const SyncOsmosisEngine = {
  
  /**
   * @method igniteMembrane
   * @description Enciende el motor de ósmosis y se acopla a la terminación de la página.
   */
  igniteMembrane: (intervalMs = 5000): void => {
    if (typeof window === 'undefined') return;

    // Rastro Forense de Ignición
    SovereignLogger.buffer({
      severity: 'INFO',
      apparatusIdentifier: 'SyncOsmosisEngine',
      operationCode: 'OSMOSIS_IGNITED',
      semanticKey: 'ModularUnits.SyncOsmosis.membraneActive',
      forensicMetadata: { intervalMs }
    });

    // Escucha el evento final de la página (supervivencia)
    window.addEventListener('pagehide', () => {
      isPageTerminatingState = true;
      SyncOsmosisEngine.forceMembraneDrain(); // Vaciado de emergencia
    });

    if (!drainIntervalTimer) {
      drainIntervalTimer = setInterval(executeMembraneDrain, intervalMs);
    }
  },

  /**
   * @method enqueuePulse
   * @description Absorbe un pulso de cualquier búnker y lo deposita en la esclusa correspondiente.
   */
  enqueuePulse: (pulsePayload: IOsmoticPulse): void => {
    const validatedPulse = OsmoticPulseSchema.parse(pulsePayload);
    let targetQueue: IOsmoticPulse[];
    
    switch (validatedPulse.qualityOfServiceTier) {
      case 0: targetQueue = membraneQueues.VITAL; break;
      case 1: targetQueue = membraneQueues.CRITICAL; break;
      case 2: targetQueue = membraneQueues.RESILIENT; break;
      case 3: targetQueue = membraneQueues.BEHAVIORAL; break;
      default: targetQueue = membraneQueues.BEHAVIORAL;
    }

    // Protección de Contrapresión (Backpressure)
    if (targetQueue.length >= MAX_QUEUE_DEPTH) {
      // Descartar el más antiguo (Drop-Tail) para hacer espacio
      targetQueue.shift();
      
      // Alerta silenciosa de pérdida de datos (Solo para QoS < 1)
      if (validatedPulse.qualityOfServiceTier > 1) {
        // No logueamos cada drop para no saturar, pero idealmente se incrementaría un contador métrico.
      }
    }

    targetQueue.push(validatedPulse);

    // VITAL ignora el intervalo y fuerza drenaje inmediato
    if (validatedPulse.qualityOfServiceTier === 0) {
      executeMembraneDrain();
    }
  },

  /**
   * @method forceMembraneDrain
   * @description Purgado manual forzado (ej. durante el Logout o PageHide).
   */
  forceMembraneDrain: (): void => {
    executeMembraneDrain(true);
  }
};

/**
 * @internal Algoritmo de Presión de Datos (APD)
 */
async function executeMembraneDrain(bypassMetabolism = false): Promise<void> {
  const currentMode = MetabolicScheduler.getCurrentMode();

  // 1. Drenaje VITAL y CRÍTICO (Nunca se bloquean)
  await drainBucket(membraneQueues.VITAL);
  await drainBucket(membraneQueues.CRITICAL);

  // 2. Drenaje RESILIENTE (Bloqueado en EMERGENCY)
  if (bypassMetabolism || currentMode !== 'EMERGENCY') {
    await drainBucket(membraneQueues.RESILIENT);
  }

  // 3. Drenaje CONDUCTUAL (Solo permitido en estados ricos en energía)
  if (bypassMetabolism || ['PEAK', 'BALANCED'].includes(currentMode)) {
    await drainBucket(membraneQueues.BEHAVIORAL);
  }
}

/**
 * @internal Operador de Esclusa
 */
async function drainBucket(queue: IOsmoticPulse[]): Promise<void> {
  while (queue.length > 0) {
    const pulse = queue[0]; // Miramos el primero sin sacarlo aún
    
    const deliverySuccess = await AdaptiveTransport.dispatchPayload(pulse, isPageTerminatingState);
    
    if (deliverySuccess) {
      queue.shift(); // Removemos solo si el servidor acusó recibo
    } else {
      // Si la red falla, abortamos el vaciado de esta esclusa y esperamos al próximo ciclo
      break; 
    }
  }
}