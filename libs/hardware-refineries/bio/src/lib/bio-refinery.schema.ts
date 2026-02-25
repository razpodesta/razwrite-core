/**
 * @apparatus BioRefineryDNA
 * @role Contratos genéticos para el monitoreo de bio-energía y recursos de red.
 * @location libs/hardware-refineries/bio/src/lib/bio-refinery.schema.ts
 * @status <STABILIZED>
 * @version 1.0.0
 * @protocol OEDP-V8.5 Lattice
 */

import { z } from 'zod';

/**
 * Snapshot de la bio-energía del dispositivo.
 */
export const BatterySnapshotSchema = z.object({
  chargeLevelPercentage: z.number().min(0).max(100),
  isPowerPlugged: z.boolean(),
  estimatedTimeRemainingMinutes: z.number().nullable(),
}).readonly();

/**
 * Análisis de la capacidad de procesamiento y memoria.
 */
export const ResourceCapacitySchema = z.object({
  logicalCoreCount: z.number().int().positive(),
  availableMemoryGigabytes: z.number().positive().optional(),
  devicePerformanceTier: z.enum(['HIGH', 'MEDIUM', 'LOW']),
}).readonly();

/**
 * El Pulso Vital consolidado para el Scheduler.
 */
export const BioMetabolicPulseSchema = z.object({
  batterySnapshot: BatterySnapshotSchema,
  resourceCapacity: ResourceCapacitySchema,
  networkEffectiveType: z.enum(['slow-2g', '2g', '3g', '4g', 'offline']),
  timestampUnix: z.number().int(),
}).readonly();

export type IBatterySnapshot = z.infer<typeof BatterySnapshotSchema>;
export type IResourceCapacity = z.infer<typeof ResourceCapacitySchema>;
export type IBioMetabolicPulse = z.infer<typeof BioMetabolicPulseSchema>;
