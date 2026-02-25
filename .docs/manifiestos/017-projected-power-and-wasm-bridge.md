⚙️ MANIFIESTO #017: DOCTRINA DE POTENCIA PROYECTADA Y NÚCLEOS BINARIOS
Estatus: <SUPREME_ZENITH> | Subsistema: Global Architecture (Rust/WASM)
Objetivo: Garantizar que el Kernel NSK pueda escalar hacia rendimientos cercanos al metal mediante una arquitectura de puentes asíncronos y contratos binarios compatibles.
1. EL PATRÓN DEL NÚCLEO SWAPPABLE (THE DARK BRIDGE)
Queda prohibido acoplar la lógica de procesamiento pesado a la sintaxis de JavaScript. Cada motor de lógica (Refinería) debe ser una "Caja Negra de Cómputo".
La Interfaz Soberana: El búnker expone un contrato (Port) que es agnóstico al lenguaje de implementación.
Fase Prototipo (TypeScript): Se escribe la lógica en TS para velocidad de desarrollo.
Fase Zenith (WASM/Rust): Se reemplaza el archivo .logic.ts por un .wasm cargado por el adaptador, sin que el componente visual ni el Bridge-Bus perciban el cambio.
2. PENSAMIENTO ASÍNCRONO Y DESACOPLADO (ZERO BLOCKING)
Dada la naturaleza de los puentes de memoria entre JS y WASM:
Mandato Async: Toda función exportada por una Fachada de búnker (libs/bunkers/*/src/index.ts) debe ser intrínsecamente asíncrona (Promise).
Worker Mandatory: El 100% de la lógica pesada (Cifrado, Compresión ZTM, Análisis Conductual) debe ejecutarse dentro del hilo del Web Worker. El hilo principal (Main) solo actúa como despacho de intenciones.
3. PROTOCOLO DE CARGAMENTO BINARIO (MEMORY SOVEREIGNTY)
Para evitar el cuello de botella que representa JSON.parse/stringify al mover grandes cantidades de petróleo (telemetría/sensores):
Structured Clone Protocol: Se prioriza el envío de datos que el navegador pueda clonar de forma nativa entre hilos.
ArrayBuffer Awareness: Los búnkeres de hardware (M-025) y seguridad (M-019) deben estar preparados para procesar ArrayBuffers o TypedArrays.
Schema Alignment: Los esquemas de Zod (M-005) deben evitar el uso de funciones o tipos complejos de JS, limitándose a estructuras que tengan representación directa en memoria binaria (Strings, Numbers, Booleans, Typed Arrays).
4. CASOS DE USO Y UMBRALES DE TRANSMUTACIÓN
CASO 1: Refinería de Cifrado (Manifiesto 019)
Hoy: shared-crypto usa Web Crypto API (JS Wrapper).
Umbral: Si el volumen de rastro forense a cifrar supera los 5MB/seg, se transmuta el núcleo de cifrado a un módulo Rust-ChaCha20 para máxima eficiencia energética en móviles.
CASO 2: Behavioral Engine (Manifiesto 021)
Hoy: events-bunker calcula vectores de scroll en TS.
Umbral: Si la captura de micro-gestos en alta resolución causa caídas de frames en dispositivos de gama baja, el análisis de intención se delega a un motor de Inferencia WASM.
5. ESTRUCTURA LÓGICA DEL PUENTE (shared/wasm-bridge)
Siguiendo el Manifiesto 008 (Lego-Core), la orquestación de binarios se gestiona centralizadamente:
code
Text
shared/wasm-bridge/src/lib/binary-loader/
├── binary-loader.schema.ts      # ADN: Esquema de carga y validación de módulos WASM
├── binary-loader.logic.ts       # CEREBRO: Gestión de instanciación y memoria compartida
├── binary-loader.worker.ts      # MOTOR: Proxy que conecta el Bridge-Bus con el motor binario
└── README.md                    # PASAPORTE: Guía de compilación de Rust a WASM para NSK

---


