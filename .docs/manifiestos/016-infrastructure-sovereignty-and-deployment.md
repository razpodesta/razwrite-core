🏛️ MANIFIESTO #016: TOPOLOGÍA DE LA FORTALEZA Y DESPLIEGUE SOBERANO (NSK EDITION)
Estatus: <SUPREME_ZENITH> | Subsistema: Global DevOps (Nx + Docker + Cloud-Agnostic)
Objetivo: Proyectar el ecosistema RazWrite Core en una arquitectura de "Cero Costo / Cero Tarjeta" con redundancia activa y performance de grado empresarial.
1. LA DISTRIBUCIÓN DE LOS ÓRGANOS (TOPOLOGÍA ZERO-CARD)
El sistema se despliega como un organismo multicelular:
A. El Proyector (Hugging Face Space #1 - Renderer Shell)
Hardware: 16GB RAM / 2 vCPU (Tier Gratuito).
Carga: Next.js 16 (Runtime) + Shared Logic.
Misión: Recibir peticiones, consultar el ADN del Inquilino y proyectar la UI.
B. El Auditor (Hugging Face Space #2 - Neural Sentinel)
Hardware: 16GB RAM / 2 vCPU (Tier Gratuito).
Misión: Procesar rastro forense, ejecutar modelos de IA de diagnóstico y orquestar la auto-sanación.
Aislamiento: Totalmente independiente del Proyector para garantizar que un análisis pesado de logs no bloquee la navegación del usuario.
C. El Corazón de Datos (Neon Serverless - PostgreSQL)
Límite: 500MB de base de datos / 100 Compute Units.
Misión: Almacenar Manifiestos de Inquilinos, Identidades UnionID (M-022) y el Histórico de Telemetría Refinada.
D. La Bóveda de Activos (Supabase Storage)
Límite: 1GB Transferencia / 5GB Almacenamiento.
Misión: Servir imágenes, videos y los Lego-Búnkeres Ofuscados (M-020) mediante su CDN global nativo.
2. EL PROTOCOLO DE PROYECCIÓN (CI/CD PIPELINE)
Gestionado por GitHub Actions bajo la doctrina del Manifiesto 014:
Forja Atómica: Nx detecta búnkeres afectados.
Sellado Criptográfico: Se firman los binarios (M-019).
Mirroring: Los búnkeres de cliente se suben a Supabase Storage (CDN).
Container Ignition: Se construye la imagen Docker del Shell y se hace un git push al Space de Hugging Face.
Sanity Check: El Auditor valida que la nueva versión no introduzca regresiones de latencia.
3. METABOLISMO DE SUPERVIVENCIA (ANTI-HIBERNATION)
Para evitar el "Cold Start" de los tiers gratuitos:
Pulse Awakening: El SyncBunker del lado del cliente, al detectar una sesión activa, envía un "Ping de Salud" al Auditor y al Proyector.
Cron-KeepAlive: Uso de GitHub Actions Cron (cada 48h) para realizar una petición sintética al Shell, asegurando que los contenedores se mantengan "Calientes" en el Edge.
4. SOBERANÍA DE VARIABLES (SECRET GOVERNANCE)
Ningún secreto de infraestructura toca el código.
Dark Matter Env: Las claves de Neon, Supabase y la K_master de cifrado se inyectan únicamente en el momento del despliegue mediante GitHub Secrets.
Rotation Protocol: Las llaves de integración (M-024) se rotan trimestralmente mediante el ReleaseManager (M-012).
🛠️ ESTRUCTURA LÓGICA DEL APARATO (shared/fortress-devops)
Siguiendo el Manifiesto 008 (Lego-Core), este sistema se gestiona como una unidad de infraestructura:
code
Text
shared/fortress-devops/
├── docker/
│   ├── shell.Dockerfile         # Receta para el Renderer Proyector
│   └── sentinel.Dockerfile      # Receta para el Auditor Neuronal
├── terraform/ (Opcional)        # Planos de infraestructura agnóstica
├── github-actions/              # Workflows de despliegue NSK
└── scripts/
    ├── warm-up.ts               # Lógica de Heartbeat Metabolism
    └── asset-sync.ts            # Sincronización de búnkeres con el CDN

    ---

    
