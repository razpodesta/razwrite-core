/**
 * @apparatus OfflineMirageFacade
 * @role Único punto de entrada para la orquestación de resiliencia y modo espejismo (M-035).
 * @location libs/shared/offline-mirage/src/index.ts
 * @status <SEALED_PRODUCTION>
 * @version 9.0.0
 * @protocol OEDP-V8.5 Lattice
 */

// --- 1. ORQUESTADOR CENTRAL (NEXO) ---
// Exportación de la lógica de intercepción de red y transmutación de realidad.
export { OfflineMirageLogic } from './lib/mirage-core/mirage-core.logic';

// --- 2. CONTRATOS DE ADN (ESQUEMAS) ---
// Validador Zod para estados de desconexión y colas de supervivencia.
export {
  MirageStatusSchema,
  DeferredIntentionSchema
} from './lib/mirage-core/mirage-core.schema';

// --- 3. INFERENCIAS SOBERANAS (TIPOS) ---
export type {
  IMirageStatus,
  IDeferredIntention
} from './lib/mirage-core/mirage-core.schema';
