/**
 * @apparatus PolymorphicQRIndex
 * @role Ministério de Resposta Quântica e única porta de entrada para vetores físicos (Fachada Opaca).
 * @location libs/bunkers/polymorphic-qr/src/index.ts
 * @status <SEALED_PRODUCTION>
 * @version 9.5.1
 * @protocol OEDP-V8.5 Lattice
 */

/**
 * 1. ORQUESTRADORES DE LÓGICA (NEXOS)
 * Acesso soberano à maquinaria de forja de vetores de intenção cifrados.
 */
export { PolymorphicQREngineLogic } from './lib/polymorphic-qr-engine/polymorphic-qr-engine.logic';

/**
 * 2. CONTRATOS DE ADN (ESQUEMAS DE VALIDAÇÃO)
 * Única fonte de verdade genética para geração e validação de snapshots visuais.
 */
export {
  QRIntentionTypeSchema,
  QRGeneratorInputSchema,
  QRVectorSnapshotSchema,
  QRVectorIdentifierSchema,
  EncryptedIntentionTokenSchema,
} from './lib/polymorphic-qr-engine/polymorphic-qr-engine.schema';

/**
 * 3. INFERÊNCIAS SOBERANAS (TIPOS NOMINALES)
 * Tipado estrito para a circulação de intenções físicas no Sovereign Nervous System.
 */
export type {
  IQRIntentionType,
  IQRGeneratorInput,
  IQRVectorSnapshot,
  IQRVectorIdentifier,
  IEncryptedIntentionToken,
} from './lib/polymorphic-qr-engine/polymorphic-qr-engine.schema';

/**
 * @context_prompt [LIA Legacy - AI-Audit]
 * DIRECTIVA: Sello de Ministerio y Erradicación de Radiación (M-010).
 * JUSTIFICACIÓN: Substituição de 'export *' por exportações nominativas controladas.
 * Garante que apenas os contratos validados e o orquestrador de lógica sejam
 * visíveis para o Renderer Shell, protegendo a topologia interna do búnker.
 * IMPACTO: Sanación definitiva da visibilidade no grafo de dependências Nx e
 * conformidade com a norma ISO 27001 sobre ocultação de mecanismos criptográficos.
 */
