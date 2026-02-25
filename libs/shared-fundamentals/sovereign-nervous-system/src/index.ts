/**
 * @apparatus SovereignNervousSystemIndex
 * @role Fachada maestra del clúster del Sistema Nervioso.
 * @location libs/shared-fundamentals/sovereign-nervous-system/src/index.ts
 * @status <SEALED_PRODUCTION>
 * @version 8.5.0
 * @protocol OEDP-V8.5 Lattice
 */

// 1. Exportación de la unidad principal
export { SovereignNervousSystem } from './lib/intention-router/intention-router.logic';

// 2. Exportación de los contratos (ADN)
export type { 
  IQualityOfServiceTier,
  IIntentionDispatchPayload,
  IReactionSnapshotPayload
} from './lib/intention-router/intention-router.schema';

export {
  QualityOfServiceTierSchema,
  IntentionDispatchPayloadSchema,
  ReactionSnapshotPayloadSchema
} from './lib/intention-router/intention-router.schema';

// 3. Exportación de unidades en ignición (Domain Clustering)
export { QuantumBridgeManager } from './lib/quantum-bridge/quantum-bridge.logic';
export { SilentWhispererOrchestrator } from './lib/silent-whisperer/silent-whisperer.logic';