/**
 * @apparatus ViralIncentiveEngineLogic
 * @role Orquestador de superficie para la generación de invitaciones y gestión de recompensas.
 * @location libs/bunkers/viral-incentive/src/lib/viral-incentive-engine/viral-incentive-engine.logic.ts
 * @status <SEALED_PRODUCTION>
 * @version 9.5.0
 * @protocol OEDP-V8.5 Lattice
 * @hilo Surface-Pulse
 * @structure NEXO
 */

import * as Comlink from 'comlink';
import {
  SovereignLogger,
  ApparatusIdentifierSchema,
  OperationCodeSchema
} from '@razwritecore/nsk-shared-logger';
import { type IViralIncentiveEngineBrain } from './viral-incentive-engine.worker';
import { type IViralInvitationInput, type IAttributionShadowNode } from './viral-incentive-engine.schema';
import { z } from 'zod';

type IApparatusIdentifier = z.infer<typeof ApparatusIdentifierSchema>;
type IOperationCode = z.infer<typeof OperationCodeSchema>;

let brainProxy: Comlink.Remote<IViralIncentiveEngineBrain> | null = null;

export const ViralIncentiveEngineLogic = {

  /**
   * @method igniteEngine
   * @description Inicializa el worker de viralidad.
   */
  igniteEngine: (): void => {
    if (typeof window === 'undefined') return;
    const worker = new Worker(new URL('./viral-incentive-engine.worker.ts', import.meta.url), { type: 'module' });
    brainProxy = Comlink.wrap<IViralIncentiveEngineBrain>(worker);
  },

  /**
   * @method generateInvitationVector
   * @description Solicita al cerebro la forja de un nuevo nodo de referidos.
   */
  generateInvitationVector: async (input: IViralInvitationInput): Promise<IAttributionShadowNode> => {
    const executionStartTime = performance.now();

    if (!brainProxy) ViralIncentiveEngineLogic.igniteEngine();

    try {
      const shadowNode = await brainProxy!.forgeReferralNode(input);

      SovereignLogger.emit({
        severity: 'INFO',
        apparatusIdentifier: 'ViralIncentiveEngine' as unknown as IApparatusIdentifier,
        operationCode: 'INVITATION_FORGED' as unknown as IOperationCode,
        semanticKey: 'ViralIncentiveEngine.Propagation.LinkGenerated',
        executionLatencyInMilliseconds: performance.now() - executionStartTime,
        forensicMetadata: { campaignIdentifier: input.rewardCampaignIdentifier }
      });

      return shadowNode;
    } catch (caughtError) {
      // Los fallos aquí se reportan al Sentinel pero no bloquean al usuario.
      throw caughtError;
    }
  }
} as const;
