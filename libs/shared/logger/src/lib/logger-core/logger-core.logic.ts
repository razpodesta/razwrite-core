/**
 * @apparatus LoggerCoreLogic
 * @role Motor de interceptación isomórfico, gestión de Ring Buffer y transmutación ZTM.
 * @location libs/shared/logger/src/lib/logger-core/logger-core.logic.ts
 * @status <SEALED_PRODUCTION>
 * @version 9.3.2
 * @protocol OEDP-V8.5 Lattice
 * @hilo Surface-Pulse | Acid-Pulse
 * @structure NEXO
 * @compliance ISO_25010 | ISO_27001
 */

import pino from 'pino';
import {
  MatrixNeuralBridgeGateway,
  ApparatusIdentifierSchema,
  OperationIdentifierSchema
} from '@razwritecore/nsk-shared-matrix-neural-bridge';
import { ContextRefinery } from './context-refinery/context-refinery.logic';
import {
  type ITelemetryPulseInput,
  type ICompressedTelemetryPulse,
  type ISovereignExecutionContext,
  TelemetryPulseInputSchema,
  SovereignExecutionContextSchema,
  CorrelationIdentifierSchema,
  TenantIdentifierSchema,
  MutantPassportIdentifierSchema
} from './logger-core.schema';

/**
 * @section CONFIGURACIÓN DE MOTOR (ISO 25010)
 */
const pinoEngine = pino({
  level: 'trace',
  timestamp: pino.stdTimeFunctions.unixTime,
  base: undefined,
  browser: {
    asObject: true,
    serialize: true
  }
});

/**
 * @section REFINERÍA DE SERIALIZACIÓN (MATERIA OSCURA)
 * @function serializeForensicInformation
 */
function serializeForensicInformation(
  forensicMetadata?: Record<string, unknown>,
  quantumStateSnapshot?: Uint8Array
): string | undefined {
  if (!forensicMetadata && !quantumStateSnapshot) return undefined;

  try {
    const payloadObject = {
      ...forensicMetadata,
      quantumSnapshot: quantumStateSnapshot
        ? btoa(String.fromCharCode(...quantumStateSnapshot))
        : undefined
    };

    const serializedPayload = JSON.stringify(payloadObject);

    return serializedPayload.length > 10240
      ? '{"error":"CRITICAL_MASS_EXCEEDED"}'
      : serializedPayload;
  } catch {
    return '{"error":"SERIALIZATION_COLLAPSE"}';
  }
}

/**
 * @section ESTRUCTURA ATÓMICA: RING BUFFER (M-015)
 */
const RING_BUFFER_CAPACITY = 1024;
const telemetryRingBuffer = new Array<ITelemetryPulseInput | null>(RING_BUFFER_CAPACITY).fill(null);
let bufferHeadPointer = 0;
let bufferTailPointer = 0;
let isMetabolicDrainActive = false;

/**
 * @function executeMetabolicDrain
 */
function executeMetabolicDrain(): void {
  while (bufferTailPointer !== bufferHeadPointer) {
    const pendingTelemetryInput = telemetryRingBuffer[bufferTailPointer];
    bufferTailPointer = (bufferTailPointer + 1) % RING_BUFFER_CAPACITY;

    if (pendingTelemetryInput) {
      try {
        SovereignLogger.emit(pendingTelemetryInput);
      } catch (caughtError) {
        console.error('DRAIN_PULSE_LOST', caughtError);
      }
    }
  }
  isMetabolicDrainActive = false;
}

/**
 * @apparatus SovereignLogger
 * @description Fachada única para la emisión de telemetría forense.
 */
export const SovereignLogger = {

  /**
   * @method emit
   * @description Ignición de un pulso vital con resolución de contexto blindada (M-001).
   */
  emit: (telemetryPulseInput: ITelemetryPulseInput): void => {
    try {
      // 1. Aduana de Entrada (M-005)
      const validatedInformation = TelemetryPulseInputSchema.parse(telemetryPulseInput);

      /**
       * 2. Resolución de Contexto (Aduana de Bioseguridad)
       * Se resuelve el error TS2322 mediante la normalización del store fragmentado.
       * Se utiliza el Schema.parse() para garantizar que el fallback sea nominalmente válido.
       */
      const rawStoreSnapshot = ContextRefinery.getStore();

      const sovereignExecutionContext: ISovereignExecutionContext = SovereignExecutionContextSchema.parse({
        correlationIdentifier: rawStoreSnapshot?.correlationIdentifier ?? CorrelationIdentifierSchema.parse('00000000-0000-0000-0000-000000000000'),
        tenantIdentifier: rawStoreSnapshot?.tenantIdentifier ?? TenantIdentifierSchema.parse('SYSTEM_ROOT'),
        mutantPassportIdentifier: rawStoreSnapshot?.mutantPassportIdentifier ?? MutantPassportIdentifierSchema.parse('ANONYMOUS_SUBJECT')
      });

      /**
       * 3. Transmutación Nominal (M-004)
       */
      const apparatusId = ApparatusIdentifierSchema.parse(validatedInformation.apparatusIdentifier);
      const operationId = OperationIdentifierSchema.parse(validatedInformation.operationCode);

      const compressedPulse: ICompressedTelemetryPulse = {
        s: MatrixNeuralBridgeGateway.getSeverityOpCode(validatedInformation.severity),
        a: MatrixNeuralBridgeGateway.getApparatusOpCode(apparatusId),
        o: MatrixNeuralBridgeGateway.getOperationOpCode({
          apparatusIdentifier: apparatusId,
          operationIdentifier: operationId
        }),
        c: sovereignExecutionContext.correlationIdentifier,
        u: sovereignExecutionContext.mutantPassportIdentifier,
        t: sovereignExecutionContext.tenantIdentifier,
        l: validatedInformation.executionLatencyInMilliseconds,
        k: validatedInformation.semanticKey,
        m: serializeForensicInformation(
          validatedInformation.forensicMetadata,
          validatedInformation.quantumStateSnapshot
        ),
      };

      // 4. Despacho a Motor de Salida Isomórfico
      const pinoLevel = mapSeverityToPino(validatedInformation.severity);
      pinoEngine[pinoLevel](compressedPulse);

    } catch (caughtError) {
      // 5. Blindaje de Rastro
      console.error('CRITICAL_LOGGER_DISPATCH_FAILURE', caughtError);
    }
  },

  /**
   * @method buffer
   * @description Almacenamiento temporal de pulsos para evitar bloqueos en el Main Thread.
   */
  buffer: (rawInformationPayload: unknown): void => {
    telemetryRingBuffer[bufferHeadPointer] = rawInformationPayload as ITelemetryPulseInput;
    bufferHeadPointer = (bufferHeadPointer + 1) % RING_BUFFER_CAPACITY;

    if (bufferHeadPointer === bufferTailPointer) {
      bufferTailPointer = (bufferTailPointer + 1) % RING_BUFFER_CAPACITY;
    }

    if (!isMetabolicDrainActive) {
      isMetabolicDrainActive = true;
      if (typeof globalThis.requestIdleCallback === 'function') {
        globalThis.requestIdleCallback(executeMetabolicDrain);
      } else {
        setTimeout(executeMetabolicDrain, 200);
      }
    }
  }
} as const;

/**
 * @function mapSeverityToPino
 * @private
 */
function mapSeverityToPino(severity: string): pino.Level {
  const mapping: Record<string, pino.Level> = {
    FATAL: 'fatal',
    CRITICAL: 'fatal',
    ERROR: 'error',
    WARN: 'warn',
    INFO: 'info'
  };
  return mapping[severity] || 'info';
}
