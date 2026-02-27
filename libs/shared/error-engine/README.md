/**
 * @apparatus SovereignErrorEngine (NSK-SHARED-ERROR)
 * @role Refinería Forense de Errores, Sanitización PII y Protocolos de Autocura.
 * @location libs/shared-fundamentals/error-engine/README.md
 * @status <SEALED_PRODUCTION>
 * @version 8.5.0 Zenith Edition
 * @protocol OEDP-V8.5 Lattice
 * @iso 27701 (Privacy Information Management)
 * @iso 25010 (Reliability & Maintainability)
 */

# 🛡️ SOVEREIGN ERROR ENGINE (LA REFINERÍA FORENSE)

## 📜 DECLARACIÓN DE MISIÓN
El `SovereignErrorEngine` es el **Sistema Inmunitario** del ecosistema RazWrite Core. Su misión es interceptar la *Entropía No Estructurada* (excepciones crudas de JavaScript, fallos de red, colapsos de promesas) y transmutarla en **Inteligencia Forense Estructurada**.

A diferencia de un manejador de errores tradicional, este aparato opera bajo el principio de **Bioseguridad de Datos (Privacy by Design)**. Garantiza que ningún fragmento de Información Personal Identificable (PII), token de autorización o ruta física del servidor se filtre hacia los registros de telemetría, cumpliendo estrictamente con la norma **ISO/IEC 27701**.

## 🧠 LÓGICA DE ÉLITE (ZENITH V8.5)

### 1. Sanitización Criptográfica (Scrubbing - Deep Pulse)
Antes de que un error abandone la frontera del búnker, el motor somete el *Stack Trace* y el *Payload* de memoria a un proceso de lavado profundo (`executeForensicScrubbing`). Utiliza una matriz de expresiones regulares de alta eficiencia para:
*   **Redacción de Secretos:** Detecta y reemplaza patrones de JWT (`eyJ...`), claves API y tarjetas de crédito con marcadores `[REDACTED]`.
*   **Ofuscación de Topología:** Elimina las rutas absolutas del sistema de archivos del servidor (ej: `/var/www/razwrite/...`), dejando solo rutas relativas seguras (`libs/bunkers/...`), impidiendo la ingeniería inversa de la infraestructura.

### 2. Neutralización del Dolor (Transmutación)
El motor captura el objeto `Error` nativo (caótico e impredecible) y lo encapsula dentro de una `SovereignErrorInstance`.
*   **Para el Usuario (Surface):** Se expone una clave semántica (`i18n`) amigable.
*   **Para el Sistema (Deep):** Se genera un rastro forense con el `CorrelationID` y el `TenantID` inyectados, permitiendo al **Neural Sentinel** reconstruir la escena del crimen sin exponer datos al cliente.

### 3. Integración Bitwise (Matrix Neural Bridge)
Abandona los códigos de error textuales en la capa de transmisión. Se integra con la **Matriz Neuronal** para asignar un `CompoundOpCode` (Int32) al evento, permitiendo una clasificación de severidad y origen a nivel de bits de velocidad extrema.

### 4. Protocolo de Autocura (Self-Healing Intent)
El paquete forense generado no solo reporta el pasado; dicta el futuro. Incluye un campo `recoveryActionIntent` que sugiere al **Sovereign Nervous System** qué medida tomar (ej: `RETRY_WITH_BACKOFF`, `PURGE_CACHE_L2`, `FORCE_LOGOUT`), cerrando el ciclo de resiliencia.

## 🏗️ ANATOMÍA DE LEGO (M-008)

```text
libs/shared-fundamentals/error-engine/src/
├── index.ts                        # LA PUERTA SELLADA (Fachada Opaca)
└── lib/
    ├── error-refinery.logic.ts     # EL NEXO: Orquestador de transmutación
    ├── error-refinery.schema.ts    # EL ADN: Contratos Zod y Tipos Nominales
    ├── error-refinery.worker.ts    # EL CEREBRO: Motor de Sanitización (Scrubbing)
    └── i18n/                       # EL ALMA: Mensajes de fallo sistémico
        ├── en-US.json
        ├── es-ES.json
        └── pt-BR.json
🛠️ PROTOCOLO DE CONSUMO (M-010)
El aparato expone la fachada SovereignErrorRefinery con un único método transmute. Este método debe ser invocado en los bloques catch de todos los búnkeres de negocio.
code
TypeScript
import { SovereignErrorRefinery } from '@razwritecore/nsk-shared-error-engine';

try {
  // Ejecución de lógica de riesgo (ej: Procesamiento de Identidad)
  await identityMutant.ignite();
} catch (caughtError) {
  // Transmutación inmediata. No se permite 'throw caughtError'.
  throw SovereignErrorRefinery.transmute({
    uniqueErrorCode: 'RWC-ID-5001', // Código Nominal Estricto
    severity: 'ERROR',
    apparatusIdentifier: 'IdentityMutantEngine',
    semanticKey: 'Identity.Errors.IgnitionFailed', // Clave i18n
    caughtError: caughtError,
    informationPayloadSnapshot: { 
      attemptCount: 3, 
      deviceMemory: '4GB' 
    }
    // Nota: El scrubbing automático limpiará cualquier PII en 'caughtError'
  });
}
🛡️ REGLAS DE SOBERANÍA IA
Cero Fugas: Está terminantemente prohibido imprimir o almacenar un Stack Trace crudo. Todo rastro debe pasar por executeForensicScrubbing.
Integridad de Tipos: El uniqueErrorCode debe seguir el patrón RWC-[DOMINIO]-[CODIGO] validado por Zod. No se aceptan strings arbitrarios.
Independencia de Capa: Este búnker reside en la Capa 0 (Shared Fundamentals). No puede importar lógica de negocio ni dependencias de UI. Solo depende del Logger y la Matrix.
Firma de Autoridad:
Raz Podestá - Arquitecto Jefe