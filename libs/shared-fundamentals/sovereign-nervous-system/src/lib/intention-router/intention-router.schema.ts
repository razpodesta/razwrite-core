/**
 * @apparatus IntentionRouterDNA
 * @role Contratos genéticos para el enrutamiento de intenciones y priorización QoS.
 * @location libs/shared-fundamentals/sovereign-nervous-system/src/lib/intention-router/intention-router.schema.ts
 * @status <SEALED_PRODUCTION>
 * @version 8.5.0
 * @protocol OEDP-V8.5 Lattice
 */

import { z } from 'zod';
import { CompoundOpCodeSchema, OperationOpCodeSchema } from '@razwritecore/nsk-shared-matrix-neural-bridge';

/**
 * M-015: Niveles de Calidad de Servicio (QoS).
 * 0 = VITAL (Identidad, Pagos)
 * 1 = OPERATIONAL (Navegación, Renderizado)
 * 2 = RESILIENT (Sincronización de estado)
 * 3 = BEHAVIORAL (Micro-gestos, telemetría)
 */
export const QualityOfServiceTierSchema = z.union([
  z.literal(0),
  z.literal(1),
  z.literal(2),
  z.literal(3)
]).brand<'QualityOfServiceTier'>();

export type IQualityOfServiceTier = z.infer<typeof QualityOfServiceTierSchema>;

/**
 * M-010: Cargamento Único de Intención (Payload)
 */
export const IntentionDispatchPayloadSchema = z.object({
  intentionOpCode: OperationOpCodeSchema,
  qualityOfServiceTier: QualityOfServiceTierSchema,
  informationPayload: z.unknown().optional().describe('Datos asociados a la intención. Deben ser serializables.'),
  targetApparatus: CompoundOpCodeSchema.optional().describe('Si está presente, la intención va dirigida a un búnker específico.'),
}).readonly();

export type IIntentionDispatchPayload = z.infer<typeof IntentionDispatchPayloadSchema>;

/**
 * M-010: Cargamento Único de Reacción (Respuesta del Sistema)
 */
export const ReactionSnapshotPayloadSchema = z.object({
  reactionOpCode: OperationOpCodeSchema,
  originOpCode: CompoundOpCodeSchema,
  reactionPayload: z.unknown().optional(),
  executionLatencyInMilliseconds: z.number().nonnegative(),
}).readonly();

export type IReactionSnapshotPayload = z.infer<typeof ReactionSnapshotPayloadSchema>;