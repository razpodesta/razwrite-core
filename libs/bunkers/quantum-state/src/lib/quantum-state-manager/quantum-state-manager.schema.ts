/**
 * @apparatus QuantumStateCoreDNA
 * @role Contratos genéticos para la memoria compartida, señales reactivas y bioseguridad de estado.
 * @location libs/bunkers/quantum-state/src/lib/quantum-state-manager/quantum-state-manager.schema.ts
 * @status <SEALED_PRODUCTION>
 * @version 9.5.1
 * @protocol OEDP-V8.5 Lattice
 * @structure ADN
 * @compliance ISO_27001 | ISO_25010
 */

import { z } from 'zod';

/**
 * @section DIMENSIONES NOMINALES (M-005)
 * Identificadores sellados para la topología de la memoria cuántica.
 */
export const QuantumKeySchema = z.string()
  .min(3)
  .regex(/^[A-Z0-9_]+$/)
  .describe('Clave de acceso a la rama de estado (UPPER_SNAKE_CASE).')
  .brand<'QuantumKey'>();

export const StateEpochIdentifierSchema = z.string()
  .uuid()
  .describe('Identificador único del ciclo de vida del estado actual.')
  .brand<'StateEpochIdentifier'>();

/**
 * @section CONTRATO DE MEMORIA COMPARTIDA (M-015-B)
 * Definición técnica del buffer físico para telemetría de alta frecuencia.
 */
export const SharedBufferContractSchema = z.object({
  bufferReference: z.instanceof(SharedArrayBuffer),
  byteOffset: z.number().int().nonnegative(),
  capacityBytes: z.number().int().positive(),
  atomicControlSet: z.instanceof(Int32Array).describe('Semaforización atómica para control de hilos.'),
}).readonly();

/**
 * @section CARGAMENTO DE ESTADO (M-010)
 * Snapshot inmutable de una rama de la realidad del sistema.
 */
export const QuantumStateSnapshotSchema = z.object({
  key: QuantumKeySchema,
  value: z.unknown().describe('Datos puros contenidos en la rama.'),
  epoch: StateEpochIdentifierSchema,
  lastMutationTimestampInMilliseconds: z.number().nonnegative(),
  metabolicPressureAtMutation: z.enum(['PEAK', 'ECO', 'EMERGENCY']).optional(),
}).readonly();

/**
 * @section INFERENCIAS SOBERANAS
 */
export type IQuantumKey = z.infer<typeof QuantumKeySchema>;
export type IStateEpochIdentifier = z.infer<typeof StateEpochIdentifierSchema>;
export type ISharedBufferContract = z.infer<typeof SharedBufferContractSchema>;
export type IQuantumStateSnapshot = z.infer<typeof QuantumStateSnapshotSchema>;
