/**
 * @apparatus PersistenceBunker (NSK-VAULT)
 * @role Bóveda Tricameral de Memoria Cifrada y Resiliencia Offline.
 * @location libs/modular-units/persistence/README.md
 * @status <SEALED_PRODUCTION>
 * @version 8.6.1 Zenith Edition
 * @protocol OEDP-V8.5 Lattice
 * @iso 27001 (Data at Rest Encryption)
 */

# 💾 PERSISTENCE BUNKER

## 📜 DECLARACIÓN DE MISIÓN
El `PersistenceBunker` es la **Memoria a Largo Plazo** del RazWrite Core. Su misión es garantizar que el estado de la aplicación (Sesión, Carrito, Borradores) sobreviva a reinicios, cierres de pestaña y fallos de red, constituyendo la base del "Espejismo Offline" (M-035).

A diferencia de `localStorage` (síncrono, inseguro, limitado a 5MB), este búnker utiliza **IndexedDB** asíncrono con capacidad de gigabytes, protegiendo cada byte con cifrado **AES-GCM 256** antes de tocar el disco.

## 🧠 LÓGICA DE ÉLITE (ZENITH V8.5)

### 1. Arquitectura Tricameral
*   **L1 (Memoria RAM):** Mapa `Map<Key, Value>` de acceso instantáneo O(1). Es la primera capa de consulta.
*   **L2 (IndexedDB Cifrada):** Almacenamiento masivo persistente. Solo se accede si hay un "Miss" en L1 o para escribir.
*   **L3 (Cookie):** [Reservado] Redundancia mínima para recuperación de llaves de cifrado.

### 2. Escritura Atómica (Atomic Debounce)
Para evitar el desgaste del SSD y bloqueos de IO, las escrituras no van directo al disco. Se acumulan en un buffer y se descargan en ráfagas cada 500ms (`scheduleFlush`), optimizando el ciclo de vida del hardware.

### 3. Cifrado Soberano (Worker Offloading)
El proceso de cifrado (JSON -> String -> Buffer -> AES-GCM) es computacionalmente costoso. Este búnker delega esa tarea a `persistence.worker.ts`, asegurando que la UI nunca se congele mientras guarda datos.

### 4. Conexión Singleton
Implementa un patrón de conexión única persistente (`IdbAdapter`). Evita la sobrecarga de abrir/cerrar conexiones por cada operación, reduciendo la latencia de lectura/escritura de 50ms a <1ms.

## 🏗️ ANATOMÍA DE LEGO (M-008)

```text
libs/modular-units/persistence/src/
├── index.ts                        # LA PUERTA SELLADA
└── lib/
    └── persistence-core/
        ├── persistence.logic.ts    # EL CEREBRO: Gestión L1/L2 y Debounce
        ├── idb-adapter.logic.ts    # EL MOTOR: Driver Nativo Singleton
        ├── persistence.schema.ts   # EL ADN: Tipos Nominales
        └── persistence.worker.ts   # LA FORJA: Cifrado Asíncrono
🛠️ PROTOCOLO DE CONSUMO (M-010)
code
TypeScript
import { PersistenceBunker } from '@razwritecore/nsk-unit-persistence';

// 1. Ignición (Al inicio de la App)
// Requiere entropía (usualmente del IdentityMutant) para desbloquear la llave maestra.
await PersistenceBunker.igniteVault('user-entropy-seed-v1');

// 2. Guardado (Fire & Forget)
// Se escribe en L1 inmediatamente y se programa para L2.
PersistenceBunker.save('USER_PREFERENCES', { theme: 'dark', language: 'es' });

// 3. Recuperación
// Retorna Promise porque puede tener que ir al disco (L2).
const prefs = await PersistenceBunker.retrieve('USER_PREFERENCES');

---

