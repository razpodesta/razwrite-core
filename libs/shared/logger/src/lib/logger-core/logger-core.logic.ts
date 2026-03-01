/**
 * @apparatus LoggerCoreLogic
 * @role Motor de interceptación isomórfico, gestão de Ring Buffer e transmutação ZTM.
 * @location libs/shared/logger/src/lib/logger-core/logger-core.logic.ts
 * @status <STABILIZED>
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

/**
 * @section Sincronia_NodeNext
 * M-019: Uso obrigatório de extensões .js para resolução de rastro local.
 */
import { ContextRefinery } from './context-refinery/context-refinery.logic.js';
import {
  type ITelemetryPulseInput,
  type ICompressedTelemetryPulse,
  type ISovereignExecutionContext,
  TelemetryPulseInputSchema,
  SovereignExecutionContextSchema,
  CorrelationIdentifierSchema,
  TenantIdentifierSchema,
  MutantPassportIdentifierSchema
} from './logger-core.schema.js';

/**
 * @section CONFIGURAÇÃO DE MOTOR (ISO 25010)
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
      /**
       * @section Isomorfia_de_Borda
       * Transmuta o rastro binário para Base64 compatível com Edge Runtime.
       */
      quantumSnapshot: quantumStateSnapshot
        ? btoa(Array.from(quantumStateSnapshot).map(byte => String.fromCharCode(byte)).join(''))
        : undefined
    };

    const serializedPayload = JSON.stringify(payloadObject);

    // M-015-B: Proteção de massa crítica (10KB limit)
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
 * @description Realiza o esvaziamento do buffer em períodos de inatividade.
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
 * @description Fachada única para a emissão de telemetría forense.
 */
export const SovereignLogger = {

  /**
   * @method emit
   * @description Ignição de um pulso vital com resolução de contexto blindada (M-001).
   */
  emit: (telemetryPulseInput: ITelemetryPulseInput): void => {
    try {
      // 1. Aduana de Entrada (M-005)
      const validatedInformation = TelemetryPulseInputSchema.parse(telemetryPulseInput);

      // 2. Resolução de Contexto (Aduana de Biosegurança)
      const rawStoreSnapshot = ContextRefinery.getStore();

      const sovereignExecutionContext: ISovereignExecutionContext = SovereignExecutionContextSchema.parse({
        correlationIdentifier: rawStoreSnapshot?.correlationIdentifier ?? CorrelationIdentifierSchema.parse('00000000-0000-0000-0000-000000000000'),
        tenantIdentifier: rawStoreSnapshot?.tenantIdentifier ?? TenantIdentifierSchema.parse('SYSTEM_ROOT'),
        mutantPassportIdentifier: rawStoreSnapshot?.mutantPassportIdentifier ?? MutantPassportIdentifierSchema.parse('ANONYMOUS_SUBJECT')
      });

      // 3. Transmutação Nominal (M-004)
      const apparatusIdentifier = ApparatusIdentifierSchema.parse(validatedInformation.apparatusIdentifier);
      const operationCode = OperationIdentifierSchema.parse(validatedInformation.operationCode);

      const compressedPulse: ICompressedTelemetryPulse = {
        s: MatrixNeuralBridgeGateway.getSeverityOpCode(validatedInformation.severity),
        a: MatrixNeuralBridgeGateway.getApparatusOpCode(apparatusIdentifier),
        o: MatrixNeuralBridgeGateway.getOperationOpCode({
          apparatusIdentifier: apparatusIdentifier,
          operationIdentifier: operationCode
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

      // 4. Despacho Isomórfico
      const pinoLevel = mapSeverityToPino(validatedInformation.severity);
      pinoEngine[pinoLevel](compressedPulse);

    } catch (caughtError) {
      console.error('CRITICAL_LOGGER_DISPATCH_FAILURE', caughtError);
    }
  },

  /**
   * @method buffer
   * @description Armazenamento temporário para proteger a fluidez (60fps).
   */
  buffer: (rawInformationPayload: unknown): void => {
    // Aduana de rastro behaviorista (QoS 3)
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
