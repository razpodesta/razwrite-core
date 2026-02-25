# 📓 BITÁCORA DE DESARROLLO: RAZWRITE CORE (RWC)

**Protocolo:** OEDP-V8.0 Zenith
**Arquitecto Jefe:** Raz Podestá

## 📜 PROTOCOLO DE INSERCIÓN Y USO

Esta bitácora es el **Registro Akáshico** del proyecto. No documenta "qué" código se escribió (para eso está Git), sino **"por qué"** se tomaron las decisiones arquitectónicas.

- **Regla 1:** Toda sesión de refactorización mayor, cambio de paradigma o adopción de nueva tecnología debe registrarse aquí.
- **Regla 2:** Formato obligatorio: ` - HITO XXX:`.
- **Regla 3:** Se debe incluir la "Lógica Implementada" y el "Razonamiento (Rationale)".

---

## - HITO 001: LA SINGULARIDAD (DE PORTAL A OS)

**Autor:** Raz Podestá

### 1. Evolución del Proyecto

El proyecto ha evolucionado de ser una plataforma específica ("English Web Portal") a convertirse en el **RazWrite Core (RWC)**. RWC no es una aplicación, es un **Sistema Operativo Base (Boilerplate de Élite)**. Es un motor hiper-escalable, modular y agnóstico, capaz de desplegar cualquier modelo de negocio (Educación, SaaS, E-commerce) mediante el ensamblaje de "Búnkeres" (Workspaces). El portal de inglés será simplemente la `App 01` consumiendo este Core. Los alias del monorepo migrarán a `@razwritecore/*`.

### 2. Cambio de Paradigma de Infraestructura (Escape de Vercel)

Se determinó que los límites del Free Tier de Vercel (50MB por función, 10s timeout) asfixiarían el acoplamiento de Next.js + Payload CMS 3.0 + Drizzle.

- **Front-End y CMS:** Migran a **Oracle Cloud (Always Free)**. Utilizaremos una instancia ARM de 4 vCPUs y 24GB de RAM gestionada mediante **Coolify**. Esto otorga soberanía absoluta, cero latencia y recursos masivos sin coste.
- **Inteligencia Artificial (Neural Sentinel):** El auditor de procesos y auto-sanación se desacopla del hilo principal y migra a **Hugging Face Docker Spaces** (16GB RAM / 2 vCPU gratis), operando como un Event Bus asíncrono que no bloquea la experiencia del usuario.

### 3. Decisiones Estructurales Implementadas

- **Tríada Atómica (Búnkeres):** Cada funcionalidad exige un Cuerpo (`.ts`), un ADN (`.schema.ts` - Zod V4) y un Alma (`i18n/`).
- **Zero-Any y Tipado Nominal:** Prohibición del tipo `any` y obsesión por primitivos. Todo ID o dato clave usa `Zod .brand()`.
- **Telemetría Forense:** Creación del `SovereignLogger` y `SovereignError`. Prohibición de `console.log`. Los errores se transmutan en paquetes de diagnóstico para ser consumidos por el Auditor IA.
- **Manifiestos (MDD):** Adopción de "Manifesto-Driven Development". El comportamiento de las IAs desarrolladoras está regido por leyes escritas en la carpeta `.docs/manifiestos/`.

## - HITO 005: EXPANSIÓN "ZHONGTAI" (OMNISCIENCIA)

**Fecha:** 2026-02-20
**Autor:** Raz Podestá & LIA Legacy

### 1. Análisis de Referencia (Tencent/Alibaba)

Se determinó que para competir o integrarse con ecosistemas de Super Apps, RWC necesita capacidades de rastreo conductual y reconocimiento de dispositivos al nivel de _EagleEye_ o _WeChat Core_.

### 2. Nuevos Aparatos Forjados

- **`@razwritecore/behavioral-engine`:** Motor de telemetría de interacción (Clickstream) para entender la intención del usuario.
- **`@razwritecore/device-fingerprint`:** Identificación de hardware única para persistencia de contexto sin login.
- **`@razwritecore/china-bridge`:** Capa de abstracción para detectar e interactuar nativamente con navegadores in-app de WeChat y Alipay.

## - HITO 006: GÉNESIS DE ENGLISH-PORTAL (APP 01)

**Fecha:** 2026-02-20
**Autor:** Raz Podestá & LIA Legacy

### 1. Eliminación de Deuda Técnica

Se detectó la carpeta `apps/web-portal` como un artefacto legado no compatible con el estándar RWC. Se procedió a su eliminación física total en lugar de intentar una migración, para evitar la contaminación de configuraciones obsoletas.

### 2. Creación Limpia (Fresh Forge)

Se inicializó `apps/english-portal` utilizando el generador `@nx/next:app`.

- **Stack:** Next.js (App Router), Tailwind CSS (V4 ready), ESLint.
- **Tags:** `type:app`, `scope:english-portal` (para control de fronteras estricto).
- **Objetivo:** Servir como el primer consumidor oficial ("Cliente 0") de los búnkeres del núcleo RazWrite Core.

---

## - HITO 007: TRANSICIÓN HACIA EL MOTOR SDUI (SUPER-HOST)

**Fecha:** 2026-02-20
**Autor:** Raz Podestá & LIA Legacy

### 1. Cambio de Visión: De App de Curso a Motor Universal

Se ha determinado que `apps/english-portal` no será una aplicación estática de una escuela de inglés. Se transmuta en una **Plantilla de Renderizado Universal (Renderer Shell)**.

- **Lógica:** La aplicación es ahora una "cáscara" que recibe un `tenantIdentifier` vía dominio.
- **Rendimiento:** Utiliza Server-Driven UI (SDUI) para ensamblar componentes Lego basados en un JSON (Manifiesto del Inquilino).
- **Escalabilidad:** Un solo despliegue de este Core podrá servir a la escuela de inglés de Steve, a un restaurante o a una firma de abogados, cambiando colores, logos y flujos lógicos solo mediante la edición de datos en la bóveda central.

### 2. Nivelación de la Tríada Fundacional

Se han refactorizado los búnkeres de `Foundation` bajo el **Protocolo OEDP-V8.1**:

- **TelemetryMatrix:** Convertida en Gateway inmutable O(1) con rangos reservados para integraciones asiáticas (WeChat/Alipay).
- **SovereignLogger:** Implementa Hiper-Compresión (OpCodes) y Conciencia de Inquilino (Multi-tenant).
- **SovereignErrorEngine:** Implementa el Patrón Fachada y el Cargamento Único (Single Argument Payload) para evitar roturas en cascada ante cambios futuros.

### 3. Fortalecimiento de la Gobernanza IA

Se han redactado e implementado los Manifiestos 010 (Fachada), 011 (Dependencias), 012 (Versionado), 013 (Calidad) y 014 (Pruebas Espejo), garantizando que cualquier IA que colabore en el futuro siga el estándar de Élite.

---

## - HITO 008: ARQUITECTURA "SUPER-APP" (MODELO WECHAT)

**Fecha:** 2026-02-20
**Autor:** Raz Podestá & LIA Legacy

### 1. Investigación de Referencia

Se analizó el modelo de "Mini-Programas" de Tencent. Se concluyó que la "Omnisciencia" (observabilidad total) se logra forzando a que la UI y la Lógica se comuniquen exclusivamente a través de un Puente (Bridge) auditado.

### 2. Nuevos Aparatos Forjados

- **`@razwritecore/bridge-bus`:** Emulador del `WeixinJSBridge`. Intercepta y audita toda comunicación interna.
- **`@razwritecore/mini-runtime`:** Gestor de ciclo de vida para cargar módulos como si fueran mini-apps independientes.
- **`@razwritecore/federated-identity`:** Sistema de `UnionID` para mantener la sesión y el contexto del usuario a través de todo el ecosistema.

---

# 📓 BITÁCORA DE DESARROLLO Y MEMORIA AKÁSHICA - RAZWRITE CORE
**Protocolo:** OEDP-V8.5 Zenith
**Ubicación:** `.docs/_BITACORA.md`
**Custodio:** Raz Podestá (Arquitecto Jefe)

---

## 🤖 INSTRUCCIONES DE HIDRATACIÓN PARA LA IA (SYSTEM PROMPT)

**ATENCIÓN, SISTEMA LIA/IA:** 
Antes de escribir una sola línea de código, debes consumir este documento. Contiene la verdad histórica y las leyes inmutables forjadas durante el desarrollo.

1.  **CONTEXTO EVOLUTIVO:** No asumas que el código es legacy. Entiende *por qué* tiene la forma actual leyendo las entradas cronológicas.
2.  **DIRECTIVA DE NO-REPETICIÓN:** Consulta la sección de "Errores Críticos y Fricciones" de cada entrada. Tienes prohibido tropezar con la misma piedra dos veces (ej: Rutas relativas en `tsconfig`, Dependencias circulares en Capa 0).
3.  **PROTOCOLO DE ESCRITURA:** No tienes permiso para editar este archivo por iniciativa propia. Solo escribirás una nueva entrada cuando recibas el comando explícito: **"REGISTRAR EN BITÁCORA"** por parte de Raz.
4.  **VISIÓN HIPER-HOLÍSTICA:** Usa esta bitácora para alinear tus decisiones futuras con la arquitectura de "Clústeres de Dominio" y "Soberanía de Datos" ya establecida.

---

## 📅 REGISTRO DE SESIONES

### [2026-02-23] SESIÓN 001: LA FUNDACIÓN DE LA CAPA ZERO (SHARED FUNDAMENTALS)

**📌 Objetivo Táctico:** 
Estabilización, refactorización y blindaje de la Capa 0 (`libs/shared-fundamentals`) bajo el estándar Zenith V8.5 e ISO 27001/25010.

**🏗️ Aparatos Forjados y Nivelados:**

1.  **Sovereign Logger (`logger`):**
    *   **Evolución:** Transformado en un aparato **Isomórfico**.
    *   **Decisión:** Se implementó un `UniversalContextInjector` que usa `AsyncLocalStorage` en servidor y se ancla a `globalThis` en el navegador para resistir re-renders de React.
    *   **Mejora:** Implementación de Soberanía Semántica (`semanticKey`) para i18n.

2.  **Matrix Neural Bridge (`matrix-neural-bridge`):**
    *   **Evolución:** De diccionario estático a **Registro Dinámico Descentralizado**.
    *   **Decisión:** Implementación de **OpCodes Bitwise (Int32)** para compresión extrema.
    *   **Seguridad:** Sellado de matriz en tiempo de ejecución (`Object.freeze`) para evitar inyección de códigos maliciosos.

3.  **Sovereign Error Engine (`error-engine`):**
    *   **Evolución:** Integración de **Sanitización PII (Scrubbing)** profunda.
    *   **Decisión:** Desacoplamiento del Logger. El Engine define sus propios esquemas de severidad para evitar dependencias circulares en la Capa 0.
    *   **Privacidad:** Ofuscación automática de JWTs, Tarjetas de Crédito y rutas de servidor en el Stack Trace.

4.  **Sovereign Nervous System (`sovereign-nervous-system`):**
    *   **Evolución:** Reestructuración como **Clúster de Dominio (M-036)**.
    *   **Componentes:** `IntentionRouter` (RxJS), `QuantumBridge` (SharedMemory - Placeholder), `SilentWhisperer` (ServiceWorkers - Placeholder).
    *   **Decisión:** Uso de notación de corchetes `['propiedad']` para acceder a tipos Zod Branded y evitar errores de `noPropertyAccessFromIndexSignature`.

5.  **Metabolic Scheduler (`metabolic-scheduler`):**
    *   **Evolución:** Implementación de **Biosensores Defensivos**.
    *   **Decisión:** Uso de `Navigator Augmentation` para evitar el tipo `any` en APIs experimentales (`getBattery`).
    *   **Lógica:** Máquina de estados (`PEAK`, `ECO`, `EMERGENCY`) para regular el QoS del sistema nervioso.

6.  **Shared Crypto Cluster (`crypto`):**
    *   **Evolución:** Diseño de **Bóveda de Confianza Cero**.
    *   **Decisión:** Claves `extractable: false`. Uso exclusivo de `Web Crypto API`.
    *   **Arquitectura:** División en `cipher-engine`, `key-forge` y `hashing-lab`.

**⚠️ Errores Críticos y Lecciones Aprendidas (NO REPETIR):**

*   **Fricción de Profundidad (TSConfig):** Los archivos `tsconfig.json` dentro de subcarpetas profundas (`libs/shared/bunker/src`) deben apuntar a la base con la profundidad correcta (`../../../tsconfig.base.json`). **Solución:** Verificar siempre la ruta relativa antes de crear el archivo.
*   **Colapso de Fronteras (ESLint):** Si se cambian los tags en `project.json` (ej: de `type:foundation` a `layer:fundamentals`), se DEBE actualizar inmediatamente `eslint.config.mjs` o el linter bloqueará todas las importaciones.
*   **Dependencias Circulares en L0:** El `ErrorEngine` no puede depender de tipos inferidos del `Logger` si el `Logger` depende del `MatrixBridge` y este a su vez es usado por el `ErrorEngine`. **Solución:** Desacoplar tipos comunes (como `SeverityLevel`) o duplicarlos controladamente para mantener la independencia.
*   **Index Signature en Zod:** TypeScript estricto prohíbe el acceso por punto (`.`) a objetos que no tienen todas sus claves conocidas estáticamente. **Solución:** Usar `validatedData['key']` o definir interfaces explícitas post-inferencia.

**🏁 Estado Final de la Sesión:**
La Capa 0 está sellada. La infraestructura base es sólida, tipada, documentada y lista para soportar la Capa 1 (Hardware Refineries).

---

[2026-02-23] SESIÓN 002: SELLADO DE CAPA ZERO E IGNICIÓN DE LA TRÍADA MODULAR (L2)
📌 Objetivo Táctico:
Eliminación de cuellos de botella de performance, erradicación de dependencias pesadas en el núcleo y forja de los búnkeres de Identidad, Sincronización y Persistencia.
🏗️ Evolución de Aparatos (Refactorización de Élite):
Sovereign Nervous System (shared-nervous-system):
Acción: Extirpación total de rxjs.
Lógica: Se sustituyó el motor de Observables por un sistema de Pub/Sub Nativo O(1) basado en Map y Set.
Rationale: Reducción de ~40kb en el bundle inicial y eliminación de la latencia de filtrado lineal (filter) en favor de ruteo directo por OpCode.
Sovereign Logger (logger):
Acción: Inyección de Ring Buffer (Memoria Circular).
Lógica: Implementación de un búfer de 1024 posiciones para capturar telemetría conductual (QoS 3) sin validación inmediata.
Rationale: Evitar el bloqueo del hilo de UI (60fps) durante ráfagas de eventos (Scroll/Mouse). El vaciado (drain) ocurre en periodos de inactividad vía requestIdleCallback.
Metabolic Scheduler (metabolic-scheduler):
Acción: Atomización del motor y limpieza de rxjs.
Lógica: Implementación de un Debouncer de 150ms para fluctuaciones de hardware y resolución de conflicto de tipos TS 2430 en la interfaz Navigator.
Rationale: Estabilidad ante cambios erráticos de red/batería y cumplimiento de bioseguridad en el rastro forense.
Identity Mutant Engine (unit-identity-mutant):
Acción: Ignición de la fórmula de Pasaporte Mutante.
Lógica: Generación determinística [GEO].[BASE62].[HMAC] con aislamiento en Deep-Pulse (Worker) y cerrojo de ignición (Promise Singleton) para evitar Race Conditions en React 19.
Sync Osmosis Engine (unit-sync-osmosis):
Acción: Forja de la Membrana Semi-Permeable.
Lógica: Implementación de esclusas por QoS y Transporte de Supervivencia vía sendBeacon y fetch-keepalive.
Rationale: Garantizar que los datos vitales lleguen al servidor incluso si el usuario cierra la pestaña repentinamente.
Persistence Bunker (unit-persistence):
Acción: Creación de la Bóveda Tricameral Cifrada.
Lógica: Persistencia en IndexedDB mediante Singleton de Conexión y derivación de llaves PBKDF2 determinística basada en la Identidad Mutante.
Rationale: El sistema ahora posee "Memoria a Largo Plazo" recuperable y cifrada con grado militar (AES-GCM 256).
⚠️ Errores Críticos y Lecciones Aprendidas (NO REPETIR):
Fricción de Profundidad (TSConfig): Se corrigieron las rutas relativas en búnkeres de nivel 2. Lección: Las librerías en libs/modular-units/ deben subir 3 niveles (../../../) para encontrar el tsconfig.base.json.
Conflicto de Extensión (Navigator): Intentar redefinir propiedades de interfaces nativas de JavaScript (como hardwareConcurrency) sin respetar su tipo exacto provoca colapsos en el compilador. Solución: Usar interfaces extendidas limpias.
Regresión Semántica de Tipos: Se detectó el uso de IBase64UrlString en lugar de ICipherText en la persistencia. Solución: Sincronizar el ADN criptográfico en el index.ts del Shared-Crypto para permitir casting nominal estricto.
🏁 Estado Final de la Sesión:
La Capa 0 es ahora "Zero-Dependencies" y la Capa 2 está plenamente operativa. El sistema es un organismo vivo con identidad, memoria y comunicación inteligente.
Firma de Autoridad:
Raz Podestá — Arquitecto Jefe

---

