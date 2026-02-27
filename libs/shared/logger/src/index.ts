/**
 * @apparatus SovereignLoggerFacade
 * @role Único punto de entrada sellado para el sistema circulatorio de telemetría y contexto.
 * @location libs/shared/logger/src/index.ts
 * @status <SEALED_PRODUCTION>
 * @version 9.2.0
 * @protocol OEDP-V8.5 Lattice
 * @hilo Surface-Pulse | Deep-Pulse | Acid-Pulse
 */

/**
 * @section CAPA DE INTERFAZ (NEXO / LOGIC)
 * Objeto orquestador constante para la emisión de pulsos y gestión de buffers.
 */
export { SovereignLogger } from './lib/logger-core/logger-core.logic';

/**
 * @section CAPA DE CONTEXTO (REFINERY / NEXO)
 * Gestor de estado asíncrono isomórfico (AsyncLocalStorage / GlobalStore).
 */
export { ContextRefinery } from './lib/logger-core/context-refinery/context-refinery.logic';

/**
 * @section CAPA DE BIOSEGURIDAD (ADN / SCHEMAS & TYPES)
 * Esquemas de validación Zod y tipos nominales para el rastro forense.
 */
export {
  CorrelationIdentifierSchema,
  TenantIdentifierSchema,
  MutantPassportIdentifierSchema,
  ApparatusIdentifierSchema,
  OperationCodeSchema,
  SeverityLevelSchema,
  TelemetryPulseInputSchema,
} from './lib/logger-core/logger-core.schema';

export type {
  ICorrelationIdentifier,
  ITenantIdentifier,
  IMutantPassportIdentifier,
  ITelemetryPulseInput,
  ICompressedTelemetryPulse,
} from './lib/logger-core/logger-core.schema';

/**
 * @section CAPA DE EJECUCIÓN (CONTEXT DNA)
 */
export { SovereignExecutionContextSchema } from './lib/logger-core/context-refinery/context-refinery.schema';
export type { ISovereignExecutionContext } from './lib/logger-core/context-refinery/context-refinery.schema';
