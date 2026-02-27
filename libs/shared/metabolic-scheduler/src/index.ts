/**
 * @apparatus MetabolicSchedulerFacade
 * @role Único ponto de entrada para a governança metabólica e gestão de recursos (ISO 25010).
 * @location libs/shared/metabolic-scheduler/src/index.ts
 * @status <SEALED_PRODUCTION>
 * @version 9.0.0
 * @protocol OEDP-V8.5 Lattice
 */

// --- 1. ORQUESTRADOR CENTRAL (NEXO) ---
// Exportação do objeto constante que governa o hardware.
export { MetabolicScheduler } from './lib/scheduler-core/scheduler-core.logic';

// --- 2. CONTRATOS DE ADN (ESQUEMAS) ---
// Validação Zod para estados energéticos e permissões.
export {
  MetabolicModeSchema,
  ResourceSnapshotSchema,
  ExecutionPermitRequestSchema
} from './lib/scheduler-core/scheduler-core.schema';

// --- 3. INFERÊNCIAS SOBERANAS (TIPOS) ---
export type {
  IMetabolicMode,
  IExecutionPermitRequest,
  IResourceSnapshot
} from './lib/scheduler-core/scheduler-core.schema';
