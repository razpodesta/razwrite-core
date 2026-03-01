/**
 * @apparatus QuantumStateManagerLogic
 * @role Orquestador de la verdad inmutable, sincronización Zero-Copy y reactividad Signals.
 * @location libs/bunkers/quantum-state/src/lib/quantum-state-manager/quantum-state-manager.logic.ts
 * @status <SEALED_PRODUCTION>
 * @version 9.7.0
 * @protocol OEDP-V8.5 Lattice
 * @hilo Surface-Pulse | Deep-Pulse
 * @structure NEXO
 * @compliance ISO_27001 | ISO_25010
 */

import { signal, type Signal } from '@preact/signals-react';
import {
  SovereignLogger,
  ApparatusIdentifierSchema,
  OperationCodeSchema
} from '@razwritecore/nsk-shared-logger';
import { ErrorRefineryLogic, SystemErrorCodeSchema } from '@razwritecore/nsk-shared-error-engine';
import { MetabolicScheduler } from '@razwritecore/nsk-shared-metabolic-scheduler';
import {
  type IQuantumKey,
  type IStateEpochIdentifier,
  type IQuantumStateSnapshot,
  type ISharedBufferContract,
  QuantumStateSnapshotSchema,
  StateEpochIdentifierSchema
} from './quantum-state-manager.schema';
import { z } from 'zod';

/**
 * @section DIMENSIONES NOMINALES (M-005)
 * Identificadores de tipado estricto para el despacho de pulsos al Sistema Nervioso.
 */
type IApparatusIdentifier = z.infer<typeof ApparatusIdentifierSchema>;
type IOperationCode = z.infer<typeof OperationCodeSchema>;

/**
 * @section BÓVEDA DE SEÑALES Y BUFFERS (VOLATILE L1)
 * Gestión de memoria reactiva de alta frecuencia.
 */
const activeSignalsRegistry = new Map<IQuantumKey, Signal<unknown>>();
const sharedBuffersRegistry = new Map<IQuantumKey, ISharedBufferContract>();

// Identificador único de la línea de tiempo del estado actual
let currentSystemChronologicalEpoch: IStateEpochIdentifier = StateEpochIdentifierSchema.parse(crypto.randomUUID());

export const QuantumStateManagerLogic = {

  /**
   * @method igniteStateManager
   * @description Inicializa el gestor y establece la frontera cronológica del sistema.
   * @requirement M-003 (Apparatus Lifecycle)
   */
  igniteStateManager: (): void => {
    const ignitionStartTimeInMilliseconds = performance.now();

    currentSystemChronologicalEpoch = StateEpochIdentifierSchema.parse(crypto.randomUUID());

    SovereignLogger.emit({
      severity: 'INFO',
      apparatusIdentifier: 'QuantumStateManager' as unknown as IApparatusIdentifier,
      operationCode: 'STATE_MANAGER_IGNITED' as unknown as IOperationCode,
      semanticKey: 'QuantumStateCore.Lifecycle.IgnitionCompleted',
      executionLatencyInMilliseconds: performance.now() - ignitionStartTimeInMilliseconds,
      forensicMetadata: { activeEpochIdentifier: currentSystemChronologicalEpoch }
    });
  },

  /**
   * @method registerAtomicBranch
   * @description Crea una nueva rama de estado reactivo y vincula el control atómico si existe.
   * @requirement M-015-B (Zero-Copy Synchronization)
   */
  registerAtomicBranch: <T>(
    branchKey: IQuantumKey,
    initialStateValue: T,
    sharedMemoryContract?: ISharedBufferContract
  ): void => {
    if (activeSignalsRegistry.has(branchKey)) return;

    // 1. Registro de Señal Reactiva (Latencia Cero)
    activeSignalsRegistry.set(branchKey, signal(initialStateValue));

    // 2. Vinculación de Semaforización Atómica
    if (sharedMemoryContract) {
      sharedBuffersRegistry.set(branchKey, sharedMemoryContract);
    }

    SovereignLogger.emit({
      severity: 'INFO',
      apparatusIdentifier: 'QuantumStateManager' as unknown as IApparatusIdentifier,
      operationCode: 'BRANCH_REGISTERED' as unknown as IOperationCode,
      semanticKey: 'QuantumStateCore.Integrity.ValidationSuccess',
      forensicMetadata: {
        registeredBranchKey: branchKey,
        isSharedMemoryLinkActive: !!sharedMemoryContract
      }
    });
  },

  /**
   * @method mutateState
   * @description Ejecuta una mutación con protección de semáforo atómico en el metal.
   * @requirement ISO_27001 (Confidencialidad e Integridad)
   */
  mutateState: <T>(branchKey: IQuantumKey, nextStateValue: T): void => {
    const targetSignal = activeSignalsRegistry.get(branchKey);
    const sharedContract = sharedBuffersRegistry.get(branchKey);

    if (!targetSignal) {
      throw ErrorRefineryLogic.transmute({
        uniqueErrorCode: SystemErrorCodeSchema.parse('RWC-QST-4001'),
        severity: 'ERROR',
        apparatusIdentifier: 'QuantumStateManager',
        semanticKey: 'QuantumStateCore.Errors.AccessViolation',
        caughtError: new Error(`Atomic branch '${branchKey}' is unreachable in the current epoch.`)
      });
    }

    /**
     * @step Semaforización Atómica
     * Si la rama es compartida, notificamos al hardware el bloqueo de escritura.
     */
    if (sharedContract) {
      Atomics.store(sharedContract.atomicControlSet, 0, 1); // Modo: Escritura Protegida
      targetSignal.value = nextStateValue;
      Atomics.store(sharedContract.atomicControlSet, 0, 0); // Modo: Libre
    } else {
      targetSignal.value = nextStateValue;
    }
  },

  /**
   * @method getStateSignal
   * @description Retorna la señal reactiva para su proyección en la Interface Layer.
   * @returns Signal<T> - Evita ciclos de re-renderizado en React 19.
   */
  getStateSignal: <T>(branchKey: IQuantumKey): Signal<T> => {
    const targetSignal = activeSignalsRegistry.get(branchKey);

    if (!targetSignal) {
      throw new Error(`CRITICAL_STATE_ACCESS_VIOLATION: Branch '${branchKey}' is null.`);
    }

    return targetSignal as Signal<T>;
  },

  /**
   * @method getQuantumSnapshot
   * @description Captura una fotografía inmutable incluyendo el rastro metabólico.
   * @requirement ISO_25010 (Eficiencia de Desempeño)
   */
  getQuantumSnapshot: (branchKey: IQuantumKey): IQuantumStateSnapshot => {
    const targetSignal = activeSignalsRegistry.get(branchKey);

    // Sello corrección TS2724: Sincronización con MetabolicScheduler
    const currentMetabolicMode = MetabolicScheduler.getCurrentMode();

    return QuantumStateSnapshotSchema.parse({
      key: branchKey,
      value: targetSignal?.value,
      epoch: currentSystemChronologicalEpoch,
      lastMutationTimestampInMilliseconds: Date.now(),
      metabolicPressureAtMutation: currentMetabolicMode
    });
  }
} as const;
