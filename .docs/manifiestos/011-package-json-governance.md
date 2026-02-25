📦 MANIFIESTO #011: GOBERNANZA DE DEPENDENCIAS Y METADATOS (NSK EDITION)
Estatus: <SUPREME_ZENITH> | Subsistema: Global Infrastructure (pnpm + Nx)
Objetivo: Garantizar que el Monorepo sea una maquinaria ligera y rápida, erradicando dependencias fantasma y maximizando la eficiencia de los recursos en entornos de "Tier Zero".
1. LA DOCTRINA DE LA RAÍZ Y EL ENCLAVE (ROOT vs LEAF)
El comando pnpm es el arma de construcción del sistema. Su uso está rígidamente legislado:
A. La Soberanía de la Raíz (-w)
La Raíz es el Hardware de Vuelo. Solo contiene herramientas de desarrollo y orquestación.
Comando: pnpm add -D -w <librería>
Permitidos: nx, typescript, eslint, prettier, vitest, rimraf, tsx.
Prohibición Absoluta: Jamás instalar librerías de ejecución (react, zod, pino) en la raíz.
B. El Enclave del Búnker (Leaf)
Cada Búnker es una Nación Soberana. Debe declarar explícitamente su ADN.
Comando: pnpm --filter @razwritecore/[nombre] add <librería>
Ley de Identidad: El búnker no importa código de node_modules si el Shared ya lo provee.
2. LA DOCTRINA DE "PEER-DEPENDENCIES" (TIER ZERO OPTIMIZATION)
Para evitar que el Renderer Shell descargue 50 veces la misma librería:
Regla: Librerías core (react, zod, rxjs, lucide-react) deben declararse como peerDependencies en los búnkers de las capas shared, hardware e integration.
Consecuencia: El búnker confía en que el Kernel (App) ya tiene el motor instalado. Esto reduce el peso de cada búnker a pocos bytes de lógica pura.
3. PASAPORTE DE METADATOS ZENITH (PACKAGE.JSON DNA)
Todo archivo package.json debe seguir esta estructura inamovible para el rastro forense:
code
JSON
{
  "name": "@razwritecore/nsk-[layer]-[name]",
  "version": "1.0.0",
  "private": true,
  "author": "Raz Podestá <MetaShark Tech>",
  "description": "[ROLE: ROLE_ID] Descripción técnica sin abreviaciones.",
  "type": "module",
  "sideEffects": false, 
  "main": "./src/index.ts",
  "publishConfig": { "access": "restricted" }
}
sideEffects: false: Vital para el Tree-Shaking. Indica que el búnker no muta el estado global al ser importado.
4. FRONTERAS Y SCOPES (NX TAGS DEFINITIVOS)
El campo tags en project.json debe coincidir con la jerarquía del Manifiesto 006:
Capa (Layer)	Scope Tag	Prefijo del Name
Shared	scope:shared	@razwritecore/nsk-shared-
Hardware	scope:hardware	@razwritecore/nsk-hw-
Bunkers	scope:bunker	@razwritecore/nsk-bunker-
Integrations	scope:integration	@razwritecore/nsk-int-
Apps	scope:app	@razwritecore/nsk-app-
5. PROTOCOLO DE AUDITORÍA IA (DEPENDENCY_SENTINEL)
Cuando la IA deba modificar un búnker, activará este subproceso:
Check Registry: Escanear el pnpm-lock.yaml raíz. Si la librería existe, usar exactamente la misma versión.
Verify Peer Status: ¿Es una librería común? -> Mover a peerDependencies.
Workspace Linking: Toda dependencia interna debe usar el protocolo workspace:* (Ej: "@razwritecore/nsk-shared-crypto": "workspace:*").
Lint Metadata: Asegurar que author, type: module y sideEffects estén presentes.
🛠️ CASO DE USO: CREACIÓN DE UN POZO DE HARDWARE (GeoRefinery)
code
JSON
{
  "name": "@razwritecore/nsk-hw-geo",
  "version": "1.0.0",
  "description": "[ROLE: SENSOR] Refinería de geolocalización y contexto espacial.",
  "type": "module",
  "sideEffects": false,
  "peerDependencies": {
    "zod": "^4.0.0",
    "rxjs": "^7.0.0"
  },
  "dependencies": {
    "@razwritecore/nsk-shared-crypto": "workspace:*"
  }
}
