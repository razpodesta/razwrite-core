/**
 * @apparatus SovereignErrorLogic
 * @role Único punto de entrada soberano para la neutralización de entropía y rastro forense.
 * @location libs/shared/error-engine/src/lib/error-refinery/error-refinery.logic.ts
 * @status <SEALED_PRODUCTION>
 * @version 9.3.0
 * @protocol OEDP-V8.5 Lattice
 * @hilo Surface-Pulse | Deep-Pulse
 * @structure NEXO
 * @compliance ISO_27001 | ISO_25010
 */

import {
  SovereignLogger,
  ContextRefinery,
  ApparatusIdentifierSchema,
  OperationCodeSchema,
  CorrelationIdentifierSchema,
  TenantIdentifierSchema,
  MutantPassportIdentifierSchema
} from '@razwritecore/nsk-shared-logger';

import { executeForensicScrubbing } from './error-refinery.worker';
import {
  type IErrorTransmutationInput,
  ErrorTransmutationInputSchema,
} from './error-refinery.schema';

/**
 * @class SovereignErrorInstance
 * @description Entidad de error inmutable y sanitizada para su propagación hacia la Interface Layer.
 */
class SovereignErrorInstance extends Error {
  public readonly correlationIdentifier: string;
  public readonly uniqueErrorCode: string;

  constructor(
    uniqueErrorCode: string,
    apparatusIdentifier: string,
    correlationIdentifier: string
  ) {
    super(`[${uniqueErrorCode}] Anomalía neutralizada en: ${apparatusIdentifier}`);
    this.name = 'SovereignError';
    this.uniqueErrorCode = uniqueErrorCode;
    this.correlationIdentifier = correlationIdentifier;

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, SovereignErrorInstance);
    }
  }
}

/**
 * @section FACHADA SOBERANA (M-010)
 */
export const SovereignError = {
  /**
   * @method transmute
   * @description Transmuta la falla en inteligencia forense cifrada y rastro inalterable.
   */
  transmute: (informationPayload: IErrorTransmutationInput): SovereignErrorInstance => {
    const transmutationStartTime = performance.now();

    // 1. Aduana de ADN
    const validatedInput = ErrorTransmutationInputSchema.parse(informationPayload);

    // 2. Recuperación de Contexto (Merge Defensivo M-001)
    const storeSnapshot = ContextRefinery.getStore();
    const correlationIdentifier = storeSnapshot?.correlationIdentifier ?? CorrelationIdentifierSchema.parse('00000000-0000-0000-0000-000000000000');
    const tenantIdentifier = storeSnapshot?.tenantIdentifier ?? TenantIdentifierSchema.parse('SYSTEM_ROOT');
    const mutantPassportIdentifier = storeSnapshot?.mutantPassportIdentifier ?? MutantPassportIdentifierSchema.parse('ANONYMOUS_SUBJECT');

    // 3. Extracción y Purificación ISO 27701
    const rawErrorContext = validatedInput.caughtError instanceof Error
      ? validatedInput.caughtError.stack || validatedInput.caughtError.message
      : String(validatedInput.caughtError);

    const scrubbedForensicTrace = executeForensicScrubbing(rawErrorContext);

    // 4. Emisión de Pulso Vital
    const semanticKeyPath = validatedInput.semanticKey || 'SovereignErrorEngine.defaultFailsafeMessage';
    const isCritical = ['CRITICAL', 'FATAL'].includes(validatedInput.severity);

    SovereignLogger.emit({
      severity: validatedInput.severity,
      apparatusIdentifier: ApparatusIdentifierSchema.parse(validatedInput.apparatusIdentifier),
      operationCode: OperationCodeSchema.parse('ERROR_TRANSMUTED'),
      semanticKey: semanticKeyPath,
      interpolationVariables: { errorCode: validatedInput.uniqueErrorCode },
      executionLatencyInMilliseconds: performance.now() - transmutationStartTime,
      forensicMetadata: {
        scrubbedTrace: scrubbedForensicTrace,
        // Adéndum 001-A: Snapshot de seguridad automático
        memorySnapshot: isCritical ? validatedInput.informationPayloadSnapshot : undefined,
        context: { correlationIdentifier, tenantIdentifier, mutantPassportIdentifier }
      },
    });

    // 5. Sello y Retorno
    return new SovereignErrorInstance(
      validatedInput.uniqueErrorCode,
      validatedInput.apparatusIdentifier,
      correlationIdentifier
    );
  }
} as const;
