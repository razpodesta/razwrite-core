🏷️ MANIFIESTO #012: SOBERANÍA EVOLUTIVA Y SELLADO DE LANZAMIENTOS (NSK EDITION)
Estatus: <SUPREME_ZENITH> | Subsistema: Global Governance (Nx Release / Git)
Objetivo: Establecer un protocolo determinístico de evolución del código, donde cada lanzamiento sea una consecuencia matemática del impacto en el grafo de dependencias, garantizando regresión cero.
1. LA DOCTRINA DEL LANZAMIENTO ATÓMICO (INDEPENDENT)
El ecosistema NSK es un enjambre de entidades independientes.
Soberanía de Versión: Cada búnker (libs/bunkers/*), pozo (libs/hardware/*) y utilidad (libs/shared/*) posee su propio version en package.json.
Cero Arrastre: Un fix en el hardware-geo genera una nueva versión 1.0.1 de ese pozo, pero no afecta la versión del identity-bunker a menos que este último sea re-testeado y sellado.
2. EL COMBUSTIBLE: CONVENTIONAL COMMITS NSK
Para que el motor nx release y la IA puedan calcular el impacto, el desarrollador (Humano o IA) debe usar estrictamente esta gramática:
feat(scope):: Nueva capacidad (MINOR). Ej: feat(hw-geo): add altimeter refinery.
fix(scope):: Reparación de lógica (PATCH). Ej: fix(bunker-sync): resolve race condition in L2.
refactor(scope):: Mejora de código sin cambio funcional (CERO VER).
dna(scope)!:: CAMBIO EN ESQUEMA ZOD. (FORZA MINOR/MAJOR). Ej: dna(shared-sdui)!: add versioning to manifest.
docs/chore/test:: Mantenimiento (CERO VER).
3. LA IA COMO GRAN VIZIR DE LANZAMIENTOS
La IA actúa como el Release Manager bajo la orden "LIA, prepara lanzamiento".
Análisis de Grafo: Consulta a Nx: nx graph --affected. Identifica qué búnkeres "sienten" el cambio.
Auditoría de DNA: Si detecta cambios en archivos .schema.ts, eleva automáticamente la severidad del release.
Validación Espejo (M-014): Verifica que los búnkeres afectados tengan un paso de test exitoso en el CI/CD.
Generación de Changelog: Crea un resumen técnico sin abreviaciones, categorizando por Capas de Soberanía (M-006).
4. FLUJO DE SELLADO (WORKFLOW)
El proceso es una Ceremonia de Integridad:
Pre-Flight: pnpm nx release --dry-run.
Auditoría: La IA presenta el reporte: "Arquitecto, el cambio en Shared-Crypto impacta a 4 búnkeres. Propongo 1 MINOR y 3 PATCH. ¿Sellamos?"
Ignition: Al confirmar, el sistema:
Incrementa versiones en package.json.
Actualiza los punteros workspace:* (M-011).
Genera CHANGELOG.md atómicos por búnker.
Crea un único commit de release: chore(release): seal nsk-ecosystem [timestamp].
Crea Tags de Git independientes: nsk-bunker-identity@2.1.0.
5. LA REGLA DE LA HISTORIA INMUTABLE
Tags Sagrados: Una vez que un tag toca el repositorio, es inalterable. No se permite git tag -d en producción.
Failsafe de Reversión: Si un release falla, se emite un nuevo fix que revierte la lógica y sube el PATCH, manteniendo la trazabilidad del error.
🛠️ CASO DE USO: ACTUALIZACIÓN DE SEGURIDAD CRÍPTICA
Evento: Se optimiza el algoritmo de firma en shared-crypto.
Commit: fix(shared-crypto): optimize HMAC signature for Web Workers.
AI Audit: Detecta que shared-crypto es usado por identity-bunker y events-bunker.
Decision:
shared-crypto: 1.0.0 -> 1.0.1 (PATCH)
identity-bunker: 2.0.0 -> 2.0.1 (PATCH - Por dependencia)
events-bunker: 1.5.0 -> 1.5.1 (PATCH - Por dependencia)
Seal: Se generan 3 tags y un solo rastro forense coordinado.

---
