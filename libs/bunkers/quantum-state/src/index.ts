/**
 * @apparatus QuantumStateIndex
 * @role Ministerio de Memoria Atómica y única puerta de entrada al estado cuántico (Fachada Opaca).
 * @location libs/bunkers/quantum-state/src/index.ts
 * @status <SEALED_PRODUCTION>
 * @version 9.7.0
 * @protocol OEDP-V8.5 Lattice
 */

/**
 * 1. ORQUESTADORES DE LÓGICA (NEXOS)
 * Acceso soberano a la maquinaria de gestión de señales reactivas y mutaciones atómicas.
 */
export { QuantumStateManagerLogic } from './lib/quantum-state-manager/quantum-state-manager.logic';

/**
 * 2. CONTRATOS DE ADN (ESQUEMAS DE VALIDACIÓN)
 * Única fuente de verdad genética para claves de estado, snapshots e integridad cuántica.
 */
export {
  QuantumKeySchema,
  QuantumStateSnapshotSchema,
  SharedBufferContractSchema,
  StateEpochIdentifierSchema,
} from './lib/quantum-state-manager/quantum-state-manager.schema';

/**
 * 3. INFERENCIAS SOBERANAS (TIPOS NOMINALES)
 * Tipado estricto para la circulación de información inmutable en el Sovereign Nervous System.
 */
export type {
  IQuantumKey,
  IQuantumStateSnapshot,
  ISharedBufferContract,
  IStateEpochIdentifier,
} from './lib/quantum-state-manager/quantum-state-manager.schema';

/**
 * @context_prompt [LIA Legacy - AI-Audit]
 * DIRECTIVA: Sello de Ministerio y Erradicación de Radiación (M-010).
 * JUSTIFICACIÓN: Se sustituye 'export *' por exportaciones nominativas controladas.
 * Se asegura que solo los esquemas validados y el orquestador de lógica sean
 * visibles para el Renderer Shell, protegiendo los mecanismos internos de Signals.
 * IMPACTO: Sanación definitiva de la visibilidad en el grafo de dependencias Nx
 * y cumplimiento de la norma ISO 27001 sobre aislamiento de procesos.
 */
