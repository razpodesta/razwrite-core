/**
 * @apparatus ProjectorFacade
 * @role Único punto de acceso soberano y filtro de exportación para el motor de proyección.
 * @location libs/shared/atomic-scene-projector/src/index.ts
 * @status <SEALED_PRODUCTION>
 * @version 9.3.0
 * @protocol OEDP-V8.5 Lattice
 * @description
 * Expone la tríada operativa: Proyección Visual, Orquestación Lógica y Contratos de ADN.
 * Implementa la Doctrina de Fachada Opaca (M-010).
 */

// 1. CAPA DE SUPERFICIE (CUERPO / UI)
// Implementación visual de la marioneta de renderizado.
export { SovereignProjector } from './lib/projector-core/projector-core';

// 2. CAPA DE ORQUESTACIÓN (NEXO / LOGIC)
// Motores de ignición, registro de aparatos y validación forense.
export { ProjectorCoreLogic } from './lib/projector-core/projector-core.logic';
export { ProjectorRegistryLogic } from './lib/projector-core/projector-registry.logic';

// 3. CAPA DE INTELIGENCIA (CEREBRO / RESOLVER)
// Lógica asíncrona de filtrado metabólico y resolución de QoS.
export { ProjectorResolverLogic } from './lib/projector-resolver/projector-resolver.logic';

// 4. CAPA DE BIOSEGURIDAD (ADN / SCHEMAS & TYPES)
// Esquemas de validación Zod y tipos nominales sellados.
export {
  TenantManifestSchema,
  LayoutCellSchema,
  ApparatusIdentifierSchema,
  TenantIdentifierSchema,
  MetabolicWeightSchema,
  NervousSystemContractSchema,
  type ITenantManifest,
  type ILayoutCell,
  type ITenantIdentifier,
  type IApparatusIdentifier,
  type ISemanticVersion,
} from './lib/projector-core/projector-core.schema';
