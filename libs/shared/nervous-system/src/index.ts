/**
 * @apparatus NervousSystemFacade
 * @role Mediador central de intenciones y reacciones del Kernel (M-015).
 * @location libs/shared/nervous-system/src/index.ts
 * @status <SEALED_PRODUCTION>
 * @version 9.0.0
 * @protocol OEDP-V8.5 Lattice
 */

// --- 1. ORQUESTADORES (NEXOS) ---
export { SovereignNervousSystem } from './lib/intention-router/intention-router.logic';
export { QuantumBridgeLogic } from './lib/quantum-bridge/quantum-bridge.logic';
export { SilentWhispererLogic } from './lib/silent-whisperer/silent-whisperer.logic';

// --- 2. CONTRATOS DE ADN (INTENTION) ---
export {
  IntentionDispatchPayloadSchema,
  ReactionSnapshotPayloadSchema,
  QualityOfServiceTierSchema
} from './lib/intention-router/intention-router.schema';

export type {
  IIntentionDispatchPayload,
  IReactionSnapshotPayload,
  IQualityOfServiceTier,
  IObservableEmulator,
  ISovereignSubscription,
  ISubscriptionCallback
} from './lib/intention-router/intention-router.schema';

// --- 3. CONTRATOS DE ADN (QUANTUM) ---
export {
  QuantumBufferIdentifierSchema,
  BufferAllocationInputSchema
} from './lib/quantum-bridge/quantum-bridge.schema';

export type {
  IQuantumBufferIdentifier,
  IBufferAllocationInput,
  IQuantumBufferSnapshot
} from './lib/quantum-bridge/quantum-bridge.schema';

// --- 4. CONTRATOS DE ADN (WHISPERER) ---
export {
  WorkerRegistrationInputSchema,
  ServiceWorkerScopeSchema,
  BackgroundSyncTagSchema
} from './lib/silent-whisperer/silent-whisperer.schema';

export type {
  IWorkerRegistrationInput,
  IWorkerStatusSnapshot,
  IBackgroundSyncTag
} from './lib/silent-whisperer/silent-whisperer.schema';
