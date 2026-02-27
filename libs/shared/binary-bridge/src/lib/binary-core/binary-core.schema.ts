/**
 * @apparatus BinaryBridgeDNA
 * @role Especificación genética para la carga y ejecución de módulos WebAssembly.
 * @location libs/shared/binary-bridge/src/lib/binary-core/binary-core.schema.ts
 * @status <STABILIZED>
 * @version 1.0.0
 * @protocol OEDP-V8.5 Lattice
 * @structure ADN
 */

import { z } from 'zod';

/**
 * @section DIMENSIONES NOMINALES (M-005)
 */
export const BinaryModuleIdentifierSchema = z.string().min(4).brand<'BinaryModuleIdentifier'>();

/**
 * @section CARGAMENTO DE IGNICIÓN (M-010)
 */
export const BinaryIgnitionInputSchema = z.object({
  moduleIdentifier: BinaryModuleIdentifierSchema,
  webAssemblyResourceLocation: z.string().url().describe('Localización física del binario .wasm'),
  enableSharedMemory: z.boolean().default(true),
}).readonly();

/**
 * @section CONTRATO DEL KERNEL (WORKER)
 */
export interface IBinaryWorkerContract {
  loadWasm(webAssemblyUrl: string): Promise<void>;
  executeFunction(functionName: string, parameterCollection: unknown[]): Promise<unknown>;
}

/**
 * @section INFERENCIAS SOBERANAS
 */
export type IBinaryModuleIdentifier = z.infer<typeof BinaryModuleIdentifierSchema>;
export type IBinaryIgnitionInput = z.infer<typeof BinaryIgnitionInputSchema>;
