/**
 * @apparatus SentinelTetherDNA
 * @role Contratos genéticos para el empaquetado y envío de materia oscura forense.
 * @location libs/infrastructure-adapters/sentinel-forensic-tether/src/lib/tether-core.schema.ts
 * @status <SEALED_PRODUCTION>
 * @version 1.0.0
 * @protocol OEDP-V8.5 Lattice
 */

import { z } from 'zod';

/**
 * M-026: Definición del paquete de entrega al Sentinel.
 */
export const ForensicTransmissionPacketSchema = z.object({
  opaqueForensicPayload: z.string().describe('JWE Packet conteniendo el rastro forense.'),
  transmissionPriority: z.number().int().min(0).max(3),
  targetSentinelEndpoint: z.string().url(),
  mutantPassportSignature: z.string().describe('Firma HMAC para validación de origen.'),
  timestampUnix: z.number().int(),
}).readonly();

export type IForensicTransmissionPacket = z.infer<typeof ForensicTransmissionPacketSchema>;
