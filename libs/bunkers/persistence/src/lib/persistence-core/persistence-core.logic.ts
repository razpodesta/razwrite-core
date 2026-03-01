/**
 * @apparatus PersistenceCoreLogic
 * @role Orquestador de superficie para la Bóveda Tricameral (L1/L2/L3) y Proxy RPC.
 * @location libs/bunkers/persistence/src/lib/persistence-core/persistence-core.logic.ts
 * @status <SEALED_PRODUCTION>
 * @version 9.0.0
 * @protocol OEDP-V8.5 Lattice
 * @hilo Surface-Pulse
 * @structure NEXO
 * @compliance ISO_27001 | ISO_25010
 */

import * as Comlink from 'comlink';
import {
  SovereignLogger,
  ApparatusIdentifierSchema,
  OperationCodeSchema
} from '@razwritecore/nsk-shared-logger';
import { ErrorRefineryLogic, SystemErrorCodeSchema } from '@razwritecore/nsk-shared-error-engine';
import { IndexedDbAdapterLogic } from './indexed-db-adapter.logic';
import {
  VaultArtifactSchema,
  PersistenceWriteInputSchema,
  type IPersistenceKey,
  type IPersistenceWriteInput
} from './persistence-core.schema';
import type { IPersistenceCoreBrain } from './persistence-core.worker';
import { z } from 'zod';

/**
 * @section DIMENSIONES NOMINALES (M-005)
 */
type IApparatusIdentifier = z.infer<typeof ApparatusIdentifierSchema>;
type IOperationCode = z.infer<typeof OperationCodeSchema>;

/**
 * @section MEMORIA CALIENTE Y ESTADO RPC
 */
const activeL1Memory = new Map<IPersistenceKey, unknown>();
const pendingStorageBatch = new Map<IPersistenceKey, unknown>();
let storageFlushTimer: ReturnType<typeof setTimeout> | null = null;

// Referencia al Cerebro en el Hilo Profundo (Deep-Pulse)
let persistenceBrainProxy: Comlink.Remote<IPersistenceCoreBrain> | null = null;

export const PersistenceCoreLogic = {

  /**
   * @method ignitePersistenceVault
   * @description Inicializa el Worker, desbloquea el cifrado y precalienta el metal.
   * @requirement M-017 (Potencia Proyectada)
   */
  ignitePersistenceVault: async (entropySeedMaterial: string): Promise<void> => {
    const ignitionStartTime = performance.now();

    try {
      if (typeof window === 'undefined') return;

      // 1. Ignición del Hilo Secundario (RPC Proxy)
      const nativeWorker = new Worker(
        new URL('./persistence-core.worker.ts', import.meta.url),
        { type: 'module' }
      );
      persistenceBrainProxy = Comlink.wrap<IPersistenceCoreBrain>(nativeWorker);

      // 2. Desbloqueo Criptográfico de la Bóveda L2
      await persistenceBrainProxy.igniteSecureSession(entropySeedMaterial);

      // 3. Verificación de Conexión con el Metal
      await IndexedDbAdapterLogic.igniteConnection();

      SovereignLogger.emit({
        severity: 'INFO',
        apparatusIdentifier: 'PersistenceCore' as unknown as IApparatusIdentifier,
        operationCode: 'VAULT_IGNITED' as unknown as IOperationCode,
        semanticKey: 'Persistence.Grants.VaultUnlocked',
        executionLatencyInMilliseconds: performance.now() - ignitionStartTime,
        forensicMetadata: { protocol: 'RPC_COMLINK_AES_GCM' }
      });

    } catch (caughtError) {
      throw ErrorRefineryLogic.transmute({
        uniqueErrorCode: SystemErrorCodeSchema.parse('RWC-PER-5001'),
        severity: 'FATAL',
        apparatusIdentifier: 'PersistenceCore',
        semanticKey: 'Persistence.Errors.IgnitionFailed',
        caughtError
      });
    }
  },

  /**
   * @method saveInformation
   * @description Escritura optimista en L1 y planificación de sellado asíncrono para L2.
   * @requirement ISO_25010 (Eficiencia: Debounced Writes)
   */
  saveInformation: (requestPayload: IPersistenceWriteInput): void => {
    const validated = PersistenceWriteInputSchema.parse(requestPayload);

    // Sincronía L1 (Instantánea)
    activeL1Memory.set(validated.targetKey, validated.informationMaterial);

    // Encolado para L2 (Diferida)
    pendingStorageBatch.set(validated.targetKey, validated.informationMaterial);

    PersistenceCoreLogic.scheduleStorageFlush();
  },

  /**
   * @method retrieveInformation
   * @description Recuperación jerárquica de datos L1 -> L2.
   */
  retrieveInformation: async <T>(targetKey: IPersistenceKey): Promise<T | null> => {
    // 1. Prioridad L1 (Memoria Volátil < 1ms)
    if (activeL1Memory.has(targetKey)) {
      return activeL1Memory.get(targetKey) as T;
    }

    if (!persistenceBrainProxy) return null;

    try {
      // 2. Acceso a L2 (Disco Cifrado)
      const rawArtifact = await IndexedDbAdapterLogic.retrieveArtifact(targetKey);
      if (!rawArtifact) return null;

      const validatedArtifact = VaultArtifactSchema.parse(rawArtifact);

      // Descifrado delegado al Cerebro (Deep-Pulse)
      const decryptedData = await persistenceBrainProxy.restoreArtifact(validatedArtifact);

      // Hidratación de L1 para futuras peticiones
      activeL1Memory.set(targetKey, decryptedData);

      return decryptedData as T;

    } catch (caughtError) {
      SovereignLogger.emit({
        severity: 'ERROR',
        apparatusIdentifier: 'PersistenceCore' as unknown as IApparatusIdentifier,
        operationCode: 'READ_FAILURE' as unknown as IOperationCode,
        semanticKey: 'Persistence.Errors.ReadError',
        forensicMetadata: { key: targetKey, caughtError: String(caughtError) }
      });
      return null;
    }
  },

  /**
   * @method scheduleStorageFlush
   * @private
   * @description Coordina el vaciado del buffer de escritura hacia el hilo profundo.
   */
  scheduleStorageFlush: (): void => {
    if (storageFlushTimer) clearTimeout(storageFlushTimer);

    storageFlushTimer = setTimeout(async () => {
      if (pendingStorageBatch.size === 0 || !persistenceBrainProxy) return;

      const workingBatch = new Map(pendingStorageBatch);
      pendingStorageBatch.clear();

      for (const [key, material] of workingBatch) {
        try {
          // Delegación de Refinado (Cifrado + Integridad) al Worker
          const artifact = await persistenceBrainProxy.refineArtifact(key, material);

          // Persistencia en Disco
          await IndexedDbAdapterLogic.saveArtifact(artifact);

        } catch (caughtError) {
          SovereignLogger.emit({
            severity: 'CRITICAL',
            apparatusIdentifier: 'PersistenceCore' as unknown as IApparatusIdentifier,
            operationCode: 'BATCH_WRITE_FAILURE' as unknown as IOperationCode,
            semanticKey: 'Persistence.Errors.WriteError',
            forensicMetadata: { key, caughtError: String(caughtError) }
          });
        }
      }
    }, 500); // Ventana de agregación de 500ms (ISO 25010)
  }
} as const;
