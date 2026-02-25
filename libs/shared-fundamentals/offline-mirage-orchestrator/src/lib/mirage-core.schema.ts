/**
 * @apparatus OfflineMirageDNA
 * @role Contratos genéticos para la gestión de estados de red y realidad sintética.
 * @location libs/shared-fundamentals/offline-mirage-orchestrator/src/lib/mirage-core.schema.ts
 * @status <SEALED_PRODUCTION>
 * @version 1.0.0
 * @protocol OEDP-V8.5 Lattice
 */

import { z } from 'zod';

/**
 * M-035: Definición de la Ilusión de Conectividad.
 */
export const ConnectivityMirageStateSchema = z.enum([
  'REALITY_LIVE',      // Conexión estable con la Bóveda Cloud.
  'MIRAGE_ACTIVE',     // Offline detectado, sirviendo desde L2 Cache.
  'SYNCHRONIZING',     // Red restaurada, volcando intenciones acumuladas.
  'DEGRADED_SYNC'      // Latencia alta, priorizando QoS 0.
]).brand<'ConnectivityMirageState'>();

export type IConnectivityMirageState = z.infer<typeof ConnectivityMirageStateSchema>;

/**
 * Registro de Intención Offline para reconexión.
 */
export const OfflineIntentSchema = z.object({
  intentIdentifier: z.string().uuid(),
  operationOpCode: z.number().int(),
  informationPayload: z.unknown(),
  capturedAt: z.number().int(),
  priorityQoS: z.number().int().min(0).max(3),
}).readonly();

export type IOfflineIntent = z.infer<typeof OfflineIntentSchema>;
