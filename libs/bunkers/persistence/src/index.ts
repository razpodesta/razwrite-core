/**
 * @apparatus PersistenceCoreIndex
 * @role Ministerio de Memoria Resiliente y única puerta de entrada a la Bóveda L2 (Fachada Opaca).
 * @location libs/bunkers/persistence/src/index.ts
 * @status <SEALED_PRODUCTION>
 * @version 9.0.0
 * @protocol OEDP-V8.5 Lattice
 */

/**
 * 1. ORQUESTADORES DE LÓGICA (NEXOS)
 * Único punto de contacto para la ignición de la bóveda y gestión de estado persistente.
 */
export { PersistenceCoreLogic } from './lib/persistence-core/persistence-core.logic';

/**
 * 2. CONTRATOS DE ADN (ESQUEMAS DE VALIDACIÓN)
 * Única fuente de verdad para la validación de claves y artefactos en la Celosía.
 */
export {
  PersistenceKeySchema,
  VaultArtifactSchema,
  PersistenceWriteInputSchema,
  PersistenceReadOutputSchema,
  ArtifactChecksumSchema,
} from './lib/persistence-core/persistence-core.schema';

/**
 * 3. INFERENCIAS SOBERANAS (TIPOS NOMINALES)
 * Contratos de tipado estricto para la circulación de información en el SNS.
 */
export type {
  IPersistenceKey,
  IVaultArtifact,
  IPersistenceWriteInput,
  IPersistenceReadOutput,
  IArtifactChecksum,
} from './lib/persistence-core/persistence-core.schema';

/**
 * 4. TIPADO DE INTELIGENCIA (CEREBRO)
 * Exportación del tipo del Worker para habilitar el Proxy RPC (Comlink) en los consumidores.
 */
export type { IPersistenceCoreBrain } from './lib/persistence-core/persistence-core.worker';

/**
 * @context_prompt [LIA Legacy - AI-Audit]
 * DIRECTIVA: Sello de Búnker y Sincronización de Fachada.
 * JUSTIFICACIÓN: Se erradican las rutas obsoletas y se centralizan las exportaciones
 * de la Penta-Estructura nivelada (ADN 9.5.0, Worker 9.8.2, Nexo 9.0.0).
 * Se cumple estrictamente con el Manifiesto 010.
 * IMPACTO: Sanación definitiva de importaciones en el Renderer Shell y otros búnkeres.
 */
