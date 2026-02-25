
/**
@apparatus PentastructuralBunkerArchitecture
@role Definición de la Anatomía de Búnker Lattice-Core, Cohesión Espacial y Encapsulamiento.
@location .docs/manifiestos/008-pentastructural-bunker-architecture.md
@status <SUPREME_ZENITH>
@version 8.5.0
@protocol OEDP-V8.5 Lattice
*/
🏗️ MANIFIESTO 008: ANATOMÍA DE BÚNKER PENTA-ESTRUCTURAL (LATTICE-CORE)
Objetivo: Garantizar que cada aparato sea una unidad biotecnológica indivisible, portable y blindada. Evolucionamos de la antigua tríada a la Penta-Estructura, donde el ADN, el Cuerpo, el Alma, el Cerebro Asíncrono y el Nexo de Proyección coexisten en el mismo espacio vital, permitiendo la ejecución multihilo y la auto-suscripción al sistema nervioso.
1. LA LEY DE COHESIÓN ESPACIAL (THE LATTICE PRINCIPLE)
Un Aparato es una carpeta única e inviolable en src/lib/.
Aislamiento Total: Está terminantemente prohibido que un aparato dependa de archivos de lógica, tipos o esquemas situados fuera de su propio directorio (con la única excepción de la capa shared/ y tipos globales del sistema).
Independencia de Compilación: Si se extrae o elimina la carpeta del aparato, el resto del Lattice debe seguir compilando perfectamente (Modularidad Atómica).
2. LA PENTA-ESTRUCTURA FÍSICA (HIERARCHY OF DENSITY)
La jerarquía interna sigue el orden de ejecución y profundidad de hilos (Triple-Thread Awareness):
code
Text
libs/[bunker-name]/src/lib/[ApparatusName]/
├── [ApparatusName].tsx           # EL CUERPO: Marioneta Visual (Surface-Pulse / UI)
├── [ApparatusName].schema.ts     # EL ADN: Contratos Zod V4 & Branding (Domain)
├── [ApparatusName].logic.ts      # EL NEXO: Hooks de UI y lógica síncrona leve
├── [ApparatusName].worker.ts     # EL CEREBRO: Lógica de "Dark Matter" (Deep-Pulse / Worker)
├── [ApparatusName].contract.ts   # EL PULSO: Contrato de Suscripción al SNS y ALP
├── [ApparatusName].README.md     # EL PASAPORTE: Documentación técnica local
└── i18n/                         # EL ALMA: Diccionarios trilingües (JSON)
    ├── en-US.json
    ├── es-ES.json
    └── pt-BR.json
3. REPARTO SOBERANO DE RESPONSABILIDADES
I. EL ADN (.schema.ts)
Único lugar donde reside la Aduana Zod. Define el InputSchema y OutputSchema nominal. Es la fuente de verdad para los tipos TypeScript que circularán por el SNS.
II. EL CEREBRO ASÍNCRONO (.worker.ts)
Contiene la lógica de cómputo intensivo, transformaciones de datos masivas y operaciones criptográficas. Obligatorio para cualquier búnker que procese telemetría o seguridad, asegurando que el hilo de UI mantenga los 60fps.
III. EL PULSO (.contract.ts)
Define el Mapa de Intenciones del búnker. Especifica qué IntentOpCodes emite y a qué ReactionOpCodes se suscribe. Es el archivo que el Atomic Lego Projector (ALP) analiza para conectar el búnker al sistema nervioso.
IV. EL CUERPO (.tsx)
Actúa como la Marioneta Visual. No posee estado complejo de negocio ni realiza cálculos. Consume el Nexo (.logic.ts) para proyectar píxeles y emite intenciones al SNS ante la interacción del usuario.
4. LA PUERTA SELLADA (FACHADA OPACA)
El archivo index.ts en la raíz de la librería actúa como el Gran Filtro de Soberanía. Solo se permite la exportación de la Fachada y los Tipos de Contrato.
Sintaxis Obligatoria:
code
TypeScript
// libs/bunker-identity-mutant/src/index.ts

// Exportación del componente de proyección (Cuerpo)
export { IdentityMutantBunker } from './lib/identity-mutant/identity-mutant.tsx';

// Exportación del contrato de suscripción para el ALP
export { IdentityMutantContract } from './lib/identity-mutant/identity-mutant.contract';

// Exportación del ADN (Tipos Nominales)
export type { IIdentityMutantInput, IIdentityMutantOutput } from './lib/identity-mutant/identity-mutant.schema';
5. BENEFICIOS ZENITH V8.5
Refactorización Quirúrgica: Cualquier cambio en el cifrado o la lógica pesada se realiza en el .worker.ts, sin riesgo de romper el renderizado visual.
Optimización IA: Una IA puede procesar una sola carpeta y tener el contexto total (UI, Lógica, Hilos y Contrato), eliminando alucinaciones por dispersión de archivos.
Proyección Inmediata: El ALP puede cargar el .contract.ts de forma independiente antes de hidratar el .tsx, permitiendo una conexión al sistema nervioso en milisegundos.
Firma de Autoridad:
Raz Podestá - Arquitecto Jefe