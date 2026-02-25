/**
 * @apparatus SyncOsmosisIndex
 * @role Ministerio Exterior de la Membrana Osmótica.
 * @location libs/modular-units/sync-osmosis/src/index.ts
 * @status <SEALED_PRODUCTION>
 * @version 8.6.0
 * @protocol OEDP-V8.5 Lattice
 */

export { SyncOsmosisEngine } from './lib/osmosis-core/osmosis-core.logic';

export type { 
  IOsmoticPulse,
  IOsmosisConfiguration 
} from './lib/osmosis-core/osmosis-core.schema';

export { 
  OsmoticPulseSchema,
  OsmoticPayloadIdSchema 
} from './lib/osmosis-core/osmosis-core.schema';

// Bloqueo estricto: El AdaptiveTransport y el Worker no se exportan. 
// Son infraestructura interna sellada.