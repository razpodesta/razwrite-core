/**
 * @apparatus MetabolicSchedulerIndex
 * @role Fachada de acceso al gobernador de recursos.
 * @location libs/shared-fundamentals/metabolic-scheduler/src/index.ts
 * @status <SEALED_PRODUCTION>
 * @version 8.5.0
 * @protocol OEDP-V8.5 Lattice
 */

export { MetabolicScheduler } from './lib/scheduler-core/scheduler.logic';

export type { 
  IMetabolicMode, 
  IExecutionPermitRequest,
  IResourceSnapshot 
} from './lib/scheduler-core/scheduler.schema';

export {
  MetabolicModeSchema,
  ResourceSnapshotSchema,
  ExecutionPermitRequestSchema
} from './lib/scheduler-core/scheduler.schema';