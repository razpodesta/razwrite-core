/**
 * @apparatus SovereignLoggerLogic
 * @role Motor de interceptación isomórfico y transmutación a OpCodes (ZTM).
 * @location libs/shared-fundamentals/logger/src/lib/sovereign-logger.logic.ts
 * @status <SEALED_PRODUCTION>
 * @version 8.6.1
 * @protocol OEDP-V8.5 Lattice
 */

import pino from 'pino';
import { MatrixNeuralBridgeGateway } from '@razwritecore/nsk-shared-matrix-neural-bridge';
import { SovereignContextStorage } from './sovereign-context.logic';
import {
  type ITelemetryPulseInput,
  type ICompressedTelemetryPulse,
  TelemetryPulseInputSchema,
  CorrelationIdentifierSchema
} from './sovereign-logger.schema';

/**
 * @context_prompt [LIA Legacy - AI-Audit]
 * DIRECTIVA: Inyección de Fast-Path (Ring Buffer) y actualización de Contrato MNB.
 * JUSTIFICACIÓN: Se corrigió la importación legada hacia `MatrixNeuralBridgeGateway` y se 
 * adaptaron las llamadas a sus métodos para usar objetos de Cargamento Único (M-010).
 * IMPACTO: Eliminación de error TS 2305 y alineación estructural con la Capa Zero.
 */

const pinoEngine = pino({
  level: 'trace',
  timestamp: pino.stdTimeFunctions.unixTime,
  base: undefined, 
  browser: { asObject: true } // Garantiza que no colapse en el Navegador
});

function safelySerializePayload(payload: unknown): string | undefined {
  if (!payload) return undefined;
  try {
    // Límite preventivo para evitar colapsos de memoria
    const jsonString = JSON.stringify(payload);
    return jsonString.length > 10000 ? '{"error":"PAYLOAD_TOO_LARGE_FOR_ZTM"}' : jsonString;
  } catch {
    return '{"error":"CIRCULAR_REFERENCE_OR_INVALID_DATA"}';
  }
}

/**
 * Estructura Atómica: Ring Buffer para Absorción de Impactos (M-015)
 */
const RING_BUFFER_MAX_SIZE = 1024;
const ringBuffer = new Array<unknown>(RING_BUFFER_MAX_SIZE);
let bufferHead = 0;
let bufferTail = 0;
let isDrainScheduled = false;

function drainRingBuffer() {
  while (bufferTail !== bufferHead) {
    const rawPayload = ringBuffer[bufferTail];
    bufferTail = (bufferTail + 1) % RING_BUFFER_MAX_SIZE;
    
    try {
      // 1. Zod Validation extraída del Hot-Path de UI
      SovereignLogger.emit(rawPayload as ITelemetryPulseInput);
    } catch (e) {
      // Los pulsos corruptos provenientes de ráfagas conductuales se descartan 
      // silenciosamente para no retroalimentar la entropía del ErrorEngine.
    }
  }
  isDrainScheduled = false;
}

function scheduleBufferDrain() {
  if (isDrainScheduled) return;
  isDrainScheduled = true;
  
  // Delegación isomórfica: Esperamos el momento de inactividad del navegador
  if (typeof globalThis.requestIdleCallback === 'function') {
    globalThis.requestIdleCallback(drainRingBuffer);
  } else {
    setTimeout(drainRingBuffer, 50); // Fallback para Safari / Server
  }
}

/**
 * @section FACHADA SOBERANA
 */
export const SovereignLogger = {
  
  /**
   * @method emit
   * @description Validación síncrona y estricta. Usar para VITAL, OPERATIONAL y RESILIENT (QoS 0-2).
   */
  emit: (informationPayload: ITelemetryPulseInput): void => {
    try {
      const validatedPayload = TelemetryPulseInputSchema.parse(informationPayload);
      const activeContext = SovereignContextStorage.getStore() || {
        correlationIdentifier: CorrelationIdentifierSchema.parse('00000000-0000-0000-0000-000000000000'),
      };

      // Alineación estricta con el Cargamento Único del Gateway (M-010)
      const compressedPulse: ICompressedTelemetryPulse = {
        s: MatrixNeuralBridgeGateway.getSeverityOpCode({ 
          severityLevel: validatedPayload.severity 
        }),
        a: MatrixNeuralBridgeGateway.getApparatusOpCode({ 
          apparatusIdentifier: validatedPayload.apparatusIdentifier 
        }),
        o: MatrixNeuralBridgeGateway.getOperationOpCode({ 
          apparatusIdentifier: validatedPayload.apparatusIdentifier,
          operationIdentifier: validatedPayload.operationCode 
        }),
        c: activeContext.correlationIdentifier,
        t: activeContext.tenantIdentifier,
        l: validatedPayload.executionLatencyInMilliseconds,
        k: validatedPayload.semanticKey,
        v: safelySerializePayload(validatedPayload.interpolationVariables),
        m: safelySerializePayload(validatedPayload.forensicMetadata),
      };

      const pinoLevel = mapSeverityToPinoLevel(validatedPayload.severity);
      pinoEngine[pinoLevel](compressedPulse);

    } catch (caughtError) {
      console.error('RWC-LOGGER-FATAL-OMISSION', caughtError);
    }
  },

  /**
   * @method buffer
   * @description Fast-Path O(1). Usar exclusivamente para BEHAVIORAL (QoS 3).
   * Alimenta el Ring Buffer sin bloquear el hilo de renderizado.
   */
  buffer: (rawPayload: unknown): void => {
    ringBuffer[bufferHead] = rawPayload;
    bufferHead = (bufferHead + 1) % RING_BUFFER_MAX_SIZE;
    
    // Si la presión de datos excede la capacidad, se purgan los registros más antiguos (Lógica FIFO estricta)
    if (bufferHead === bufferTail) {
      bufferTail = (bufferTail + 1) % RING_BUFFER_MAX_SIZE;
    }

    scheduleBufferDrain();
  }
};

/**
 * @function mapSeverityToPinoLevel
 * @private
 */
function mapSeverityToPinoLevel(severity: string): pino.Level {
  switch (severity) {
    case 'FATAL': return 'fatal';
    case 'CRITICAL': return 'fatal';
    case 'ERROR': return 'error';
    case 'WARN': return 'warn';
    default: return 'info';
  }
}