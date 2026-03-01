/**
 * @apparatus ViralIncentiveEngineDNA
 * @role Contratos genéticos para árboles de incentivos y tokens de propagación.
 * @location libs/bunkers/viral-incentive/src/lib/viral-incentive-engine/viral-incentive-engine.schema.ts
 * @status <SEALED_PRODUCTION>
 * @version 9.5.0
 * @protocol OEDP-V8.5 Lattice
 * @structure ADN
 * @compliance ISO_27701 | ISO_27001
 */

import { z } from 'zod';

/**
 * @section DIMENSIONES NOMINALES (M-005)
 */
export const ReferralTokenIdentifierSchema = z.string()
  .min(24)
  .describe('Token criptográfico opaco para la atribución de referidos.')
  .brand<'ReferralTokenIdentifier'>();

export const IncentiveRewardCodeSchema = z.string()
  .min(8)
  .regex(/^[A-Z0-9_-]+$/)
  .brand<'IncentiveRewardCode'>();

/**
 * @section CARGAMENTO DE PROPAGACIÓN (M-034)
 */
export const ViralInvitationInputSchema = z.object({
  invitationSourceMutantIdentifier: z.string().describe('ID del emisor (se anonimizará en el Worker).'),
  targetTenantIdentifier: z.string(),
  rewardCampaignIdentifier: z.string().uuid(),
}).readonly();

/**
 * @section SNAPSHOT DE ATRIBUCIÓN
 */
export const AttributionShadowNodeSchema = z.object({
  referralToken: ReferralTokenIdentifierSchema,
  attributionSignature: z.string().describe('Firma HMAC-SHA256 del vínculo.'),
  expirationTimestampInMilliseconds: z.number().nonnegative(),
}).readonly();

/**
 * @section INFERENCIAS SOBERANAS
 */
export type IReferralTokenIdentifier = z.infer<typeof ReferralTokenIdentifierSchema>;
export type IIncentiveRewardCode = z.infer<typeof IncentiveRewardCodeSchema>;
export type IViralInvitationInput = z.infer<typeof ViralInvitationInputSchema>;
export type IAttributionShadowNode = z.infer<typeof AttributionShadowNodeSchema>;
