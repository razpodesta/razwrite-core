/**
 * @apparatus ViralIncentiveEngineBrain
 * @role Cerebro asíncrono para la forja de firmas de atribución y anonimización de referidos.
 * @location libs/bunkers/viral-incentive/src/lib/viral-incentive-engine/viral-incentive-engine.worker.ts
 * @status <STABILIZED>
 * @version 9.5.0
 * @protocol OEDP-V8.5 Lattice
 * @hilo Deep-Pulse
 * @structure CEREBRO
 */

import * as Comlink from 'comlink';
import { HashingEngineLogic } from '@razwritecore/nsk-shared-crypto';
import {
  type IViralInvitationInput,
  type IAttributionShadowNode,
  ReferralTokenIdentifierSchema
} from './viral-incentive-engine.schema';

const ViralIncentiveEngineBrain = {
  /**
   * @method forgeReferralNode
   * @description Crea un vínculo de atribución indescifrable mediante HMAC (M-034).
   */
  forgeReferralNode: async (request: IViralInvitationInput): Promise<IAttributionShadowNode> => {
    // 1. Anonimización del emisor para cumplimiento ISO 27701
    const opaqueReferrerIdentifier = await HashingEngineLogic.generateHash({
      informationMaterial: `${request.invitationSourceMutantIdentifier}:${request.rewardCampaignIdentifier}`,
      algorithm: 'SHA-256'
    });

    // 2. Generación de Token de Propagación
    const referralToken = `${opaqueReferrerIdentifier.substring(0, 12)}.${Date.now().toString(36)}`;

    // 3. Firma de Integridad del Nodo
    const attributionSignature = await HashingEngineLogic.generateHash({
      informationMaterial: `${referralToken}:${request.targetTenantIdentifier}`,
      algorithm: 'SHA-256'
    });

    return {
      referralToken: ReferralTokenIdentifierSchema.parse(referralToken),
      attributionSignature,
      expirationTimestampInMilliseconds: Date.now() + (1000 * 60 * 60 * 24 * 7) // 7 días de vida cuántica
    };
  }
};

Comlink.expose(ViralIncentiveEngineBrain);
export type IViralIncentiveEngineBrain = typeof ViralIncentiveEngineBrain;
