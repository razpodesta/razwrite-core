/**
@apparatus NxTagsAndBoundariesGovernance
@role Definición de Metadatos Estructurales, Control de Fronteras y Evidencia de Cumplimiento ISO.
@location .docs/manifiestos/032-nx-tags-and-boundaries-governance.md
@status <SUPREME_ZENITH>
@version 1.0.0
@protocol OEDP-V8.5 Lattice
*/
🏷️ MANIFIESTO 032: GOBERNANZA DE TAGS Y FRONTERAS SOBERANAS
Objetivo: Establecer una taxonomía de etiquetas (Tags) estricta y profesional para el ecosistema RazWrite Core. Este marco normativo permite realizar auditorías estáticas automáticas, garantizando que las dependencias fluyan de acuerdo con la ISO/IEC 25010 (Mantenibilidad) y que los perímetros de seguridad cumplan con la ISO 27001 (Confidencialidad).
1. ONTOLOGÍA DE TAGS (CATEGORÍAS MANDATORIAS)
Cada unidad modular en el archivo project.json debe poseer obligatoriamente un tag de cada una de las siguientes cuatro dimensiones:
A. Dimensión de Capa (layer:[valor])
Define la ubicación jerárquica en la Celosía (Lattice).
layer:fundamentals: Núcleos base del sistema (Shared). Sin dependencias internas.
layer:extraction-refinery: Unidades de acceso a hardware y sensores.
layer:modular-unit: Unidades de lógica de negocio y procesamiento de datos.
layer:infrastructure-adapter: Puentes con servicios externos y SDKs de terceros.
layer:application-shell: Ensambladores finales y puntos de entrada visual.
B. Dimensión de Dominio (domain:[valor])
Define el contexto funcional según el Domain-Driven Design (DDD).
domain:system-core: Servicios transversales (Crypto, Logging).
domain:identity: Gestión de sujetos y pasaportes mutantes.
domain:finance: Procesamiento transaccional y pagos.
domain:telemetry: Captura y refinamiento de eventos conductuales.
C. Dimensión de Cumplimiento ISO (iso:[valor])
Define qué estándar internacional audita la lógica de la unidad.
iso:27001: Unidad con peso en seguridad de la información (Cifrado, Identidad).
iso:27701: Unidad que gestiona PII (Privacidad de la información).
iso:25010: Unidad crítica para el rendimiento y la mantenibilidad.
D. Dimensión de Entorno de Ejecución (env:[valor])
Define en qué plano de la Trinidad (M-015) reside la lógica.
env:surface: Lógica de interfaz (Main Thread).
env:deep-pulse: Lógica de procesamiento asíncrono (Web Worker).
env:acid: Lógica de persistencia y servidor (Node/Edge).
2. REGLAS DE CONTROL DE FRONTERAS (BOUNDARY RULES)
El Linter de Nx (@nx/enforce-module-boundaries) debe configurarse para impedir la Radiación de Dependencias:
Filtro Vertical: Una capa inferior jamás puede importar de una capa superior (Ej: layer:fundamentals no puede importar de layer:modular-unit).
Aislamiento Horizontal (ISO 27017): Las layer:modular-unit no pueden importarse entre sí. La comunicación debe ser orquestada exclusivamente por el Sovereign Nervous System.
Restricción de Adaptador: Los layer:infrastructure-adapter solo pueden ser consumidos por layer:modular-unit o layer:application-shell.
3. PROCEDIMIENTO DE CREACIÓN PARA LA IA
LIA Legacy tiene prohibido generar un nuevo aparato si no incluye en el comando nx g o en el archivo project.json resultante la combinación técnica de tags nivelada.
Ejemplo de bloque project.json nivelado:
code
JSON
{
  "name": "unit-identity-mutant",
  "tags": [
    "layer:modular-unit",
    "domain:identity",
    "iso:27701",
    "env:deep-pulse"
  ]
}
4. AUDITORÍA DE EVIDENCIA
El Sentinel-Forensic-Tether utilizará estos tags para clasificar la telemetría enviada al Neural Sentinel. Un fallo en una unidad con el tag iso:27001 disparará un protocolo de emergencia de mayor prioridad que un fallo en una unidad sin este tag.
Firma de Autoridad:
Raz Podestá - Arquitecto Jefe 

---
ADENDUM A: PROTOCOLO DE NIVELACIÓN DINÁMICA Y GESTIÓN DE IMPACTO
Objetivo: Regular la transición de etiquetas (Tags) durante los procesos de refactorización activa para prevenir fallos en el grafo de dependencias y asegurar que la nivelación estructural sea síncrona con la lógica de negocio.
1. DIRECTIVA DE SINCRONIZACIÓN TÉCNICA
LIA Legacy asume la responsabilidad de nivelar los metadatos de los archivos project.json en paralelo con cualquier refactorización de código. No se considera terminada una tarea si los tags físicos no reflejan fielmente la nueva ontología definida en los Manifiestos 030, 031 y 032.
2. PROTOCOLO DE CONSULTA ANTE RIESGO DE CASCADA
Dada la naturaleza interconectada de la Celosía (Lattice), ciertos cambios de etiquetas pueden disparar violaciones de frontera en el Linter de Nx, bloqueando la compilación.
Acción Obligatoria: Si una actualización de Tags detecta un riesgo de error en cascada (Breaking Change estructural), la IA detendrá la ejecución y presentará al Arquitecto un Reporte de Impacto de Refactorización (RIR).
Prohibición: Queda prohibido aplicar cambios de etiquetas de forma silenciosa si estos resultan en la invalidación de más de dos unidades modulares dependientes.
3. ESTRUCTURA DEL REPORTE DE IMPACTO (RIR)
Ante una solicitud de nivelación compleja, la IA debe desglosar la información bajo los siguientes criterios profesionales:
Naturaleza del Cambio: Descripción del tag a transmutar (Ej: type:foundation ⮕ layer:fundamentals).
Impacto en el Grafo: Identificación de las unidades modulares que quedarán "huérfanas" o en conflicto tras el cambio.
Evidencia de Beneficio (ISO): Justificación de cómo el cambio mejora la métrica de mantenibilidad (ISO 25010) o seguridad (ISO 27001).
Plan de Mitigación: Propuesta de actualización de los depConstraints en el archivo eslint.config.mjs para validar la nueva frontera sin romper el flujo de desarrollo.
4. DETERMINISMO ESTRUCTURAL
La IA priorizará siempre la Estabilidad del Kernel sobre la velocidad de nivelación. Si el Arquitecto no autoriza el cambio tras leer el RIR, la IA mantendrá el estado previo, marcando la unidad con un tag de deuda técnica temporal: status:legacy-tags-pending.
Firma de Autoridad:
Raz Podestá - Arquitecto Jefe

---

