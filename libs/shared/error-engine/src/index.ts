/**
 * @apparatus SovereignErrorEngineFacade
 * @role Único punto de entrada sellado para la refinería de errores y autocura.
 * @location libs/shared/error-engine/src/index.ts
 * @status <SEALED_PRODUCTION>
 * @version 9.3.1
 * @protocol OEDP-V8.5 Lattice
 */

// 1. Orquestador Maestro (Nexo)
// Exportación nominativa para asegurar que SovereignError sea accesible como objeto constante.
export { SovereignError } from './lib/error-refinery/error-refinery.logic';

// 2. Motor de Sanitización (Cerebro)
export { executeForensicScrubbing } from './lib/error-refinery/error-refinery.worker';

// 3. Contratos de ADN (Esquemas y Tipos)
export {
  SystemErrorCodeSchema,
  ErrorTransmutationInputSchema,
  ForensicErrorPacketSchema,
  SeverityLevelSchema
} from './lib/error-refinery/error-refinery.schema';

export type {
  IErrorTransmutationInput,
  IForensicErrorPacket,
  ISystemErrorCode,
  ISeverityLevel
} from './lib/error-refinery/error-refinery.schema';
