/**
 * @apparatus ViralIncentiveIndex
 * @role Ministerio de Propagación y Viralidad (Fachada Opaca).
 * @location libs/bunkers/viral-incentive/src/index.ts
 */

export { ViralIncentiveEngineLogic } from './lib/viral-incentive-engine/viral-incentive-engine.logic';

export {
  ReferralTokenIdentifierSchema,
  IncentiveRewardCodeSchema,
  ViralInvitationInputSchema
} from './lib/viral-incentive-engine/viral-incentive-engine.schema';

export type {
  IReferralTokenIdentifier,
  IIncentiveRewardCode,
  IViralInvitationInput,
  IAttributionShadowNode
} from './lib/viral-incentive-engine/viral-incentive-engine.schema';

export type { IViralIncentiveEngineBrain } from './lib/viral-incentive-engine/viral-incentive-engine.worker';
