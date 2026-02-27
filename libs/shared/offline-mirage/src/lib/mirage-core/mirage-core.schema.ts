/**
 * @apparatus OfflineMirageDNA
 * @role Especificación genética para la gestión de estados de desconexión y colas de resiliencia.
 * @location libs/shared/offline-mirage/src/lib/mirage-core/mirage-core.schema.ts
 * @status <STABILIZED>
 * @version 1.0.0
 * @protocol OEDP-V8.5 Lattice
 * @structure ADN
 * @compliance ISO_25010
 */

import { z } from 'zod';

/**
 * @section ESTADOS DEL ESPEJO
 */
export const MirageStatusSchema = z.enum([
  'REALITY_SYNCED',    // Online y Sincronizado
  'MIRAGE_ACTIVE',     // Offline, proyectando desde L2
  'RECONCILIATION',    // Recuperando red, vaciando colas
]).brand<'MirageStatus'>();

/**
 * @section CONTRATO DE INTENCIÓN DIFERIDA
 */
export const DeferredIntentionSchema = z.object({
  intentionId: z.string().uuid(),
  timestamp: z.number().int(),
  intentOpCode: z.number().int(),
  serializedPayload: z.string().describe('Payload cifrado listo para L2.'),
  priority: z.number().min(0).max(3),
}).readonly();

/**
 * @section INFERENCIAS SOBERANAS
 */
export type IMirageStatus = z.infer<typeof MirageStatusSchema>;
export type IDeferredIntention = z.infer<typeof DeferredIntentionSchema>;
