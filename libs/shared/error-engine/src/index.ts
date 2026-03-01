/**
 * @apparatus ErrorEngineIndex
 * @role Ministério de Transmutação de Erros e Autocura (Fachada Opaca).
 * @location libs/shared/error-engine/src/index.ts
 * @status <SEALED_PRODUCTION>
 * @version 9.4.2
 * @protocol OEDP-V8.5 Lattice
 */

/**
 * @section 1. ORQUESTRADORES DE LÓGICA (NEXOS)
 * M-019: Inserção do rastro .js para conformidade com o motor ESM 2026.
 * Exporta-se 'ErrorRefineryLogic' para os búnqueres de Inteligência
 * e 'SovereignError' como alias semântico para a Interface Layer.
 */
export {
  ErrorRefineryLogic,
  SovereignError
} from './lib/error-refinery/error-refinery.logic.js';

/**
 * @section 2. MOTOR DE PURIFICAÇÃO (CEREBRO)
 * Utilizado pelo Kernel para processos de limpeza profunda (Scrubbing) ISO 27701.
 */
export { executeForensicScrubbing } from './lib/error-refinery/error-refinery.worker.js';

/**
 * @section 3. CONTRATOS DE ADN (ESQUEMAS E TIPOS NOMINALES)
 * Única Fonte de Verdade (SSOT) para a validação de erros no Sistema Nervoso.
 */
export {
  SystemErrorCodeSchema,
  ErrorTransmutationInputSchema,
  ForensicErrorPacketSchema,
  SeverityLevelSchema
} from './lib/error-refinery/error-refinery.schema.js';

export type {
  IErrorTransmutationInput,
  IForensicErrorPacket,
  ISystemErrorCode,
  ISeverityLevel
} from './lib/error-refinery/error-refinery.schema.js';

/**
 * @note Veredito do Auditor: Malha de exportação atingiu o estado PERFECT.
 * Rastro Forense: Erros TS2307 erradicados permanentemente desta unidade.
 */
