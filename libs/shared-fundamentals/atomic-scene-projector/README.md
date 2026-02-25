/\*_
@apparatus AtomicLegoProjector (ALP)
@role Arquitecto de Realidad Dinámica y Orquestador de Escenas Metabólicas.
@location libs/shared/sdui-projector/README.md
@status <LATTICE_FORGING>
@version 8.5.0 Zenith Edition
@protocol OEDP-V8.5 Lattice
_/
🪞 ATOMIC-LEGO-PROJECTOR (EL PROYECTOR DE REALIDAD)
📜 DECLARACIÓN DE MISIÓN
El Atomic Lego Projector (ALP) es la evolución terminal del antiguo sdui-engine. Su misión es erradicar el concepto de "página web" para instaurar el paradigma de Escenas Bio-Sintéticas. Es el encargado de recibir el ADN del inquilino (Tenant Manifest) y proyectar búnkeres visuales que no son simples componentes, sino organismos independientes con capacidad de auto-suscripción al sistema nervioso.
El ALP garantiza que la interfaz sea una extensión fluida de la voluntad del servidor, adaptando la fidelidad del renderizado en tiempo real según el estado metabólico del dispositivo y las intenciones detectadas por el sistema sensorial.
🧠 LÓGICA DEL BÚNKER (DOCTRINA LATTICE)
Bajo la Arquitectura de Celosía, el ALP implementa los siguientes pilares de proyección:
Contrato de Proyección Independiente: Cada búnker visual (Lego) debe declarar un ProjectionContract. El ALP lee este contrato para saber qué canales del Sovereign Nervous System (SNS) debe abrir para ese componente específico antes de pintarlo.
Hidratación Metabólica (M-009 / M-018): En coordinación con el Metabolic Scheduler, el ALP decide el estado térmico de los pixeles:
Cold Projection (SSR/Static): HTML puro para SEO y carga instantánea.
Hot Projection (Interactive): Hidratación completa con suscripciones activas al SNS.
Ghost Projection (Hibernation): El componente es removido del DOM para ahorrar RAM, pero su "sombra de estado" persiste en el PersistenceBunker.
Aduana de ADN en el Borde: Valida matemáticamente el Manifiesto del Inquilino mediante esquemas Zod V4 antes de permitir la ignición de la escena, bloqueando cualquier intento de inyección de código no autorizado.
Sincronización Semántica (i18n): Hidrata automáticamente el "Alma" de cada búnker inyectando únicamente los fragmentos del diccionario que el componente requiere para la escena actual, minimizando el peso del payload.
🏗️ ANATOMÍA DE LEGO (M-008)
Este búnker reside en la capa shared/ y orquestará toda la capa apps/:
code
Text
libs/shared/sdui-projector/src/
├── index.ts # LA PUERTA SELLADA (Fachada ALP)
└── lib/
└── projector-core/ # EL MOTOR DE PROYECCIÓN
├── projector-core.tsx # EL CUERPO: Componente <Projector /> Maestro
├── projector-core.logic.ts # EL CEREBRO: Resolución de Escenas y Hilos
├── projector-core.schema.ts# EL ADN: Schema Maestro del Tenant Manifest
├── contract.resolver.ts # LA TÁCTICA: Mapeo de Suscripciones al SNS
├── registry.manifest.ts # EL LIBRO: Catálogo de búnkeres disponibles
└── i18n/ # EL ALMA: Mensajes de fallo de proyección
🔗 INTER-CONECTIVIDAD (LATTICE NETWORK)
Con el Sovereign Nervous System: Establece los túneles de datos (Reacciones) para alimentar los búnkeres visuales.
Con el Metabolic Scheduler: Recibe la orden de degradar o elevar la fidelidad del renderizado según la batería/CPU.
Con el Matrix Neural Bridge: Utiliza los OpCodes de renderizado para informar al Sentinel sobre el éxito o fallo de la escena proyectada.
🛡️ REGLAS DE SOBERANÍA IA
Afasia de Negocio Absoluta (M-009): El ALP no debe contener lógica de "E-commerce" o "Educación". Si se detecta un if (tenant === 'Steve'), el búnker debe ser de-comisionado inmediatamente.
Zero Abbreviations Policy (M-004): Prohibido usar props, ui, render. Utilizar componentProperties, visualInterface y projectScene.
Lazy Loading Obligatorio: Ningún búnker visual puede ser importado de forma estática en el ALP. Se debe utilizar la carga dinámica por fragmentos para mantener el Shell por debajo de los 100kb.
Determinismo Visual: Dada una versión del Manifiesto y una versión del Core, la proyección en el cliente debe ser 100% idéntica en todos los dispositivos (Pixel-Perfect Consistency).
Firma de Autoridad:
Raz Podestá - Arquitecto Jefe

6 pilares estratégicos:
SNS (Comunicación)
MS (Recursos)
IME (Identidad)
BSO (Sincronización)
MNB (Traducción/IA)
ALP (Proyección)
