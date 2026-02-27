/**
 * @apparatus QuantumBridgeDNA
 * @role Especificación genética para la asignación y sincronización de memoria compartida.
 * @location libs/shared/nervous-system/src/lib/quantum-bridge/quantum-bridge.schema.ts
 * @status <STABILIZED>
 * @version 9.0.0
 * @protocol OEDP-V8.5 Lattice
 * @structure ADN
 */

import { z } from 'zod';

/**
 * @section DIMENSIONES NOMINALES (M-005)
 */
export const QuantumBufferIdentifierSchema = z.string().min(4).brand<'QuantumBufferIdentifier'>();

/**
 * @section CARGAMENTO DE ASIGNACIÓN
 */
export const BufferAllocationInputSchema = z.object({
  bufferIdentifier: QuantumBufferIdentifierSchema,
  byteLength: z.number().positive().max(10485760), // Límite de 10MB por segmento
}).readonly();

/**
 * @section INFERENCIAS SOBERANAS
 */
export type IQuantumBufferIdentifier = z.infer<typeof QuantumBufferIdentifierSchema>;
export type IBufferAllocationInput = z.infer<typeof BufferAllocationInputSchema>;

/**
 * @interface IQuantumBufferSnapshot
 * @description Referencia física a un segmento de memoria compartida.
 */
export interface IQuantumBufferSnapshot {
  readonly identifier: IQuantumBufferIdentifier;
  readonly sharedBuffer: SharedArrayBuffer;
  readonly atomicView: Int32Array;
}
