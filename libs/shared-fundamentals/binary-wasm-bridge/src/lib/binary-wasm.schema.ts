/**
 * @apparatus BinaryWasmDNA
 * @role Contratos genéticos para la carga de módulos binarios y estados de ejecución.
 * @location libs/shared-fundamentals/binary-wasm-bridge/src/lib/binary-wasm.schema.ts
 * @status <SEALED_PRODUCTION>
 * @version 1.0.0
 * @protocol OEDP-V8.5 Lattice
 */

import { z } from 'zod';

export const WasmModuleIdentifierSchema = z.string().min(3).brand<'WasmModuleIdentifier'>();
export type IWasmModuleIdentifier = z.infer<typeof WasmModuleIdentifierSchema>;

export const BinaryLoadStateSchema = z.enum([
  'PENDING_DOWNLOAD',
  'COMPILING',
  'READY_FOR_EXECUTION',
  'INSTANTIATION_ERROR'
]);

/**
 * M-017: Definición de la respuesta de carga del puente binario.
 */
export const BinaryBridgeResponseSchema = z.object({
  moduleIdentifier: WasmModuleIdentifierSchema,
  status: BinaryLoadStateSchema,
  memoryConsumptionBytes: z.number().int().nonnegative(),
  timestampUnix: z.number().int(),
}).readonly();

export type IBinaryBridgeResponse = z.infer<typeof BinaryBridgeResponseSchema>;
