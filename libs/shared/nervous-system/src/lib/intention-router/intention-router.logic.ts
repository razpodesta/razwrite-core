/**
 * @apparatus IntentionRouterLogic
 * @role Bus de eventos nativo isomórfico con ruteo O(1) y protección de membrana.
 * @location libs/shared/nervous-system/src/lib/intention-router/intention-router.logic.ts
 * @status <SEALED_PRODUCTION>
 * @version 9.0.2
 * @protocol OEDP-V8.5 Lattice
 * @hilo Surface-Pulse | Deep-Pulse
 * @structure NEXO
 * @compliance ISO_25010 | ISO_27001
 */

import {
  SovereignLogger,
  ApparatusIdentifierSchema,
  OperationCodeSchema
} from '@razwritecore/nsk-shared-logger';

import {
  type IIntentionDispatchPayload,
  type IReactionSnapshotPayload,
  type IObservableEmulator,
  type ISubscriptionCallback,
  type ISovereignSubscription,
  IntentionDispatchPayloadSchema,
  ReactionSnapshotPayloadSchema
} from './intention-router.schema';

/**
 * @section CONSTANTES SOBERANAS (NOMINAL BRANDING)
 * Se sellan los identificadores estáticos para satisfacer el tipado estricto del Logger.
 */
const APPARATUS_ID = ApparatusIdentifierSchema.parse('IntentionRouter');

/**
 * @constant CONGESTION_THRESHOLD
 * Límite de suscriptores por OpCode para preservar la salud del bus (ISO 25010).
 */
const CONGESTION_THRESHOLD = 50;

/**
 * @class SovereignStream
 * @private
 * @description Motor interno de transmisión Pub/Sub con acceso directo por OpCode.
 */
class SovereignStream<TPayload> {
  private readonly listenerMatrix = new Map<number, Set<ISubscriptionCallback<TPayload>>>();

  public publish(targetOpCode: number, payload: TPayload): void {
    const activeListeners = this.listenerMatrix.get(targetOpCode);
    if (activeListeners) {
      activeListeners.forEach(callback => {
        try {
          callback(payload);
        } catch (caughtError) {
          console.error('NSK_NERVOUS_SYSTEM_CALLBACK_FAILURE', caughtError);
        }
      });
    }
  }

  public createObservable(targetOpCode: number): IObservableEmulator<TPayload> {
    return {
      subscribe: (callback: ISubscriptionCallback<TPayload>): ISovereignSubscription => {
        if (!this.listenerMatrix.has(targetOpCode)) {
          this.listenerMatrix.set(targetOpCode, new Set());
        }

        const listeners = this.listenerMatrix.get(targetOpCode)!;

        // Defensa de Membrana: Auditoría de congestión
        if (listeners.size >= CONGESTION_THRESHOLD) {
          SovereignLogger.emit({
            severity: 'WARN',
            apparatusIdentifier: APPARATUS_ID,
            operationCode: OperationCodeSchema.parse('MEMBRANE_CONGESTION'),
            semanticKey: 'NervousSystem.IntentionRouter.membraneCongestion',
            forensicMetadata: { targetOpCode, currentListenerCount: listeners.size }
          });
        }

        listeners.add(callback);

        return {
          unsubscribe: () => {
            const activeListeners = this.listenerMatrix.get(targetOpCode);
            if (activeListeners) {
              activeListeners.delete(callback);
              if (activeListeners.size === 0) {
                this.listenerMatrix.delete(targetOpCode);
              }
            }
          }
        };
      }
    };
  }
}

const intentionStream = new SovereignStream<IIntentionDispatchPayload>();
const reactionStream = new SovereignStream<IReactionSnapshotPayload>();

/**
 * @apparatus SovereignNervousSystem
 * @description Mediador central de intenciones y reacciones del Kernel.
 */
export const SovereignNervousSystem = {

  /**
   * @method dispatchIntention
   * @description Inyecta una intención en la matriz de ruteo con rastro forense branded.
   */
  dispatchIntention: (dispatchPayload: IIntentionDispatchPayload): void => {
    try {
      const validatedIntention = IntentionDispatchPayloadSchema.parse(dispatchPayload);

      // Resolución de TS2322 mediante Schema.parse()
      SovereignLogger.emit({
        severity: 'INFO',
        apparatusIdentifier: APPARATUS_ID,
        operationCode: OperationCodeSchema.parse('INTENTION_DISPATCHED'),
        semanticKey: 'NervousSystem.IntentionRouter.intentionDispatched',
        interpolationVariables: {
          intentionOpCode: validatedIntention.intentionOpCode.toString(),
          qosLevel: validatedIntention.qualityOfServiceTier.toString()
        }
      });

      intentionStream.publish(validatedIntention.intentionOpCode, validatedIntention);
    } catch (caughtError) {
      console.error('CRITICAL_INTENTION_DISPATCH_FAILURE', caughtError);
    }
  },

  /**
   * @method observeIntention
   */
  observeIntention: (targetOpCode: number): IObservableEmulator<IIntentionDispatchPayload> => {
    return intentionStream.createObservable(targetOpCode);
  },

  /**
   * @method broadcastReaction
   * @description Emite el snapshot de resultado hacia los suscriptores de superficie.
   */
  broadcastReaction: (reactionPayload: IReactionSnapshotPayload): void => {
    try {
      const validatedReaction = ReactionSnapshotPayloadSchema.parse(reactionPayload);

      // Inyección de rastro forense para reacciones (Sincronización de Bitácora)
      SovereignLogger.emit({
        severity: 'INFO',
        apparatusIdentifier: APPARATUS_ID,
        operationCode: OperationCodeSchema.parse('REACTION_BROADCASTED'),
        semanticKey: 'NervousSystem.IntentionRouter.reactionEmitted',
        forensicMetadata: {
          reactionOpCode: validatedReaction.reactionOpCode,
          latency: validatedReaction.executionLatencyInMilliseconds
        }
      });

      reactionStream.publish(validatedReaction.reactionOpCode, validatedReaction);
    } catch (caughtError) {
      console.error('CRITICAL_REACTION_BROADCAST_FAILURE', caughtError);
    }
  },

  /**
   * @method observeReaction
   */
  observeReaction: (reactionOpCode: number): IObservableEmulator<IReactionSnapshotPayload> => {
    return reactionStream.createObservable(reactionOpCode);
  }
} as const;
