/**
 * @apparatus PolymorphicQREngineDNA
 * @role Contratos genéticos para Vetores de Intenção Cifrados e Resposta Quântica.
 * @location libs/bunkers/polymorphic-qr/src/lib/polymorphic-qr-engine/polymorphic-qr-engine.schema.ts
 * @status <SEALED_PRODUCTION>
 * @version 9.5.0
 * @protocol OEDP-V8.5 Lattice
 * @structure ADN
 * @compliance ISO_27001 | ISO_25010
 */

import { z } from 'zod';

/**
 * @section DIMENSÕES NOMINAIS (M-005)
 * Selagem de tipos para o rastro forense inalterável.
 */
export const QRVectorIdentifierSchema = z.string()
  .uuid()
  .describe('Identificador único do vetor de intenção no sistema.')
  .brand<'QRVectorIdentifier'>();

export const EncryptedIntentionTokenSchema = z.string()
  .min(64)
  .describe('Opaque Data Stream (Matéria Escura) que será codificado no QR.')
  .brand<'EncryptedIntentionToken'>();

/**
 * @section ONTOLOGÍA DE INTENÇÃO (M-033)
 * Tipos de ações permitidas através do mundo físico.
 */
export const QRIntentionTypeSchema = z.enum([
  'FINANCIAL_SETTLEMENT',    // Pagamento imediato
  'IDENTITY_HANDSHAKE',     // Validação de presença física
  'TENANT_ONBOARDING',      // Registro em novo inquilino
  'QUANTUM_STATE_SHARING'   // Compartilhamento de progresso (M-034)
]);

/**
 * @section CONTRATO DE GERAÇÃO (M-010)
 * Requisitos para a forja de um novo vetor polimórfico.
 */
export const QRGeneratorInputSchema = z.object({
  intentionType: QRIntentionTypeSchema,
  tenantIdentifier: z.string().describe('ID do inquilino proprietário da campanha.'),
  payloadSnapshot: z.record(z.string(), z.unknown()).describe('Dados dinâmicos da intenção.'),

  // Protocolo de Escassez (Scarcity)
  expirationInSeconds: z.number().int().min(60).max(86400).optional(),
  maximumScanThreshold: z.number().int().positive().optional().default(1),
}).readonly();

/**
 * @section SNAPSHOT DO VETOR
 * Representação final do código para renderização no Canvas local.
 */
export const QRVectorSnapshotSchema = z.object({
  vectorIdentifier: QRVectorIdentifierSchema,
  intentionToken: EncryptedIntentionTokenSchema,
  visualMetadata: z.object({
    logoOverlayIdentifier: z.string().optional(),
    primaryColorHex: z.string().regex(/^#[0-9A-F]{6}$/i),
    errorCorrectionLevel: z.enum(['L', 'M', 'Q', 'H']).default('H'),
  }),
}).readonly();

/**
 * @section INFERÊNCIAS SOBERANAS
 */
export type IQRVectorIdentifier = z.infer<typeof QRVectorIdentifierSchema>;
export type IEncryptedIntentionToken = z.infer<typeof EncryptedIntentionTokenSchema>;
export type IQRIntentionType = z.infer<typeof QRIntentionTypeSchema>;
export type IQRGeneratorInput = z.infer<typeof QRGeneratorInputSchema>;
export type IQRVectorSnapshot = z.infer<typeof QRVectorSnapshotSchema>;

/**
 * @context_prompt [LIA Legacy - AI-Audit]
 * DIRECTIVA: Implementação de Resposta Quântica (M-033).
 * JUSTIFICACIÓN: O esquema garante que o QR não contenha URLs em texto plano.
 * O 'EncryptedIntentionToken' é a única ponte legal com o Edge Middleware.
 * IMPACTO: Segurança absoluta ISO 27001 e prevenção de engenharia reversa.
 */
