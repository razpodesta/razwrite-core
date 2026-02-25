🏛️ MANIFIESTO #024: PROTOCOLO DE DIPLOMACIA Y NATURALIZACIÓN (NSK EDITION)
Estatus: <SUPREME_ZENITH> | Subsistema: libs/bunkers/integration
Objetivo: Absorber ecosistemas externos dentro del Kernel NSK, garantizando que el usuario nunca abandone nuestra soberanía de datos, seguridad y performance.
1. LA DOCTRINA DE LA "NATURALIZACIÓN"
Todo servicio externo (WhatsApp, Stripe, Google Maps) debe ser Naturalizado antes de ser proyectado:
Capa de Abstracción (The Wrapper): El IntegrationBunker expone funciones universales (ej. sendHandshake()). El componente visual no sabe si el mensaje sale por WhatsApp o SMS; es el búnker el que decide el proveedor según el contexto del inquilino (SDUI).
Aislamiento de Performance: Los SDKs externos se cargan exclusivamente bajo demanda (Dynamic Import) y su ejecución se monitorea para evitar bloqueos en el hilo principal.
2. SHADOW IDENTITY MAPPING (EL VÍNCULO)
Soberanía del _u_id: El _u_id mutante (M-022) es la clave maestra. Los IDs externos (números de teléfono, emails, customer_ids) se almacenan en el IdentityBunker como atributos de una Identidad en la Sombra.
Privacidad de Nexo: El nexo entre la identidad real y la externa debe viajar cifrado. El IntegrationBunker solo maneja Tokens de Sesión de Integración emitidos por el Kernel.
3. ESPEJO DE TELEMETRÍA (INTENT MIRRORING)
Para evitar "puntos ciegos" en el petróleo de datos:
Captura de Intención: Si un usuario interactúa con un botón de "Pagar", el IntegrationBunker registra la intención en el EventsBunker (M-021) antes de transferir el control al proveedor externo.
Auditoría de Respuesta: Todo callback o webhook proveniente del tercero se normaliza al formato RWC JSON antes de ser distribuido al shared-bridge-bus.
4. SEGURIDAD DE TRANSMISIÓN (TRANSLUCENT PAYLOADS)
Zero-Secrets-on-Client: Queda terminantemente prohibido almacenar API Keys o secretos de integración en el código del búnker.
Relay de Seguridad: Todas las peticiones pesadas pasan por un Proxy en el Kernel que inyecta las credenciales reales antes de hablar con el tercero, manteniendo el IntegrationBunker del cliente 100% opaco y seguro.
🛠️ ESTRUCTURA LÓGICA DEL APARATO (libs/bunkers/integration)
Siguiendo el Manifiesto 008 (Lego-Core):
code
Text
libs/bunkers/integration/src/lib/external-bridge/
├── external-bridge.tsx           # ADAPTADOR: Componentes visuales (botón WhatsApp, etc)
├── external-bridge.schema.ts     # ADN: Contratos de entrada para cada servicio externo
├── external-bridge.logic.ts      # CEREBRO: Mapeo de intenciones y normalización de datos
├── adapters/                     # INFRAESTRUCTURA: Uno por cada tercero (Stripe, WA)
│   ├── whatsapp.adapter.ts
│   └── stripe.adapter.ts
└── i18n/                         # ALMA: "Conectando con servicio...", "Pago exitoso"

---


