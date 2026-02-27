/**
 * @apparatus QuantumBridgeLogic
 * @role Gestor de SharedArrayBuffer para comunicación Zero-Copy y sincronización atómica.
 * @location libs/shared/nervous-system/src/lib/quantum-bridge/quantum-bridge.logic.ts
 * @status <SEALED_PRODUCTION>
 * @version 9.0.0
 * @protocol OEDP-V8.5 Lattice
 * @hilo Surface-Pulse | Deep-Pulse
 * @structure NEXO
 * @compliance ISO_25010 | ISO_27001
 */

import { SovereignLogger, ApparatusIdentifierSchema, OperationCodeSchema } from '@razwritecore/nsk-shared-logger';
import {
  BufferAllocationInputSchema,
  type IQuantumBufferIdentifier,
  type IBufferAllocationInput,
  type IQuantumBufferSnapshot
} from './quantum-bridge.schema';

const APPARATUS_ID = ApparatusIdentifierSchema.parse('QuantumBridge');

/**
 * @section ALMACÉN DE MEMORIA (VOLATILE)
 * Registro de segmentos de memoria compartida activos.
 */
const SHARED_POOL = new Map<IQuantumBufferIdentifier, IQuantumBufferSnapshot>();

export const QuantumBridgeLogic = {
  /**
   * @method requestSharedBuffer
   * @description Asigna o recupera un SharedArrayBuffer para procesos de alta frecuencia.
   */
  requestSharedBuffer: (allocationInput: IBufferAllocationInput): IQuantumBufferSnapshot => {
    const validated = BufferAllocationInputSchema.parse(allocationInput);

    // 1. Verificación de Existencia (Reutilización de Segmento)
    const existingBuffer = SHARED_POOL.get(validated.bufferIdentifier);
    if (existingBuffer) return existingBuffer;

    // 2. Verificación de Compatibilidad de Hardware (ISO 25010)
    if (typeof globalThis.SharedArrayBuffer === 'undefined') {
      SovereignLogger.emit({
        severity: 'CRITICAL',
        apparatusIdentifier: APPARATUS_ID,
        operationCode: OperationCodeSchema.parse('HARDWARE_INCOMPATIBILITY'),
        semanticKey: 'NervousSystem.QuantumBridge.noSharedMemorySupport',
        forensicMetadata: { reason: 'Cross-Origin Isolation Missing' }
      });
      throw new Error('QUANTUM_BRIDGE_UNSUPPORTED_ENVIRONMENT');
    }

    // 3. Asignación de Memoria Atómica
    const sharedBuffer = new SharedArrayBuffer(validated.byteLength);
    const atomicView = new Int32Array(sharedBuffer);

    const snapshot: IQuantumBufferSnapshot = {
      identifier: validated.bufferIdentifier,
      sharedBuffer,
      atomicView
    };

    // 4. Registro y Sello
    SHARED_POOL.set(validated.bufferIdentifier, snapshot);

    SovereignLogger.emit({
      severity: 'INFO',
      apparatusIdentifier: APPARATUS_ID,
      operationCode: OperationCodeSchema.parse('BUFFER_ALLOCATED'),
      semanticKey: 'NervousSystem.QuantumBridge.allocationSuccess',
      forensicMetadata: {
        id: validated.bufferIdentifier,
        size: validated.byteLength
      }
    });

    return snapshot;
  },

  /**
   * @method secureWrite
   * @description Escritura protegida mediante Atomics para evitar condiciones de carrera.
   */
  secureWrite: (identifier: IQuantumBufferIdentifier, index: number, value: number): void => {
    const buffer = SHARED_POOL.get(identifier);
    if (buffer) {
      Atomics.store(buffer.atomicView, index, value);
      Atomics.notify(buffer.atomicView, index);
    }
  },

  /**
   * @method secureRead
   * @description Lectura sincronizada de la memoria compartida.
   */
  secureRead: (identifier: IQuantumBufferIdentifier, index: number): number => {
    const buffer = SHARED_POOL.get(identifier);
    return buffer ? Atomics.load(buffer.atomicView, index) : -1;
  }
} as const;
