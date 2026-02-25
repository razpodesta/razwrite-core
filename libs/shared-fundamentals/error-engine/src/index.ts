/**
 * @apparatus SovereignErrorEngineIndex
 * @role Punto de entrada sellado para la refinería de errores y autocura.
 * @location libs/shared-fundamentals/error-engine/src/index.ts
 * @status <SEALED_PRODUCTION>
 * @version 8.5.0
 * @protocol OEDP-V8.5 Lattice
 */

export { SovereignErrorRefinery } from './lib/error-refinery.logic';
export { executeForensicScrubbing } from './lib/error-refinery.worker';

export type { 
  IErrorTransmutationInput, 
  IForensicErrorPacket, 
  ISystemErrorCode 
} from './lib/error-refinery.schema';

export { SystemErrorCodeSchema } from './lib/error-refinery.schema';