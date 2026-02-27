/**
 * @apparatus SovereignLogger (NSK-SHARED-LOGGER)
 * @role Sistema Nervioso Periférico Isomórfico del RazWrite Core.
 * @location libs/shared-fundamentals/logger/README.md
 * @status <SEALED_PRODUCTION>
 * @version 8.5.0 Zenith Edition
 * @protocol OEDP-V8.5 Lattice
 * @iso 25010 (Mantenibilidad y Eficiencia)
 */

# 📡 SOVEREIGN LOGGER

## 📜 DECLARACIÓN DE MISIÓN
El `SovereignLogger` es la única entidad autorizada para emitir pulsos de existencia hacia el exterior del Kernel. Su misión es interceptar telemetría técnica y conductual, validarla contra el ADN Zod y transmutarla mediante el protocolo **Zenith Telemetry Matrix (ZTM)** utilizando el **Matrix Neural Bridge**.

A diferencia de un logger tradicional, este aparato es **Isomórfico y Consciente del Contexto**, capaz de operar en el servidor (Acid-Pulse), en el borde (Edge) y en el navegador (Surface-Pulse) sin fricción, garantizando que el rastro forense nunca se pierda.

## 🧠 LÓGICA DE ÉLITE (ZENITH V8.5)

### 1. Isomorfismo Atómico (Universal Context Injector)
El logger detecta el entorno de ejecución y adapta su estrategia de memoria para rastrear el `correlationIdentifier` y el `tenantIdentifier`:
*   **Acid-Pulse (Node/Server):** Utiliza `AsyncLocalStorage` para mantener el contexto a través de la pila de llamadas asíncronas.
*   **Surface-Pulse (Browser):** Ancla el contexto al objeto global (`globalThis`) para sobrevivir a los ciclos de re-renderizado de React 19 y a la navegación del cliente sin fugas de memoria.

### 2. Soberanía Semántica (i18n - M-007)
Queda estrictamente prohibido enviar mensajes de error "Hardcoded" (texto plano). El logger transmite una `semanticKey` (Ruta i18n). Esto reduce el payload de red y permite que el **Neural Sentinel** o el dashboard de administración traduzcan el evento al idioma del observador en tiempo real.

### 3. Hiper-Compresión ZTM
Integra el `MatrixNeuralBridge` para convertir identificadores de aparatos y operaciones en **OpCodes Bitwise (Int32)**, reduciendo el peso del log en un 60% comparado con JSON estándar.

### 4. Serialización Segura (Anti-Jitter)
Implementa un mecanismo de `JSON.stringify` defensivo que trunca objetos profundos y maneja referencias circulares, asegurando que un log masivo nunca bloquee el hilo principal (Main Thread) ni cause caídas de FPS en la interfaz.

## 🏗️ ANATOMÍA DE LEGO (M-008)

```text
libs/shared-fundamentals/logger/src/
├── index.ts                        # LA PUERTA SELLADA (Fachada Opaca)
└── lib/
    ├── sovereign-logger.logic.ts   # EL CEREBRO: Interceptor y despachador
    ├── sovereign-logger.schema.ts  # EL ADN: Contratos Zod y Tipos Nominales
    ├── sovereign-context.logic.ts  # EL ADAPTADOR: Memoria Isomórfica
    └── i18n/                       # EL ALMA: Diccionarios de mensajes técnicos
        ├── en-US.json
        ├── es-ES.json
        └── pt-BR.json
🛠️ PROTOCOLO DE CONSUMO (M-010)
El aparato expone un único método estático emit que recibe un Cargamento Único (Payload Object).
code
TypeScript
import { SovereignLogger } from '@razwritecore/nsk-shared-logger';

// Ejemplo de emisión de un pulso vital
SovereignLogger.emit({
  severity: 'INFO',
  apparatusIdentifier: 'IdentityEngine', // Debe coincidir con el registro en MatrixNeuralBridge
  operationCode: 'SYSTEM_IGNITED',       // Debe existir en la ontología ZTM
  semanticKey: 'IdentityEngine.Auth.LoginSuccess',
  interpolationVariables: { 
    userName: 'Raz',
    sessionType: 'Sovereign' 
  },
  forensicMetadata: { 
    networkType: '4G',
    batteryLevel: 0.85 
  }
});
🛡️ REGLAS DE SOBERANÍA IA
Prohibición de console.log: El uso de la consola nativa está vetado. Solo el SovereignLogger puede escribir en stdout/stderr.
Cero Abreviaciones: Los metadatos forenses deben usar claves descriptivas completas (executionLatencyInMilliseconds, no lat).
Failsafe de Emergencia: Si el logger falla internamente (ej. error de Zod), debe capturar su propia excepción y emitir un console.error de emergencia con el prefijo CRITICAL_LOGGER_OMISSION para no detener la ejecución del programa principal.
Firma de Autoridad:
Raz Podestá - Arquitecto Jefe

---

