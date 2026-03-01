/**
 * @apparatus IndexedDbAdapterLogic
 * @role Driver de bajo nivel para la interacción atómica con el motor IndexedDB.
 * @location libs/bunkers/persistence/src/lib/persistence-core/indexed-db-adapter.logic.ts
 * @status <SEALED_PRODUCTION>
 * @version 9.6.0
 * @protocol OEDP-V8.5 Lattice
 * @hilo Deep-Pulse | Surface-Pulse
 * @structure ADAPTADOR
 * @compliance ISO_25010 | ISO_27001
 */

import {
  SovereignLogger,
  ApparatusIdentifierSchema,
  OperationCodeSchema
} from '@razwritecore/nsk-shared-logger';
import {
  ErrorRefineryLogic,
  SystemErrorCodeSchema
} from '@razwritecore/nsk-shared-error-engine';
import { z } from 'zod';

/**
 * @section CONFIGURACIÓN DEL METAL
 */
const DATABASE_NAME = 'RWC_VAULT_ZENITH';
const DATABASE_VERSION = 1;
const STORE_NAME = 'sovereign_artifacts';

/**
 * @section DIMENSIONES NOMINALES (M-005)
 */
type IApparatusIdentifier = z.infer<typeof ApparatusIdentifierSchema>;
type IOperationCode = z.infer<typeof OperationCodeSchema>;

// Memoria volátil para la gestión de túneles
let activeDatabaseConnection: IDBDatabase | null = null;
let connectionIgnitionPromise: Promise<IDBDatabase> | null = null;

export const IndexedDbAdapterLogic = {

  /**
   * @method igniteConnection
   * @description Abre el túnel hacia el metal garantizando un único Singleton (M-023).
   */
  igniteConnection: (): Promise<IDBDatabase> => {
    // 1. Verificación de Túnel Activo (L1)
    if (activeDatabaseConnection) return Promise.resolve(activeDatabaseConnection);

    // 2. Intercepción de Concurrencia (Anti-Race Condition)
    if (connectionIgnitionPromise) return connectionIgnitionPromise;

    // 3. Proceso de Apertura Física
    connectionIgnitionPromise = new Promise((resolve, reject) => {
      // Seguridad SSR: Evitar ejecución en entornos sin Storage API
      if (typeof indexedDB === 'undefined') {
        const caughtError = new Error('Environment does not support IndexedDB.');
        return reject(IndexedDbAdapterLogic.handleTerminalError(caughtError, 'RWC-PER-7001'));
      }

      const openRequest = indexedDB.open(DATABASE_NAME, DATABASE_VERSION);

      openRequest.onupgradeneeded = (event) => {
        const database = (event.target as IDBOpenDBRequest).result;
        if (!database.objectStoreNames.contains(STORE_NAME)) {
          // Creación de la Bóveda de Artefactos (Key-Value storage)
          database.createObjectStore(STORE_NAME, { keyPath: 'key' });
        }
      };

      openRequest.onsuccess = (event) => {
        activeDatabaseConnection = (event.target as IDBOpenDBRequest).result;

        // Protocolo de Auto-Limpieza (ISO 25010)
        activeDatabaseConnection.onclose = () => IndexedDbAdapterLogic.resetInternalState();
        activeDatabaseConnection.onversionchange = () => {
          activeDatabaseConnection?.close();
          IndexedDbAdapterLogic.resetInternalState();
        };

        resolve(activeDatabaseConnection);
      };

      openRequest.onerror = () => {
        IndexedDbAdapterLogic.resetInternalState();
        reject(IndexedDbAdapterLogic.handleTerminalError(openRequest.error, 'RWC-PER-7002'));
      };
    });

    return connectionIgnitionPromise;
  },

  /**
   * @method saveArtifact
   * @description Escritura atómica en la bóveda con medición de latencia.
   */
  saveArtifact: async (artifactPayload: unknown): Promise<void> => {
    const executionStartTime = performance.now();
    const database = await IndexedDbAdapterLogic.igniteConnection();

    return new Promise((resolve, reject) => {
      try {
        const transaction = database.transaction(STORE_NAME, 'readwrite');
        const store = transaction.objectStore(STORE_NAME);
        const request = store.put(artifactPayload);

        transaction.oncomplete = () => {
          SovereignLogger.emit({
            severity: 'INFO',
            apparatusIdentifier: 'IndexedDbAdapter' as unknown as IApparatusIdentifier,
            operationCode: 'STORAGE_WRITE_SUCCESS' as unknown as IOperationCode,
            semanticKey: 'Persistence.Infrastructure.WriteCompleted',
            executionLatencyInMilliseconds: performance.now() - executionStartTime
          });
          resolve();
        };

        transaction.onerror = () => reject(IndexedDbAdapterLogic.handleTerminalError(transaction.error, 'RWC-PER-7003'));
        request.onerror = () => reject(IndexedDbAdapterLogic.handleTerminalError(request.error, 'RWC-PER-7004'));

      } catch (caughtError) {
        IndexedDbAdapterLogic.resetInternalState();
        reject(IndexedDbAdapterLogic.handleTerminalError(caughtError, 'RWC-PER-7005'));
      }
    });
  },

  /**
   * @method retrieveArtifact
   * @description Lectura determinística desde el disco.
   */
  retrieveArtifact: async <T>(artifactKey: string): Promise<T | undefined> => {
    const executionStartTime = performance.now();
    const database = await IndexedDbAdapterLogic.igniteConnection();

    return new Promise((resolve, reject) => {
      try {
        const transaction = database.transaction(STORE_NAME, 'readonly');
        const store = transaction.objectStore(STORE_NAME);
        const request = store.get(artifactKey);

        request.onsuccess = () => {
          SovereignLogger.emit({
            severity: 'INFO',
            apparatusIdentifier: 'IndexedDbAdapter' as unknown as IApparatusIdentifier,
            operationCode: 'STORAGE_READ_SUCCESS' as unknown as IOperationCode,
            semanticKey: 'Persistence.Infrastructure.ReadCompleted',
            executionLatencyInMilliseconds: performance.now() - executionStartTime
          });
          resolve(request.result as T);
        };

        request.onerror = () => reject(IndexedDbAdapterLogic.handleTerminalError(request.error, 'RWC-PER-7006'));

      } catch (caughtError) {
        IndexedDbAdapterLogic.resetInternalState();
        reject(IndexedDbAdapterLogic.handleTerminalError(caughtError, 'RWC-PER-7007'));
      }
    });
  },

  /**
   * @method resetInternalState
   * @private
   */
  resetInternalState: (): void => {
    activeDatabaseConnection = null;
    connectionIgnitionPromise = null;
  },

  /**
   * @method handleTerminalError
   * @private
   */
  handleTerminalError: (caughtError: unknown, errorCode: string): Error => {
    return ErrorRefineryLogic.transmute({
      uniqueErrorCode: SystemErrorCodeSchema.parse(errorCode),
      severity: 'CRITICAL',
      apparatusIdentifier: 'IndexedDbAdapter',
      semanticKey: 'Persistence.Errors.InfrastructureFailure',
      caughtError
    });
  }
} as const;
