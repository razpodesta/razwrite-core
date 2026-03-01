/**
 * @apparatus SentinelTetherDNA
 * @role Contratos genéticos para la transmisión forense y sellado de Materia Oscura.
 * @location libs/integrations/sentinel-tether/src/lib/tether-core/tether-core.schema.ts
 * @status <SEALED_PRODUCTION>
 * @version 1.1.0
 * @protocol OEDP-V8.5 Lattice
 */

import { z } from 'zod';

// Identificadores Nominales (Branding)
export const SentinelEndpointSchema = z.string().url().brand<'SentinelEndpoint'>();
export const OpaqueForensicPayloadSchema = z.string().brand<'OpaqueForensicPayload'>();
export const ForensicSignatureSchema = z.string().min(16).brand<'ForensicSignature'>();

/**
 * M-010: Cargamento de Transmisión Forense.
 */
export const ForensicTransmissionPacketSchema = z.object({
  opaqueForensicPayload: OpaqueForensicPayloadSchema,
  transmissionPriority: z.number().min(0).max(3),
  targetSentinelEndpoint: SentinelEndpointSchema,
  mutantPassportSignature: ForensicSignatureSchema,
  timestampUnix: z.number().int(),
}).readonly();

export type IForensicTransmissionPacket = z.infer<typeof ForensicTransmissionPacketSchema>;

// OpCodes de Operación para el rastro forense
export const SentinelOpCode = {
  BUNDLE_SHIPPED: 'SENTINEL_TETHER_BUNDLE_SHIPPED',
  TRANSMISSION_FAILED: 'SENTINEL_TETHER_TRANSMISSION_FAILED'
} as const;
