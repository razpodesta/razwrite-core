/**
 * @apparatus MetabolicSchedulerDNA
 * @role Definición de estados energéticos, contratos de biosensores y permisos de ejecución.
 * @location libs/shared/metabolic-scheduler/src/lib/scheduler-core/scheduler-core.schema.ts
 * @status <STABILIZED>
 * @version 9.0.0
 * @protocol OEDP-V8.5 Lattice
 * @structure ADN
 * @compliance ISO_25010
 */

import { z } from 'zod';

/**
 * @section ESTADOS METABÓLICOS SOBERANOS (M-003)
 * PEAK: Máxima fidelidad (60fps).
 * BALANCED: Equilibrio térmico y energético.
 * ECO: Ahorro de batería. Reducción de telemetría no crítica.
 * HIBERNATE: Pestaña inactiva. Suspensión de hilos.
 * EMERGENCY: Recursos críticos (<15%). Solo QoS 0/1.
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
 * @section SNAPSHOT DE HARDWARE
 * Rastro físico capturado por los biosensores.
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
 * @section CARGAMENTO DE SOLICITUD
 */
export const ExecutionPermitRequestSchema = z.object({
  qualityOfServiceTier: z.number().int().min(0).max(3),
  estimatedComplexity: z.number().min(1).max(100).optional(),
}).readonly();

export type IExecutionPermitRequest = z.infer<typeof ExecutionPermitRequestSchema>;
