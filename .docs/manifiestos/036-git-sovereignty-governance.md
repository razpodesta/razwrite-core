/**
 * @apparatus GitSovereigntyGovernance
 * @role Regulacion de flujos de trabajo en Git, Auditoria de Ramas y Puertos de Calidad.
 * @location .docs/manifiestos/036-git-sovereignty-governance.md
 * @status <SEALED_PRODUCTION>
 * @version 1.0.0
 * @protocol OEDP-V8.5 Lattice
 */

# ⚖️ MANIFIESTO 036: GOBERNANZA DE GIT Y AUDITORIA SISTEMICA

## 1. LEY DE LA RAMA PRINCIPAL (MAIN)
El RazWrite Core utiliza estrictamente la rama `main` como origen de la verdad y base de comparación. Todas las herramientas de automatización (Nx, CI/CD, Scripts locales) deben apuntar a esta coordenada. Se prohíbe el uso de la nomenclatura `master` para evitar colisiones en el rastro forense.

## 2. DOCTRINA DE AUDITORIA DUAL
Para balancear la velocidad de desarrollo con la seguridad sistémica, se implementan dos modos de ejecución:

1.  **Modo "Affected" (Carga Ligera):** 
    - Comandos: `pnpm aduana:total`.
    - Lógica: Compara el estado actual contra el último commit en `main`. Solo audita los búnkeres modificados.
    - Uso: Obligatorio antes de cada commit individual.

2.  **Modo "Global" (Carga Profunda):**
    - Comandos: `pnpm aduana:global:total`.
    - Lógica: Ignora el historial de cambios y audita el 100% de la celosía (281+ aparatos).
    - Uso: Obligatorio tras refactorizaciones de la Capa Zero (Shared) y antes de despliegues a producción.

## 3. JUSTIFICACION TECNICA (ISO 25010)
Esta arquitectura garantiza la mantenibilidad y previene el "Efecto Silencioso", donde un cambio pequeño en un fundamento compartido rompe búnkeres distantes sin que el desarrollador lo note por falta de escaneo. El modo Global asegura integridad absoluta.

---
