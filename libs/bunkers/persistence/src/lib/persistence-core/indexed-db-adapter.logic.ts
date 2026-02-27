/**
 * @apparatus IndexedDbAdapter
 * @role Driver nativo de bajo nivel para IndexedDB con gestión de conexión Singleton.
 * @location libs/modular-units/persistence/src/lib/persistence-core/idb-adapter.logic.ts
 * @status <SEALED_PRODUCTION>
 * @version 8.6.1
 */

const DB_NAME = 'RWC_VAULT_V1';
const STORE_NAME = 'sovereign_store';

// Memoria estática para el Singleton de conexión
let activeDbConnection: IDBDatabase | null = null;
let connectionPromise: Promise<IDBDatabase> | null = null;

export const IdbAdapter = {
  
  /**
   * @method openDb
   * @description Abre la conexión una sola vez y la reutiliza (Singleton Pattern).
   * Maneja concurrencia de llamadas iniciales mediante Promesa en Vuelo.
   */
  openDb: (): Promise<IDBDatabase> => {
    // 1. Si ya hay conexión activa, retornarla inmediatamente (O(1))
    if (activeDbConnection) {
      return Promise.resolve(activeDbConnection);
    }

    // 2. Si ya se está abriendo, esperar a esa misma promesa (Anti-Race Condition)
    if (connectionPromise) {
      return connectionPromise;
    }

    // 3. Iniciar apertura física
    connectionPromise = new Promise((resolve, reject) => {
      if (typeof indexedDB === 'undefined') {
        reject(new Error('RWC-IDB-UNSUPPORTED: Entorno sin persistencia nativa.'));
        return;
      }

      const request = indexedDB.open(DB_NAME, 1);
      
      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME, { keyPath: 'key' });
        }
      };

      request.onsuccess = (event) => {
        activeDbConnection = (event.target as IDBOpenDBRequest).result;
        
        // Listener de cierre inesperado (para limpiar el singleton)
        activeDbConnection.onclose = () => {
          activeDbConnection = null;
          connectionPromise = null;
        };

        // Listener de cambio de versión (otra pestaña actualizó la DB)
        activeDbConnection.onversionchange = () => {
          activeDbConnection?.close();
          activeDbConnection = null;
          connectionPromise = null;
        };

        resolve(activeDbConnection);
      };

      request.onerror = () => {
        activeDbConnection = null;
        connectionPromise = null;
        reject(request.error);
      };
    });

    return connectionPromise;
  },

  /**
   * @method put
   * @description Escritura atómica reutilizando el túnel abierto.
   */
  put: async (item: unknown): Promise<void> => {
    const db = await IdbAdapter.openDb();
    return new Promise((resolve, reject) => {
      try {
        const tx = db.transaction(STORE_NAME, 'readwrite');
        const store = tx.objectStore(STORE_NAME);
        const request = store.put(item);
        
        tx.oncomplete = () => resolve();
        tx.onerror = () => reject(tx.error);
        request.onerror = () => reject(request.error);
      } catch (error) {
        // Recuperación de conexión perdida
        activeDbConnection = null;
        connectionPromise = null;
        reject(error);
      }
    });
  },

  /**
   * @method get
   * @description Lectura atómica reutilizando el túnel abierto.
   */
  get: async <T>(key: string): Promise<T | undefined> => {
    const db = await IdbAdapter.openDb();
    return new Promise((resolve, reject) => {
      try {
        const tx = db.transaction(STORE_NAME, 'readonly');
        const store = tx.objectStore(STORE_NAME);
        const request = store.get(key);
        
        request.onsuccess = () => resolve(request.result as T);
        request.onerror = () => reject(request.error);
      } catch (error) {
        activeDbConnection = null;
        connectionPromise = null;
        reject(error);
      }
    });
  }
};