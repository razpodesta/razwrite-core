/**
 * @apparatus BehavioralIndex
 * @role Ministerio de Inteligencia Conductual y única puerta de entrada al clúster (Fachada Opaca).
 * @location libs/bunkers/behavioral/src/index.ts
 * @status <SEALED_PRODUCTION>
 * @version 9.0.0
 * @protocol OEDP-V8.5 Lattice
 */

/**
 * 1. COMPONENTES DE SUPERFICIE (CUERPO)
 * Punto de ignición visual para la captura pasiva de telemetría.
 */
export { BehavioralRefinery } from './lib/behavioral-refinery/behavioral-refinery';

/**
 * 2. ORQUESTADORES DE LÓGICA (NEXO)
 * Acceso directo a la maquinaria de ignición y despacho de ráfagas.
 */
export { BehavioralRefineryLogic } from './lib/behavioral-refinery/behavioral-refinery.logic';

/**
 * 3. CONTRATOS DE ADN (ESQUEMAS DE VALIDACIÓN)
 * Única fuente de verdad genética para pulsos conductuales y estados psicológicos.
 */
export {
  RefinedBehavioralPulseSchema,
  PsychologicalStateSchema,
  InteractionOpCodeSchema,
  RawInteractionPointSchema,
} from './lib/behavioral-refinery/behavioral-refinery.schema';

/**
 * 4. INFERENCIAS SOBERANAS (TIPOS NOMINALES)
 * Tipado estricto para la circulación de información en el Sovereign Nervous System.
 */
export type {
  IRefinedBehavioralPulse,
  IPsychologicalState,
  IInteractionOpCode,
  IRawInteractionPoint,
} from './lib/behavioral-refinery/behavioral-refinery.schema';

/**
 * 5. TIPADO DE INTELIGENCIA (CEREBRO)
 * Exportación del tipo del Worker para habilitar el Proxy RPC (Comlink).
 */
export type { IBehavioralRefineryBrain } from './lib/behavioral-refinery/behavioral-refinery.worker';

/**
 * @context_prompt [LIA Legacy - AI-Audit]
 * DIRECTIVA: Sello de Ministerio y Erradicación de Radiación.
 * JUSTIFICACIÓN: Se sustituye 'export *' por exportaciones nominativas controladas.
 * Se corrigen las rutas relativas hacia la subcarpeta 'lib/' para sanar el ruteo del tsconfig.
 * IMPACTO: Cumplimiento del Manifiesto 010 y eliminación de colisiones de tipos en el Kernel.
 */
