/**
 * @apparatus PersistenceBunkerIndex
 * @role Fachada de la Bóveda de Memoria Segura.
 * @location libs/modular-units/persistence/src/index.ts
 */

export { PersistenceBunker } from './lib/persistence-core/persistence.logic';
export type { IPersistenceKey } from './lib/persistence-core/persistence.schema';
export { PersistenceKeySchema } from './lib/persistence-core/persistence.schema';