/**
 * @apparatus DomainClusteringGovernance
 * @role Regulación de la Granularidad Física, Agrupación de Dominios y Prevención de Sobrecarga de Grafo.
 * @location .docs/manifiestos/036-domain-clustering-governance.md
 * @status <SUPREME_ZENITH>
 * @version 1.0.0
 * @protocol OEDP-V8.5 Lattice
 */

# 📦 MANIFIESTO 036: DOCTRINA DE AGRUPACIÓN POR DOMINIO (DOMAIN CLUSTERING)

**Objetivo:** Establecer la frontera técnica entre una "Librería de Infraestructura" (Workspace Nx) y una "Unidad Modular" (Aparato Interno). Esta doctrina garantiza el cumplimiento de la norma ISO/IEC 25010 (Eficiencia de Desempeño y Mantenibilidad), previniendo la explosión de bibliotecas en el monorepo y maximizando la cohesión interna.

## 1. LA LEY DEL CONTINENTE Y EL ESTADO (MACRO VS MICRO)

Bajo la arquitectura Lattice V8.5, rige la siguiente taxonomía de contenedores:

*   **El Continente (Nx Workspace / Librería):** Es el directorio generado vía `nx g @nx/js:lib`. Define un Dominio de Negocio o Técnico amplio (Ej: `unit-identity-mutant`). Posee su propio `package.json`, configuración de Linter y dependencias externas.
*   **El Estado Soberano (Unidad Modular / Lego):** Es el subdirectorio ubicado dentro de `src/lib/` del Continente. Contiene la Penta-Estructura estricta (Cuerpo, ADN, Nexo, Cerebro, Pulso). Ejecuta una sola responsabilidad atómica (Ej: `oblivion-engine`).

## 2. REGLA DE PROHIBICIÓN DE FRAGMENTACIÓN INNECESARIA

La Inteligencia Artificial (LIA Legacy) y los ingenieros humanos **tienen prohibido** crear un nuevo Workspace Nx para cada nueva funcionalidad. 
*   **Decisión de Inserción:** Antes de ejecutar un comando de generación de librería, se debe evaluar si la nueva lógica pertenece al dominio de un Continente existente.
*   *Ejemplo:* La lógica de "Cifrado de Imágenes" no requiere una librería `@razwritecore/opaque-media`. Debe insertarse como una Unidad Modular dentro del continente `@razwritecore/shared-crypto`.

## 3. COMPARTICIÓN DE INTERFACES PRIVADAS (INTRA-DOMAIN ROUTING)

*   Las Unidades Modulares que residen en el mismo Continente (Workspace) pueden compartir tipos e interfaces privadas evadiendo el aislamiento estricto, siempre y cuando no generen dependencias circulares.
*   Esto permite que el `oblivion-engine` y el `roaming-handshake` se comuniquen internamente a la velocidad de la memoria, exponiendo al exterior un único frente.

## 4. LA FACHADA MAESTRA DE DOMINIO

El archivo `src/index.ts` del Workspace actuará como el **Ministerio de Relaciones Exteriores** del Continente. Exportará de forma selectiva los objetos constantes y los contratos de cada Unidad Modular interna, bloqueando el acceso a sus mecanismos privados.

```typescript
// Ejemplo de Exportación Consolidada en: libs/modular-units/identity-mutant/src/index.ts
export { IdentityCoreEngine } from './lib/identity-core/identity.logic';
export { OblivionEngine } from './lib/oblivion-engine/oblivion.logic';
export type { IMutantPassport } from './lib/identity-core/identity.schema';

---

---
## ADÉNDUM A: SUB-CLÚSTERES EN CAPA ZERO (SHARED COHESION)

Las unidades modulares de la Capa Shared (ej: `nervous-system`) deben operar como micro-clústeres. 
- Cada responsabilidad (ej: `IntentionRouter`, `QuantumBridge`) debe poseer su propio subdirectorio interno con su respectiva lógica aislada.
- El archivo `index.ts` de la librería compartida actuará como el único "Broker" de estas capacidades hacia el resto del Lattice.

---