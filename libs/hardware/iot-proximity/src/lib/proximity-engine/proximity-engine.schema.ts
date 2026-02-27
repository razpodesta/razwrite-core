/**
 * @apparatus IotProximityDNA
 * @role Contratos genéticos para la comunicación con hardware IOT.
 * @location libs/hardware-refineries/iot-proximity/src/lib/iot-proximity.schema.ts
 * @status <SEALED_PRODUCTION>
 * @version 1.0.0
 * @protocol OEDP-V8.5 Lattice
 */

import { z } from 'zod';

export const ProximityProtocolSchema = z.enum(['NFC', 'BLE', 'ULTRA_WIDEBAND']);
export type IProximityProtocol = z.infer<typeof ProximityProtocolSchema>;

export const IotDeviceIdentifierSchema = z.string().min(8).brand<'IotDeviceIdentifier'>();
export type IIotDeviceIdentifier = z.infer<typeof IotDeviceIdentifierSchema>;

/**
 * Payload de proximidad refinado (Materia Oscura).
 */
export const ProximityInteractionPayloadSchema = z.object({
  protocolType: ProximityProtocolSchema,
  deviceIdentifier: IotDeviceIdentifierSchema,
  rawInformationPayload: z.instanceof(ArrayBuffer).optional(),
  signalStrengthDbm: z.number().int().negative().optional(),
  timestampUnix: z.number().int(),
}).readonly();

export type IProximityInteractionPayload = z.infer<typeof ProximityInteractionPayloadSchema>;
