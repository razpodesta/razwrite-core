
/**
@apparatus SovereignNervousSystemDoctrine
@role Constitución de la Comunicación Multihilo, Gestión de QoS y Flujo de Materia Oscura.
@location .docs/manifiestos/015-sovereign-nervous-system-doctrine.md
@status <SUPREME_ZENITH>
@version 8.5.0
@protocol OEDP-V8.5 Lattice
*/
🧠 MANIFIESTO 015: DOCTRINA DEL SISTEMA NERVIOSO SOBERANO (SNS)
Objetivo: Establecer el ecosistema de comunicación de "Latencia Cero" y "Triple Hilo" que permite al RazWrite Core operar como un organismo biotecnológico indescifrable, donde la interfaz es una marioneta visual y la inteligencia reside en planos de realidad protegidos.
1. LA TRINIDAD DE EJECUCIÓN (TRIPLE-THREAD LATTICE)
El sistema fragmenta la existencia en tres planos para garantizar el cumplimiento del Tier Zero y una fluidez constante de 60fps:
A. Plano de Superficie (Surface-Pulse / UI Thread)
Rol: Marioneta Visual.
Tecnología: Next.js 16 (App Router), React 19 (Server Components + Client Shell).
Estado: Afasia de Negocio. La UI no realiza cálculos, no conoce secretos y no accede a la red de forma directa. Solo proyecta "Reacciones" recibidas del SNS.
B. Plano del Núcleo (Deep-Pulse / Web Worker)
Rol: Inteligencia Local (SNS Kernel).
Tecnología: Web Workers nativos, SharedArrayBuffer.
Responsabilidad: Aquí reside la "Materia Oscura". Cifrado JWE, compresión ZTM, validación Zod profunda y lógica de los búnkeres de inteligencia. Protege al hilo principal del jitter computacional.
C. Plano de la Bóveda (Acid-Pulse / Server Layer)
Rol: Autoridad Central.
Tecnología: Server Actions, Drizzle ORM, Neon DB.
Responsabilidad: Persistencia física, validación de reglas financieras y cumplimiento legal transaccional.
2. EL SISTEMA NERVIOSO SOBERANO (SNS)
El SNS es el mediador único de intenciones bajo el protocolo Intención-Acción-Reacción:
I. Clasificación QoS (Quality of Service)
Toda interacción es interceptada por el SNS y priorizada matemáticamente:
VITAL (QoS 0): Identidad, Pagos y Seguridad. Bloquea hilos secundarios, latencia prioritaria.
OPERATIONAL (QoS 1): Navegación y carga de Escenas SDUI.
RESILIENT (QoS 2): Sincronización de progreso y estado local.
BEHAVIORAL (QoS 3): Telemetría de micro-gestos. Solo circula en periodos de inactividad (Idle).
II. Interceptación Cognitiva
El SNS analiza el intent_opcode. Si la intención requiere seguridad o cómputo pesado, el SNS realiza el Offloading automático al Web Worker. La UI nunca sabe que el proceso cambió de hilo.
3. ESTADO CUÁNTICO (ZERO-COPY SYNC)
Para eliminar el cuello de botella de la serialización JSON entre hilos:
Memoria Compartida: Los datos de alta frecuencia (sensores de hardware) utilizan SharedArrayBuffer y Atomics.
Muta y Proyecta: El Worker muta el búfer de memoria y la UI reacciona mediante un observador de señales (Signals), eliminando el coste de postMessage masivo.
4. PROTOCOLO DE MATERIA OSCURA (DARK MATTER)
La comunicación hacia la Bóveda Cloud (Server) es totalmente opaca:
Enriquecimiento Silencioso: El SNS inyecta el correlationIdentifier y el mutantPassportIdentifier (IME) dentro del Worker.
Cifrado Polimórfico: El payload se transmuta en un paquete JWE (JSON Web Encryption) indescifrable antes de tocar la red.
Translucidez de Reacción: El servidor responde con OpCodes. El SNS descifra en el Worker y entrega a la Surface únicamente los tokens visuales necesarios.
5. CASO DE USO: TRANSACCIÓN ZENITH (M-015 + M-018 + M-022)
Surface (UI): El usuario pulsa "Confirmar Pago". Emite INTENT_COMMIT_FINANCIAL_TRANSACTION.
SNS (Interceptor): Detecta QoS 0. Consulta al Metabolic-Scheduler. Si hay batería, autoriza el pico metabólico.
Kernel (Worker): Captura la intención. El Identity-Mutant firma el payload. El Shared-Crypto cifra los datos bancarios.
Vault (Server): Recibe Materia Oscura. Procesa con Stripe. Responde SUCCESS_OPCODE.
SNS (Reacción): El Worker descifra. Actualiza el Quantum-State.
Surface (UI): El componente visual se torna verde instantáneamente. Nunca vio los datos de la tarjeta.
6. ESTRUCTURA FÍSICA DEL APARATO
Ubicación: libs/shared/nervous-system/src/lib/
nervous-core.logic.ts: Orquestador de flujos RxJS y priorización QoS.
nervous-core.schema.ts: Diccionario de IntentOpCodes y ReactionOpCodes.
nervous-core.worker.ts: El corazón que cifra y descifra en segundo plano.
quantum-bridge.ts: Gestión de SharedArrayBuffer para latencia cero.
Firma de Autoridad:
Raz Podestá - Arquitecto Jefe