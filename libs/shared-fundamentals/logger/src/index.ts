/**
 * @apparatus SovereignLoggerIndex
 * @role Punto de entrada único y sellado para el sistema de telemetría isomórfica.
 * @location libs/shared-fundamentals/logger/src/index.ts
 * @status <SEALED_PRODUCTION>
 */

export { SovereignLogger } from './lib/sovereign-logger.logic';
export { SovereignContextStorage } from './lib/sovereign-context.logic';

export type { 
  ITelemetryPulseInput, 
  ISovereignExecutionContext,
  ICorrelationIdentifier,
  ITenantIdentifier 
} from './lib/sovereign-logger.schema';

export { 
  CorrelationIdentifierSchema, 
  TenantIdentifierSchema 
} from './lib/sovereign-logger.schema';