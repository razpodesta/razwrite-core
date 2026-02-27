/**
 * @apparatus PersistenceBunkerLogic
 * @role Orquestador de Memoria Tricameral y Multihilo Real.
 * @location libs/modular-units/persistence/src/lib/persistence-core/persistence.logic.ts
 * @status <SEALED_PRODUCTION>
 * @version 8.7.0
 * @protocol OEDP-V8.5 Lattice
 * @hilo Surface-Pulse
 */

import * as Comlink from 'comlink';
import { SovereignLogger } from '@razwritecore/nsk-shared-logger';
import { IdbAdapter } from './idb-adapter.logic';
import {
  PersistenceKeySchema,
  VaultArtifactSchema,
  type IPersistenceKey
} from './persistence.schema';
import type { IPersistenceRefinery } from './persistence.worker';

/**
 * @context_prompt [LIA Legacy - AI-Audit]
 * DIRECTIVA: Implementación de Web Worker Proxy (Comlink).
 * JUSTIFICACIÓN: Se reemplazó la importación síncrona por una instancia real de Web Worker.
 * Se utiliza `new URL(...)` para garantizar la compatibilidad con el servidor de desarrollo
 * de Next.js y las compilaciones de producción de Nx.
 * IMPACTO: La encriptación AES-GCM ocurre ahora en un hilo dedicado (Deep-Pulse), liberando
 * el hilo principal para mantener los 60fps constantes.
 */

// Memoria L1 (Instantánea)
const l1Cache = new Map<IPersistenceKey, unknown>();
const pendingWrites = new Map<IPersistenceKey, unknown>();
let debounceTimer: ReturnType<typeof setTimeout> | null = null;

// Referencia al Proxy del Worker (RPC)
let workerApi: Comlink.Remote<IPersistenceRefinery> | null = null;

export const PersistenceBunker = {

  /**
   * @method igniteVault
   * @description Inicializa el Worker, la criptografía y el túnel con L2.
   */
  igniteVault: async (entropy: string): Promise<void> => {
    try {
      if (typeof window === 'undefined') return;

      // 1. Ignición del Hilo Secundario (Deep-Pulse)
      const nativeWorker = new Worker(
        new URL('./persistence.worker.ts', import.meta.url),
        { type: 'module' }
      );
      workerApi = Comlink.wrap<IPersistenceRefinery>(nativeWorker);

      // 2. Desbloqueo de Bóveda mediante RPC
      await workerApi.igniteSecureSession(entropy);

      // 3. Precalentamiento de IndexedDB
      await IdbAdapter.openDb();

      SovereignLogger.buffer({
        severity: 'INFO',
        apparatusIdentifier: 'PersistenceBunker',
        operationCode: 'VAULT_IGNITED',
        semanticKey: 'ModularUnits.Persistence.vaultUnlocked',
        forensicMetadata: { threadingModel: 'COM_LINK_WORKER' }
      });
    } catch (caughtError) {
      SovereignLogger.emit({
        severity: 'CRITICAL',
        apparatusIdentifier: 'PersistenceBunker',
        operationCode: 'VAULT_IGNITION_FAILED',
        semanticKey: 'ModularUnits.Persistence.ignitionError',
        forensicMetadata: { error: String(caughtError) }
      });
    }
  },

  /**
   * @method save
   * @description Escritura optimista en L1 y encolado asíncrono para L2.
   */
  save: (key: string, value: unknown): void => {
    const validatedKey = PersistenceKeySchema.parse(key);
    l1Cache.set(validatedKey, value);
    pendingWrites.set(validatedKey, value);
    scheduleFlush();
  },

  /**
   * @method retrieve
   * @description Lectura prioritaria L1 -> L2.
   */
  retrieve: async <T>(key: string): Promise<T | null> => {
    const validatedKey = PersistenceKeySchema.parse(key);

    if (l1Cache.has(validatedKey)) {
      return l1Cache.get(validatedKey) as T;
    }

    if (!workerApi) return null;

    try {
      const rawArtifact = await IdbAdapter.get(validatedKey);
      if (!rawArtifact) return null;

      const validArtifact = VaultArtifactSchema.parse(rawArtifact);

      // Descifrado delegado al Worker (Deep-Pulse)
      const decrypted = await workerApi.restoreArtifact(validArtifact);

      l1Cache.set(validatedKey, decrypted);
      return decrypted as T;
    } catch (caughtError) {
      SovereignLogger.emit({
        severity: 'ERROR',
        apparatusIdentifier: 'PersistenceBunker',
        operationCode: 'READ_FAILURE',
        semanticKey: 'ModularUnits.Persistence.readError',
        forensicMetadata: { key: validatedKey, errorDetails: String(caughtError) }
      });
      return null;
    }
  }
};

/**
 * @internal Vaciado de Buffer de Escritura (Multihilo)
 */
function scheduleFlush() {
  if (debounceTimer) clearTimeout(debounceTimer);
  debounceTimer = setTimeout(async () => {
    if (pendingWrites.size === 0 || !workerApi) return;

    const batch = new Map(pendingWrites);
    pendingWrites.clear();

    for (const [key, value] of batch) {
      try {
        // Cifrado delegado al Worker (Deep-Pulse)
        const artifact = await workerApi.refineArtifact(key, value);
        await IdbAdapter.put(artifact);
      } catch (writeError) {
        console.error('RWC-PERSISTENCE-WRITE-FAIL', writeError);
      }
    }
  }, 500);
}
