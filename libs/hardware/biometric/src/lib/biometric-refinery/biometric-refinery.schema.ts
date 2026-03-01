/**
 * @apparatus BiometricRefineryDNA
 * @role Contrato genético para señales vitales del hardware y estado metabólico.
 * @location libs/hardware/biometric/src/lib/biometric-refinery/biometric-refinery.schema.ts
 * @protocol OEDP-V8.5 Lattice
 */

import { z } from 'zod';

// 1. Branding Nominal (M-005) - Erradicación de Primitivos
export const BatteryLevelPercentageSchema = z.number().min(0).max(100).brand<'BatteryLevelPercentage'>();
export const NetworkEffectiveTypeSchema = z.enum(['2g', '3g', '4g', 'slow-2g']).brand<'NetworkEffectiveType'>();
export const DevicePerformanceTierSchema = z.enum(['LOW', 'MEDIUM', 'HIGH', 'ULTRA']).brand<'DevicePerformanceTier'>();
export const TimestampUnixSchema = z.number().positive().brand<'TimestampUnix'>();

// Inferencia de Tipos Soberanos
export type IBatteryLevelPercentage = z.infer<typeof BatteryLevelPercentageSchema>;
export type INetworkEffectiveType = z.infer<typeof NetworkEffectiveTypeSchema>;
export type IDevicePerformanceTier = z.infer<typeof DevicePerformanceTierSchema>;
export type ITimestampUnix = z.infer<typeof TimestampUnixSchema>;

// 2. Esquemas de Cargamento Único (M-010)
export const BiometricMetabolicPulseSchema = z.object({
  batterySnapshot: z.object({
    chargeLevelPercentage: BatteryLevelPercentageSchema,
    isPowerPlugged: z.boolean(),
    estimatedTimeRemainingMinutes: z.number().nullable(),
  }),
  resourceCapacity: z.object({
    logicalCoreCount: z.number().min(1),
    availableMemoryGigabytes: z.number().positive(),
    devicePerformanceTier: DevicePerformanceTierSchema,
  }),
  networkEffectiveType: NetworkEffectiveTypeSchema,
  timestampUnix: TimestampUnixSchema,
}).readonly();

// Inferencia de la Estructura de Pulso
export type IBiometricMetabolicPulse = z.infer<typeof BiometricMetabolicPulseSchema>;
