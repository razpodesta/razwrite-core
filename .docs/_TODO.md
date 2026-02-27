# 🗺️ ROADMAP MAESTRO DE IMPLEMENTACIÓN (LATTICE V8.5)
**Estatus:** <FORGING_PENDING>
**Directiva:** Este documento rige la creación de cada Unidad Modular interna (Subdirectorios) dentro de los Workspaces ya proyectados. Cada ítem debe construirse utilizando la Penta-Estructura (M-008).

## 1. CAPA: SHARED FUNDAMENTALS (Los Cimientos)

### 📦 Workspace: `shared-crypto`
- [ ] `cipher-engine`: Implementación de AES-GCM 256 y Web Crypto API.
- [ ] `key-derivation`: Algoritmos KDF (PBKDF2/HKDF) usando entropía del dispositivo.
- [ ] `opaque-media-vault`: Fragmentación (Chunking) y cifrado de archivos multimedia/KYC.

### 📦 Workspace: `shared-nervous-system`
- [ ] `intention-router`: Córtex central de RxJS y priorización QoS (0 al 3).
- [ ] `silent-whisperer`: Orquestación de Service Workers para notificaciones en background.
- [ ] `quantum-bridge`: Gestión de `SharedArrayBuffer` y Atomics para sincronización Zero-Copy.

### 📦 Workspace: `shared-metabolic-scheduler`
- [ ] `metabolic-core`: Máquina de estados (PEAK, ECO, EMERGENCY) y Throttling de software.
- [ ] `viewport-observer`: Detección de visibilidad para hidratación perezosa (Lazy Hydration).

### 📦 Workspace: `shared-matrix-neural-bridge`
- [ ] `neural-bridge`: Diccionario O(1) de OpCodes bi-direccionales.
- [ ] `diagnostic-injector`: Túnel para recibir "Sombras de Diagnóstico" del Sentinel.

### 📦 Workspace: `shared-scene-projector` (Ex SDUI)
- [ ] `projector-core`: Motor de renderizado dinámico de React 19 (RSC + Client).
- [ ] `contract-resolver`: Analizador de suscripciones al SNS para búnkeres visuales.

### 📦 Workspace: `shared-offline-mirage` (Proyectado)
- [ ] `mirage-core`: Interceptor offline para servir recursos desde L2 (IndexedDB).

---

## 2. CAPA: EXTRACTION REFINERIES (El Hardware)

### 📦 Workspace: `hw-bio`
- [ ] `metabolic-sensor`: Extractor de estado de batería, RAM y calidad de red.
- [ ] `biometric-aduana`: Validador de WebAuthn y biometría local.

### 📦 Workspace: `hw-geo`
- [ ] `geographic-context`: Extracción truncada de coordenadas y geocodificación inversa.
- [ ] `geofence-enforcer`: Lógica de cumplimiento de jurisdicción (GDPR/LGPD limits).

### 📦 Workspace: `hw-motion`
- [ ] `kinetic-sensor`: Extracción de acelerómetro/giroscopio.
- [ ] `gesture-interpreter`: Transmutación de sacudidas/vibraciones en OpCodes conductuales.

### 📦 Workspace: `refinery-iot-proximity` (Proyectado)
- [ ] `nfc-bridge`: Lector de etiquetas de campo cercano.
- [ ] `ble-bridge`: Conexión de baja energía para terminales físicas.

---

## 3. CAPA: MODULAR UNITS (La Inteligencia)

### 📦 Workspace: `unit-identity-mutant`
- [ ] `identity-core`: Generador de NanoID y fórmula de pasaporte mutante (Worker).
- [ ] `roaming-handshake`: Lógica de derivación OpenID para salto entre inquilinos.
- [ ] `oblivion-engine`: Purgador criptográfico para cumplimiento del "Derecho al Olvido".

### 📦 Workspace: `unit-sync-osmosis`
- [ ] `osmosis-core`: Algoritmo de Presión de Datos y Delta-Refining (Worker).
- [ ] `adaptive-transport`: Selector dinámico (Fetch API, SendBeacon, Multiplex).

### 📦 Workspace: `unit-quantum-state`
- [ ] `atomic-state`: Gestor inmutable de la verdad en memoria compartida.
- [ ] `signal-broadcaster`: Emisor de `@preact/signals-react` para la interfaz visual.

### 📦 Workspace: `unit-identity-correlation` (Server/Acid-Pulse)
- [ ] `correlation-core`: Libro mayor secreto que une el Mutant ID con el PII real cifrado.

### 📦 Workspace: `unit-polymorphic-qr` (Proyectado)
- [ ] `qr-generator`: Renderizador WASM/Canvas de códigos físicos dinámicos.
- [ ] `quantum-response-router`: Inyector de intenciones cifradas en el Edge Middleware.

### 📦 Workspace: `unit-viral-incentive` (Proyectado)
- [ ] `referral-tree`: Atribución de invitaciones mediante firmas HMAC (Zero-Knowledge).

---

## 4. CAPA: INFRASTRUCTURE ADAPTERS (La Diplomacia)

### 📦 Workspace: `adapter-sentinel-tether`
- [ ] `sentinel-bridge`: Túnel exclusivo de envío de Materia Oscura hacia Hugging Face.

### 📦 Workspace: `adapter-financial-gateway`
- [ ] `stripe-bridge`: Interceptor opaco para procesamiento de tarjetas.
- [ ] `sovereign-ledger`: Contabilidad de partida doble interna para billeteras de inquilinos.


pnpm nx reset

pnpm nx g @nx/workspace:move --project @razwritecore/nsk-shared-logger --destination shared/logger
pnpm nx g @nx/workspace:move --project @razwritecore/nsk-shared-error-engine --destination shared/error-engine
pnpm nx g @nx/workspace:move --project @razwritecore/nsk-shared-nervous-system --destination shared/nervous-system
pnpm nx g @nx/workspace:move --project @razwritecore/nsk-shared-crypto --destination shared/crypto
pnpm nx g @nx/workspace:move --project @razwritecore/nsk-shared-matrix-neural-bridge --destination shared/matrix-neural-bridge
pnpm nx g @nx/workspace:move --project @razwritecore/nsk-shared-metabolic-scheduler --destination shared/metabolic-scheduler
pnpm nx g @nx/workspace:move --project @razwritecore/nsk-shared-atomic-scene-projector --destination shared/atomic-scene-projector
pnpm nx g @nx/workspace:move --project @razwritecore/nsk-shared-binary-bridge --destination shared/binary-bridge
pnpm nx g @nx/workspace:move --project @razwritecore/nsk-shared-offline-mirage --destination shared/offline-mirage
pnpm nx g @nx/workspace:move --project @razwritecore/nsk-shared-omniscience-analytics --destination shared/omniscience-analytics

pnpm nx g @nx/workspace:move --project @razwritecore/nsk-hw-bio --destination hardware/bio
pnpm nx g @nx/workspace:move --project @razwritecore/nsk-hw-geo --destination hardware/geo
pnpm nx g @nx/workspace:move --project @razwritecore/nsk-hw-motion --destination hardware/motion
pnpm nx g @nx/workspace:move --project @razwritecore/nsk-hw-iot-proximity --destination hardware/iot-proximity

---

## 🛠️ INFRAESTRUCTURA Y NIVELACIÓN FÍSICA (PENDIENTE)

### 🔴 BLOQUE A: Consolidación de Capa Zero (Shared)
- [ ] **Resolución de Bloqueo OS:** Forzar movimiento de `logger`, `matrix-neural-bridge` y `metabolic-scheduler` a `libs/shared/` (Requiere cierre de procesos Node/VSCode).
- [ ] **Higienización Total:** Eliminar carpetas raíz obsoletas: `libs/shared-fundamentals`, `libs/hardware-refineries`, `libs/modular-units` e `infrastructure-adapters`.
- [ ] **Sincronización de Referencias:** Actualizar todos los `tsconfig.lib.json` locales para que apunten a `../../../tsconfig.base.json` tras el cambio de profundidad de carpeta.

### 🟡 BLOQUE B: Atomización y Nivelación de Órganos (Biblioteca por Biblioteca)
*Nota: Cada tarea requiere un fresh snapshot previo.*
- [ ] **Bunker Identity:** Crear `identity-mutant.tsx` (Cuerpo) y definir `identity-mutant.contract.ts` (Pulso).
- [ ] **Bunker Persistence:** Nivelar i18n y sellar lógica de derivación de llaves.
- [ ] **Hardware Geo:** Corregir importación en `index.ts` y activar el `geo-refinery.worker.ts`.
- [ ] **Hardware Motion:** Forjar el contrato de suscripción para gestos cinéticos.
- [ ] **Integrations:** Nivelar los package.json de `financial-transaction` y `sentinel-tether` a la nueva ruta.

---

AUDITORÍA DE PROGRESO (_TODO.md vs REALIDAD)
Tras revisar el snapshot y nuestras acciones, este es el estado real del Roadmap:
🔴 BLOQUE A: Consolidación de Capa Zero (Shared)

Resolución de Bloqueo OS: Completado físicamente.

Higienización Total: Carpetas obsoletas eliminadas.

Sincronización de Referencias: tsconfig.base.json y eslint.config.mjs alineados.

Nivelación de Logger: COMPLETADO (Logic, Schema, Context, i18n).
🟡 BLOQUE B: Atomización y Nivelación de Órganos
Nota: Estamos trabajando librerías de Shared (Capa 0) hacia arriba.

shared/crypto: 🛠️ SIGUIENTE OBJETIVO (Pendiente nivelar clúster).

shared/nervous-system: Pendiente refactorización de lógica de Pub/Sub nativo.

shared/metabolic-scheduler: Pendiente limpieza de RxJS y debouncer de hardware.

shared/error-engine: Pendiente inyección de scrubbing PII.
🗺️ PLAN DE NIVELACIÓN LIBRERÍA POR LIBRERÍA (FASE 1: SHARED)
Nuestro algoritmo de refactorización seguirá este orden estricto para no romper contratos:
shared/crypto: Nivelaremos los 4 motores (cipher, encoding, hashing, key-forge) a la Penta-Estructura.
shared/matrix-neural-bridge: Sellaremos la ontología de OpCodes Bitwise.
shared/metabolic-scheduler: Implementaremos la máquina de estados de energía (ISO 25010).
shared/nervous-system: Consolidaremos el IntentionRouter sin dependencias pesadas.
shared/error-engine: Conectaremos la refinería forense con el rastro inalterable del Logger.
shared/atomic-scene-projector: Prepararemos el motor para recibir el ADN del Inquilino (SDUI).

---


