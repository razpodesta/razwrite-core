/**
 * @apparatus ErrorRefineryLogic
 * @role Único ponto de entrada soberano para a transmutação de falhas em inteligência forense.
 * @location libs/shared/error-engine/src/lib/error-refinery/error-refinery.logic.ts
 * @status <SEALED_PRODUCTION>
 * @version 9.4.1
 * @protocol OEDP-V8.5 Lattice
 * @hilo Surface-Pulse | Deep-Pulse
 * @structure NEXO
 * @compliance ISO_27001 | ISO_25010 | ISO_27701
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

/**
 * @section Sincronia_NodeNext
 * M-019: Rastro .js para conformidade com o motor ESM 2026.
 */
import { executeForensicScrubbing } from './error-refinery.worker.js';
import {
  type IErrorTransmutationInput,
  ErrorTransmutationInputSchema,
} from './error-refinery.schema.js';

/**
 * @class SovereignErrorInstance
 * @description Entidade de erro inmutable e sanitizada para propagação segura.
 */
class SovereignErrorInstance extends Error {
  public readonly correlationIdentifier: string;
  public readonly uniqueErrorCode: string;
  public readonly apparatusSource: string;

  constructor(
    uniqueErrorCode: string,
    apparatusIdentifier: string,
    correlationIdentifier: string
  ) {
    super(`[${uniqueErrorCode}] Anomalía neutralizada em: ${apparatusIdentifier}`);
    this.name = 'SovereignError';
    this.uniqueErrorCode = uniqueErrorCode;
    this.apparatusSource = apparatusIdentifier;
    this.correlationIdentifier = correlationIdentifier;

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, SovereignErrorInstance);
    }
  }
}

/**
 * @section FACHADA SOBERANA (M-010)
 */
export const ErrorRefineryLogic = {
  /**
   * @method transmute
   * @description Transmuta a entropia em inteligência forense cifrada e higienizada.
   */
  transmute: (requestPayload: IErrorTransmutationInput): SovereignErrorInstance => {
    const transmutationStartTime = performance.now();

    // 1. Aduana de ADN (Ingresso Seguro)
    const validatedInput = ErrorTransmutationInputSchema.parse(requestPayload);

    // 2. Recuperação de Contexto Isomórfico
    const storeSnapshot = ContextRefinery.getStore();
    const correlationIdentifier = storeSnapshot?.correlationIdentifier ?? CorrelationIdentifierSchema.parse('00000000-0000-0000-0000-000000000000');
    const tenantIdentifier = storeSnapshot?.tenantIdentifier ?? TenantIdentifierSchema.parse('SYSTEM_ROOT');
    const mutantPassportIdentifier = storeSnapshot?.mutantPassportIdentifier ?? MutantPassportIdentifierSchema.parse('ANONYMOUS_SUBJECT');

    // 3. Purificação Forense ISO 27701 (Scrubbing)
    const rawErrorContext = validatedInput.caughtError instanceof Error
      ? `${validatedInput.caughtError.name}: ${validatedInput.caughtError.message}\n${validatedInput.caughtError.stack}`
      : String(validatedInput.caughtError);

    const scrubbedForensicTrace = executeForensicScrubbing(rawErrorContext);

    // 4. Emissão de Pulso Vital ao Sistema Nervoso (SovereignLogger)
    const semanticKeyPath = validatedInput.semanticKey || 'ErrorRefinery.Errors.DefaultFailsafe';
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
        // Adéndum 001-A: Snapshot de segurança automático em falhas críticas
        memorySnapshot: isCritical ? validatedInput.informationPayloadSnapshot : undefined,
        contextSnapshot: {
          correlationIdentifier,
          tenantIdentifier,
          mutantPassportIdentifier
        }
      },
    });

    // 5. Retorno de Instância Inmutable
    return new SovereignErrorInstance(
      validatedInput.uniqueErrorCode,
      validatedInput.apparatusIdentifier,
      correlationIdentifier
    );
  }
} as const;

/**
 * @alias SovereignError
 */
export const SovereignError = ErrorRefineryLogic;
