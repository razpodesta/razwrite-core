/**
@apparatus AtomicLegoProjectorDoctrine
@role Arquitecto de Realidad Dinámica, Orquestador de Escenas Metabólicas y Proyección de ADN.
@location .docs/manifiestos/009-atomic-lego-projector-doctrine.md
@status <SUPREME_ZENITH>
@version 8.5.0 Zenith Edition
@protocol OEDP-V8.5 Lattice
*/
🏛️ MANIFIESTO 009: DOCTRINA DEL ATOMIC LEGO PROJECTOR (ALP)
Objetivo: Erradicar definitivamente el concepto de "página web" para instaurar el paradigma de "Escenas Bio-Sintéticas Dinámicas". En el ecosistema RazWrite Core V8.5, el servidor dicta la voluntad genética y el cliente proyecta una realidad interactiva autogestionada, con fidelidad adaptativa y performance innegociable de 60fps.
1. LA VISIÓN HOLÍSTICA: EL SITIO WEB COMO ORGANISMO PROYECTADO
Bajo el protocolo Lattice, el código fuente es la Impresora de Realidad.
La Infraestructura: Es el proyector físico (Renderer Shell).
Los Búnkeres: Son las lentes biotecnológicas (Penta-Estructura M-008).
El Manifiesto: Es el código genético del inquilino (Tenant DNA).
La Realidad: No se aloja, se Proyecta. Cambiar la naturaleza de un negocio de "Academia" a "Fintech" es una transmutación de datos en la bóveda, sin intervención en la maquinaria de ejecución.
2. ARQUITECTURA DEL PROYECTOR (TRIPLE-STAGE TRANSMUTATION)
El ALP opera como un motor de combustión lógica de tres etapas:
A. Etapa de Intercepción (The Genetic Selection)
El Edge-Middleware captura el Host.
El ALP consulta el Matrix Neural Bridge (MNB) para localizar el DNA del inquilino.
Zero-Latency Fetch: El manifiesto se sirve desde el Edge Cache en <50ms, inyectando el tenantIdentifier en el contexto del SNS.
B. Etapa de Ensamblaje (The Lattice Assembly)
El motor lee el arreglo layout_matrix. Por cada identificador de búnker (ej: HERO_PULSE_V2), el motor:
Valida el ADN: Pasa las propiedades por la Aduana Zod local del búnker.
Resuelve el Contrato: Lee el .contract.ts del búnker para pre-establecer los túneles de comunicación en el Sovereign Nervous System.
Inyecta el Alma: Cruza las claves con el motor de i18n para hidratar el lenguaje específico de la escena.
C. Etapa de Hidratación Metabólica (Metabolic Hydration)
En coordinación con el Metabolic Scheduler (M-015), el ALP decide el estado térmico de los pixeles:
Cold Projection (SSR): Componentes estáticos se envían como HTML puro (RSC) para SEO masivo y visualización instantánea.
Hot Projection (Interactive): Componentes interactivos se hidratan y activan su Cerebro Asíncrono (.worker.ts) solo cuando entran en el viewport.
Ghost Projection: Componentes fuera de vista entran en hibernación, volcando su estado al PersistenceBunker para liberar RAM.
3. EL ADN DEL INQUILINO (THE SUPREME LATTICE SCHEMA)
Este contrato es el mapa que define la realidad. Prohibido el uso de tipos débiles.
code
TypeScript
const TenantManifestSchema = z.object({
  id: z.string().uuid().brand<'TenantId'>(),
  version: z.string().regex(/^\d+\.\d+\.\d+$/),
  metadata: z.object({
    brand_name: z.string(),
    seo_blueprint: z.record(z.string(), z.string()),
  }),
  visual_tokens: z.object({
    design_system: z.enum(['Zenith_Dark', 'Obsidian_Gold', 'Liquid_Light']),
    tokens: z.record(z.string(), z.string()),
  }),
  scene_orchestrator: z.array(z.object({
    route: z.string(), // Sintaxis de interceptor universal [[...slug]]
    layout_matrix: z.array(z.object({
      bunker_id: z.string(),
      priority_qos: z.number().min(0).max(3),
      metabolic_weight: z.enum(['LIGHT', 'MEDIUM', 'HEAVY']),
      props: z.record(z.string(), z.unknown()),
      permissions: z.array(z.string()), // Ej: ["GEO", "BIOMETRIC"]
    })),
  })),
});
4. LA DOCTRINA DE LA AFASIA DE NEGOCIO (DUMB UI)
Para garantizar la soberanía, los búnkeres visuales deben sufrir de afasia absoluta:
No conocen al Cliente: No existe if (tenant == 'Steve'). Solo existen componentProperties.
No conocen la Base de Datos: Un búnker de "Checkout" no llama a una API. Emite una INTENTION al SNS: INTENT_EXECUTE_PAYMENT. Es el Kernel, al leer el Contrato, quien sabe si ese pulso debe ir a Stripe o a WeChat Pay.
5. CASOS DE USO: PROYECCIÓN ADAPTATIVA
Caso 1: Transmutación Estética: El cliente cambia su tema a "Obsidian Gold" en la Bóveda. El ALP detecta el cambio de visual_tokens y actualiza la CSS-OM en tiempo real sin recargar la página.
Caso 2: Inyección por Contexto: Si el Bio-Refinery reporta batería baja, el ALP transmuta todos los búnkeres marcados como metabolic_weight: HEAVY a su versión "Static Placeholder" para salvar el dispositivo.
6. ESTRUCTURA LÓGICA DEL APARATO (shared/sdui-projector)
Siguiendo el Manifiesto 008 (Lattice-Core):
code
Text
libs/shared/sdui-projector/src/lib/projector-core/
├── projector-core.tsx            # ADAPTADOR: Componente <Projector /> maestro de React 19
├── projector-core.schema.ts      # ADN: El TenantManifestSchema (Zod V4)
├── projector-core.logic.ts       # CEREBRO: Resolución de rutas y lógica de hilos
├── contract.resolver.ts          # NEXO: Vinculación dinámica de búnkeres con el SNS
└── i18n/                         # ALMA: Mensajes de sistema ("Forjando Realidad...", "Error de ADN")
Firma de Autoridad:
Raz Podestá - Arquitecto Jefe