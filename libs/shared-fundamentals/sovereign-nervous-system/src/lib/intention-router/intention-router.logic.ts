/**
 * @apparatus IntentionRouterLogic
 * @role Bus de eventos masivo nativo. Clasifica y enruta intenciones con latencia cero.
 * @location libs/shared-fundamentals/sovereign-nervous-system/src/lib/intention-router/intention-router.logic.ts
 * @status <SEALED_PRODUCTION>
 * @version 8.6.0
 * @protocol OEDP-V8.5 Lattice
 */

import { SovereignLogger } from '@razwritecore/nsk-shared-logger';
import { 
  type IIntentionDispatchPayload, 
  type IReactionSnapshotPayload,
  IntentionDispatchPayloadSchema,
  ReactionSnapshotPayloadSchema
} from './intention-router.schema';

/**
 * @context_prompt [LIA Legacy - AI-Audit]
 * DIRECTIVA: Reemplazo de RxJS por Motor Pub/Sub Nativo Isomórfico (O(1) Routing).
 * JUSTIFICACIÓN: Eliminar la dependencia de RxJS reduce el peso del bundle inicial en ~40kb, 
 * habilitando el cumplimiento estricto de la doctrina "Offline Mirage" (M-035). Además, el ruteo 
 * directo mediante `Map` O(1) elimina el costo de evaluación lineal del operador `filter` de RxJS, 
 * maximizando la performance en ráfagas de telemetría (QoS 3).
 * IMPACTO: El sistema nervioso ahora tiene dependencias cero. Se expone un emulador estructural 
 * para que el consumidor siga utilizando `.subscribe()` sin alterar el contrato visual de los búnkeres.
 */

type ISubscriptionCallback<TPayload> = (payload: TPayload) => void;

interface ISovereignSubscription {
  unsubscribe: () => void;
}

interface IObservableEmulator<TPayload> {
  subscribe: (callback: ISubscriptionCallback<TPayload>) => ISovereignSubscription;
}

/**
 * Motor Interno de Transmisión Cuántica (Zero-Dependency)
 */
class SovereignStream<TPayload> {
  private listenerMatrix = new Map<number, Set<ISubscriptionCallback<TPayload>>>();

  public publish(targetOpCode: number, payload: TPayload): void {
    const activeListeners = this.listenerMatrix.get(targetOpCode);
    if (activeListeners) {
      activeListeners.forEach(callback => callback(payload));
    }
  }

  public createObservable(targetOpCode: number): IObservableEmulator<TPayload> {
    return {
      subscribe: (callback: ISubscriptionCallback<TPayload>): ISovereignSubscription => {
        if (!this.listenerMatrix.has(targetOpCode)) {
          this.listenerMatrix.set(targetOpCode, new Set());
        }
        
        this.listenerMatrix.get(targetOpCode)!.add(callback);

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

/**
 * Corrientes de Conciencia Nativas
 */
const intentionStream = new SovereignStream<IIntentionDispatchPayload>();
const reactionStream = new SovereignStream<IReactionSnapshotPayload>();

/**
 * @section FACHADA SOBERANA (M-010)
 */
export const SovereignNervousSystem = {
  
  /**
   * @method dispatchIntention
   * @description Dispara una intención al sistema nervioso para que sea procesada por el búnker correspondiente.
   */
  dispatchIntention: (dispatchPayload: IIntentionDispatchPayload): void => {
    // 1. Aduana de Bioseguridad
    const validatedIntention = IntentionDispatchPayloadSchema.parse(dispatchPayload);

    // 2. Rastro Forense Silencioso
    SovereignLogger.emit({
      severity: 'INFO',
      apparatusIdentifier: 'IntentionRouter',
      operationCode: 'INTENTION_DISPATCHED',
      semanticKey: 'SharedFundamentals.IntentionRouter.intentionDispatched',
      interpolationVariables: { 
        intentionOpCode: validatedIntention['intentionOpCode'], 
        qosLevel: validatedIntention['qualityOfServiceTier'] 
      }
    });

    // 3. Inyección en la matriz de ruteo O(1)
    intentionStream.publish(validatedIntention['intentionOpCode'], validatedIntention);
  },

  /**
   * @method observeIntention
   * @description Suscribe un búnker (o el Worker) para escuchar intenciones específicas (Emulación RxJS).
   */
  observeIntention: (targetOpCode: number): IObservableEmulator<IIntentionDispatchPayload> => {
    return intentionStream.createObservable(targetOpCode);
  },

  /**
   * @method broadcastReaction
   * @description El Worker o un Adaptador emite la reacción (resultado) de vuelta a la interfaz visual.
   */
  broadcastReaction: (reactionPayload: IReactionSnapshotPayload): void => {
    const validatedReaction = ReactionSnapshotPayloadSchema.parse(reactionPayload);
    reactionStream.publish(validatedReaction['reactionOpCode'], validatedReaction);
  },

  /**
   * @method observeReaction
   * @description La Interfaz Visual (Surface-Pulse) se suscribe a este método para actualizar sus píxeles.
   */
  observeReaction: (reactionOpCode: number): IObservableEmulator<IReactionSnapshotPayload> => {
    return reactionStream.createObservable(reactionOpCode);
  }
};