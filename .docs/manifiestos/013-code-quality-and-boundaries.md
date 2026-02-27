# 🛡️ MANIFIESTO 013: SOBERANÍA DEL COMPILADOR Y ESTÁNDARES DE CALIDAD (LINTING)
**Estatus:** VIGENTE | **Subsistema:** Global (TypeScript / ESLint / Nx)
**Objetivo:** Definir la configuración base del compilador (`tsconfig`) y las reglas de policía del código (`eslint`). Garantizar que el sistema sea un organismo vivo que rechaza activamente el código de baja calidad, las abreviaciones y las violaciones de fronteras.

## 1. LA CONSTITUCIÓN DEL COMPILADOR (TSCONFIG.BASE.JSON)
El archivo `tsconfig.base.json` en la raíz es la **Verdad Única**. Todos los búnkeres deben extender de él.
*   **Strict Mode:** Siempre `true`. No se permite código laxo.
*   **Path Mappings (Alias):** Es el sistema de carreteras del monorepo.
    *   ✅ Correcto: `import { Logger } from '@razwritecore/logger'`
    *   🚫 Prohibido: `import { Logger } from '../../libs/foundation/logger'`
*   **Incremental Builds:** Activado (`tsbuildinfo`) para que la compilación sea veloz como el rayo, re-compilando solo lo que cambió.

## 2. LA DOCTRINA DE LA HERENCIA DEL LINTER (ESLINT)
El Linter no es una sugerencia, es la Ley. Funciona bajo un modelo de **Federación**:

### A. La Constitución Federal (Raíz `.eslintrc.json` o `eslint.config.mjs`)
Contiene las reglas innegociables que aplican a TODO el universo RazWrite Core:
1.  **Zero Any Policy:** `@typescript-eslint/no-explicit-any: error`.
2.  **Zero Abbreviations:** `no-restricted-syntax` para bloquear `req`, `res`, `err`, `btn`.
3.  **Module Boundaries:** `@nx/enforce-module-boundaries`.

### B. Las Leyes Locales (Workspace `.eslintrc.json`)
Cada búnker tiene su propio archivo de configuración que **EXTIENDE** de la raíz y añade reglas específicas a su naturaleza:
*   **Búnker React:** Extiende reglas de Hooks y JSX A11y.
*   **Búnker Node/API:** Desactiva reglas de React, activa reglas de seguridad de Backend.
*   **Búnker de Testing:** Permite ciertas flexibilidades (como `any` en mocks muy complejos, bajo revisión).

## 3. PREVENCIÓN DE APARATOS ZOMBIS (ZOMBIE PREVENTION)
Un "Aparato Zombi" es un workspace que existe en el disco pero no es auditado por el sistema CI/CD.
*   **Regla de Oro:** Todo `project.json` debe tener obligatoriamente un target `lint`.
*   **Vigilancia:** Si la IA crea un nuevo búnker, debe verificar inmediatamente que `nx lint nombre-del-bunker` funcione. Si no hay Linter, el búnker se considera "No Nacido" y debe ser reparado o eliminado.

## 4. LAS FRONTERAS DE SEGURIDAD (MODULE BOUNDARIES)
El sistema de etiquetas (`tags`) en `project.json` define quién puede hablar con quién. Esto evita la "Arquitectura Espagueti".

| Nivel | Tag (Source) | Solo puede importar de (Target) |
| :--- | :--- | :--- |
| **Foundation** | `type:foundation` | `type:foundation` (Nadie más) |
| **Integrations** | `type:integration` | `type:foundation` |
| **Realms (Domain)**| `type:domain` | `type:foundation`, `type:integration`, `type:util` |
| **Realms (UI)** | `type:ui` | `type:foundation`, `type:util` (Nunca integration directa) |
| **Apps** | `type:app` | **TODO** (Es el ensamblador final) |

## 5. PROTOCOLO DE CALIDAD INCREMENTAL
La calidad no es estática. El Linter es un organismo vivo.
*   **Evolución:** Si detectamos un patrón de error recurrente en los Pull Requests humanos (ej: usar `console.log` en lugar de `SovereignLogger`), la IA debe proponer agregar una nueva regla al ESLint raíz para automatizar el rechazo de ese error en el futuro.
*   **Pre-Commit (Husky):** Ningún código entra al repositorio sin pasar por `lint-staged`. La IA debe respetar esto y entregar código que ya cumpla las reglas.

---

ADÉNDUM A: INMUTABILIDAD DE LAS ARTERIAS (V8.12)
El mapeo de paths en el tsconfig.base.json se considera Infraestructura Crítica.
Queda prohibido el uso de abreviaturas en los alias (@geo, @bio, @sync).
Cada entrada debe ser un espejo exacto de la jerarquía definida en el Manifiesto 006.
Cualquier adición de una nueva biblioteca debe ser notificada al Metabolic Scheduler para auditar el peso del grafo de dependencias antes de ser aceptada en el mapa maestro.

---

