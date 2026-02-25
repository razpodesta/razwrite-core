/**
 * @apparatus SovereignErrorRefinery
 * @role Nexo de superficie para la neutralización y transmutación de entropía.
 * @location libs/shared-fundamentals/error-engine/src/lib/error-refinery.logic.ts
 * @status <SEALED_PRODUCTION>
 * @version 8.5.0
 * @hilo Surface-Pulse
 */

import { SovereignLogger, SovereignContextStorage } from '@razwritecore/nsk-shared-logger';
import { executeForensicScrubbing } from './error-refinery.worker';
import { 
  type IErrorTransmutationInput, 
  ErrorTransmutationInputSchema 
} from './error-refinery.schema';

/**
 * Entidad de Error Inmutable para elevación controlada.
 */
class SovereignErrorInstance extends Error {
  public readonly correlationIdentifier: string;

  constructor(errorCode: string, apparatusName: string, correlationId: string) {
    super(`[${errorCode}] Fallo neutralizado en el búnker: ${apparatusName}`);
    this.name = 'SovereignError';
    this.correlationIdentifier = correlationId;
    
    // Evita que la creación de esta clase contamine el stack trace
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, SovereignErrorInstance);
    }
  }
}

/**
 * @section FACHADA SOBERANA (M-010)
 */
export const SovereignErrorRefinery = {
  
  /**
   * @method transmute
   * @description Captura el dolor del sistema, aísla el contexto, purga PII y alerta al Córtex.
   */
  transmute: (incomingRequest: IErrorTransmutationInput): SovereignErrorInstance => {
    
    // 1. Aduana de ADN
    const validatedInput = ErrorTransmutationInputSchema.parse(incomingRequest);
    
    // 2. Extracción Atómica de Contexto Isomórfico
    const activeContext = SovereignContextStorage.getStore() || {
      correlationIdentifier: '00000000-0000-0000-0000-000000000000',
      tenantIdentifier: 'SYSTEM_TENANT'
    };

    // 3. Extracción Segura del Error Crudo
    const rawError = validatedInput.caughtError instanceof Error 
      ? validatedInput.caughtError.stack || validatedInput.caughtError.message 
      : String(validatedInput.caughtError);

    // 4. Sanitización Estricta (Offloading simulado hacia el Worker)
    const scrubbedStackTrace = executeForensicScrubbing(rawError);

    // 5. Formulación de Clave Semántica
    const semanticKeyPath = validatedInput.semanticKey || 'SharedFundamentals.SovereignErrorEngine.defaultFailsafeMessage';

    // 6. Despacho de Advertencia al SovereignLogger (ZTM)
    SovereignLogger.emit({
      severity: validatedInput.severity,
      apparatusIdentifier: validatedInput.apparatusIdentifier,
      operationCode: 'ERROR_TRANSMUTED',
      semanticKey: semanticKeyPath,
      interpolationVariables: { errorCode: validatedInput.uniqueErrorCode },
      forensicMetadata: {
        scrubbedTrace: scrubbedStackTrace,
        memorySnapshot: validatedInput.informationPayloadSnapshot
      },
    });

    // 7. Retorno de la Entidad de Error Neutralizada (Segura para la UI)
    return new SovereignErrorInstance(
      validatedInput.uniqueErrorCode, 
      validatedInput.apparatusIdentifier, 
      activeContext.correlationIdentifier
    );
  }
};