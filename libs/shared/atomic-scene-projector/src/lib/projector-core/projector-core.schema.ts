/**
 * @apparatus ProjectorCoreDNA
 * @role Especificación genética para la proyección de Escenas Bio-Sintéticas (SDUI).
 * @location libs/shared/atomic-scene-projector/src/lib/projector-core/projector-core.schema.ts
 * @status <STABILIZED>
 * @version 9.3.0
 * @protocol OEDP-V8.5 Lattice
 * @structure ADN
 */

import { z } from 'zod';

export const TenantIdentifierSchema = z.string().uuid().brand<'TenantIdentifier'>();
export const ApparatusIdentifierSchema = z.string().min(3).brand<'ApparatusIdentifier'>();
export const SemanticVersionSchema = z.string().regex(/^\d+\.\d+\.\d+$/).brand<'SemanticVersion'>();

export const MetabolicWeightSchema = z.enum(['LIGHT', 'MEDIUM', 'HEAVY', 'CRITICAL']);

export const NervousSystemContractSchema = z.object({
  authorizedIntentOpCodes: z.array(z.number().int()).readonly(),
  subscribedReactionOpCodes: z.array(z.number().int()).readonly(),
}).readonly();

export const LayoutCellSchema = z.object({
  apparatusIdentifier: ApparatusIdentifierSchema,
  apparatusVersion: SemanticVersionSchema.optional(),
  priorityQoS: z.number().int().min(0).max(3),
  metabolicWeight: MetabolicWeightSchema,
  componentProperties: z.record(z.string(), z.unknown()),
  nervousSystemOverride: NervousSystemContractSchema.optional(),
  displayCondition: z.string().optional(),
}).readonly();

export const TenantManifestSchema = z.object({
  tenantIdentifier: TenantIdentifierSchema,
  manifestVersion: SemanticVersionSchema,
  metadata: z.object({
    brandName: z.string(),
    languageEnvironment: z.enum(['en-US', 'es-ES', 'pt-BR']),
  }).readonly(),
  visualTokens: z.object({
    designSystem: z.enum(['Zenith_Dark', 'Obsidian_Gold', 'Liquid_Light']),
    primaryColor: z.string(),
    fontFamily: z.string(),
    borderRadius: z.string().optional(),
  }).readonly(),
  layoutMatrix: z.array(LayoutCellSchema),
}).readonly();

export type ITenantManifest = z.infer<typeof TenantManifestSchema>;
export type ILayoutCell = z.infer<typeof LayoutCellSchema>;
export type ITenantIdentifier = z.infer<typeof TenantIdentifierSchema>;
export type IApparatusIdentifier = z.infer<typeof ApparatusIdentifierSchema>;
export type ISemanticVersion = z.infer<typeof SemanticVersionSchema>;
