/**
 * @apparatus AtomicSceneProjectorIndex
 * @role Punto de entrada único para la maquinaria de proyección.
 * @location libs/shared-fundamentals/atomic-scene-projector/src/index.ts
 */

export { AtomicSceneProjector } from './lib/projector-core/projector-core';
export { BunkerRegistry } from './lib/projector-core/projector-registry.logic';

export type { 
  ITenantManifest, 
  ILayoutCell, 
  ITenantIdentifier, 
  IBunkerIdentifier 
} from './lib/projector-core/projector-core.schema';

export {
  TenantManifestSchema,
  BunkerIdentifierSchema
} from './lib/projector-core/projector-core.schema';