/**
 * @apparatus MetabolicSchedulerDNA
 * @role Definición de los estados energéticos y contratos de recursos.
 * @location libs/shared-fundamentals/metabolic-scheduler/src/lib/scheduler-core/scheduler.schema.ts
 * @status <SEALED_PRODUCTION>
 * @version 8.5.0
 * @protocol OEDP-V8.5 Lattice
 */

import { z } from 'zod';

/**
 * Estados Metabólicos Soberanos (M-003).
 * PEAK: Rendimiento máximo. Animaciones 60fps. Prefetching agresivo.
 * BALANCED: Comportamiento estándar.
 * ECO: Ahorro de energía. Animaciones reducidas. Sin prefetching.
 * HIBERNATE: Pestaña en segundo plano. Cese de polling. Solo WebSockets críticos.
 * EMERGENCY: Batería crítica (<10%). Solo funciones vitales (Pagos).
 */
export const MetabolicModeSchema = z.enum([
  'PEAK',
  'BALANCED',
  'ECO',
  'HIBERNATE',
  'EMERGENCY'
]);

export type IMetabolicMode = z.infer<typeof MetabolicModeSchema>;

/**
 * Snapshot del estado de recursos del hardware.
 */
export const ResourceSnapshotSchema = z.object({
  batteryLevel: z.number().min(0).max(1).optional(),
  isCharging: z.boolean().optional(),
  networkEffectiveType: z.enum(['slow-2g', '2g', '3g', '4g']).optional(),
  isDataSaverActive: z.boolean().optional(),
  deviceMemoryGB: z.number().optional(),
  hardwareConcurrency: z.number().optional(),
}).readonly();

export type IResourceSnapshot = z.infer<typeof ResourceSnapshotSchema>;

/**
 * Payload para solicitud de permiso de ejecución.
 */
export const ExecutionPermitRequestSchema = z.object({
  qualityOfServiceTier: z.number().int().min(0).max(3),
  estimatedComplexity: z.number().optional().describe('Estimación de costo computacional (1-100)'),
}).readonly();

export type IExecutionPermitRequest = z.infer<typeof ExecutionPermitRequestSchema>;