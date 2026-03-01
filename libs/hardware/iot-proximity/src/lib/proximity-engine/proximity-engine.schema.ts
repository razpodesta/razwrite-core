/**
 * @apparatus ProximityEngineDNA
 * @role Contratos genéticos para la comunicación con hardware IOT (NFC/BLE).
 * @location libs/hardware/iot-proximity/src/lib/proximity-engine/proximity-engine.schema.ts
 * @status <STABILIZED>
 * @version 1.1.0
 * @protocol OEDP-V8.5 Lattice
 */

import { z } from 'zod';

// 1. Branding Nominal (M-005) - Erradicación de Primitivos
export const ProximityProtocolSchema = z.enum(['NFC', 'BLE', 'ULTRA_WIDEBAND']).brand<'ProximityProtocol'>();
export const IotDeviceIdentifierSchema = z.string().min(8).brand<'IotDeviceIdentifier'>();
export const ProximityTimestampSchema = z.number().int().positive().brand<'ProximityTimestamp'>();
export const ProximitySignalStrengthSchema = z.number().int().negative().brand<'ProximitySignalStrength'>();

// 2. Esquema de Cargamento de Interacción (Materia Oscura)
export const ProximityInteractionPayloadSchema = z.object({
  protocolType: ProximityProtocolSchema,
  deviceIdentifier: IotDeviceIdentifierSchema,
  // Limitamos el buffer a 32KB para proteger el Metabolic-Scheduler
  rawInformationPayload: z.instanceof(ArrayBuffer).optional(),
  signalStrengthDbm: ProximitySignalStrengthSchema.optional(),
  timestampUnix: ProximityTimestampSchema,
}).readonly();

// 3. Inferencia de Tipos Soberanos
export type IProximityProtocol = z.infer<typeof ProximityProtocolSchema>;
export type IIotDeviceIdentifier = z.infer<typeof IotDeviceIdentifierSchema>;
export type IProximityInteractionPayload = z.infer<typeof ProximityInteractionPayloadSchema>;
export type IProximityTimestamp = z.infer<typeof ProximityTimestampSchema>;

/**
 * @note Este ADN define la estructura de "Materia Oscura" que el
 * ProximityEngine emitirá al Sovereign Nervous System tras un refinado exitoso.
 */
