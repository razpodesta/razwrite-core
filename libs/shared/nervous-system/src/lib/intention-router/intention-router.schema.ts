/**
 * @apparatus IntentionRouterDNA
 * @role Contratos genéticos para el enrutamiento de intenciones y priorización QoS.
 * @location libs/shared/nervous-system/src/lib/intention-router/intention-router.schema.ts
 * @status <STABILIZED>
 * @version 9.0.1
 * @protocol OEDP-V8.5 Lattice
 * @structure ADN
 */

import { z } from 'zod';
import {
  OperationOpCodeSchema,
  CompoundOpCodeSchema
} from '@razwritecore/nsk-shared-matrix-neural-bridge';

/**
 * @section GOBERNANZA DE CALIDAD DE SERVICIO (M-015)
 * 0 = VITAL (Seguridad, Pagos)
 * 1 = OPERATIONAL (Navegación, Renderizado)
 * 2 = RESILIENT (Sincronización de estado)
 * 3 = BEHAVIORAL (Telemetría, Micro-gestos)
 */
export const QualityOfServiceTierSchema = z.union([
  z.literal(0),
  z.literal(1),
  z.literal(2),
  z.literal(3)
]).brand<'QualityOfServiceTier'>();

export type IQualityOfServiceTier = z.infer<typeof QualityOfServiceTierSchema>;

/**
 * @section CARGAMENTO DE INTENCIÓN (M-010)
 * Contrato inmutable para el transporte de deseos de proceso.
 */
export const IntentionDispatchPayloadSchema = z.object({
  intentionOpCode: OperationOpCodeSchema,
  qualityOfServiceTier: QualityOfServiceTierSchema,
  informationPayload: z.unknown().optional().describe('Cargamento serializable asociado a la intención.'),
  targetApparatus: CompoundOpCodeSchema.optional().describe('Identificador del aparato destino específico.'),
}).readonly();

export type IIntentionDispatchPayload = z.infer<typeof IntentionDispatchPayloadSchema>;

/**
 * @section CARGAMENTO DE REACCIÓN (Respuesta del Sistema)
 * Snapshot del resultado de una intención procesada.
 */
export const ReactionSnapshotPayloadSchema = z.object({
  reactionOpCode: OperationOpCodeSchema,
  originOpCode: CompoundOpCodeSchema,
  reactionInformation: z.unknown().optional().describe('Respuesta procesada por el aparato destino.'),
  executionLatencyInMilliseconds: z.number().nonnegative(),
}).readonly();

export type IReactionSnapshotPayload = z.infer<typeof ReactionSnapshotPayloadSchema>;

/**
 * @section INTERFACES DE EMULACIÓN (M-035)
 * Tipos necesarios para el motor Pub/Sub nativo sin dependencias de RxJS.
 */
export type ISubscriptionCallback<TPayload> = (payload: TPayload) => void;

export interface ISovereignSubscription {
  unsubscribe: () => void;
}

export interface IObservableEmulator<TPayload> {
  subscribe: (callback: ISubscriptionCallback<TPayload>) => ISovereignSubscription;
}
