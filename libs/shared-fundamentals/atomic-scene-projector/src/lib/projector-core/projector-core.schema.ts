/**
 * @apparatus AtomicSceneProjectorDNA
 * @role Contratos genéticos para el Tenant Manifest y la Layout Matrix.
 * @location libs/shared-fundamentals/atomic-scene-projector/src/lib/projector-core/projector-core.schema.ts
 * @status <SEALED_PRODUCTION>
 * @version 9.0.0
 * @protocol OEDP-V8.5 Lattice
 */

import { z } from 'zod';

/**
 * @context_prompt [LIA Legacy - AI-Audit]
 * DIRECTIVA: Implementación de Identidad Genética de Inquilino (M-009).
 * JUSTIFICACIÓN: Todo inquilino debe estar definido por un Manifiesto Declarativo. 
 * Se inyecta branding nominal para `TenantId` y `BunkerId` para evitar radiación de tipos.
 */

export const TenantIdentifierSchema = z.string().uuid().brand<'TenantIdentifier'>();
export const BunkerIdentifierSchema = z.string().min(3).brand<'BunkerIdentifier'>();

/**
 * M-009: Clasificación de Peso Metabólico.
 */
export const MetabolicWeightSchema = z.enum(['LIGHT', 'MEDIUM', 'HEAVY', 'CRITICAL']);

/**
 * M-015: Definición de una Célula de la Matriz de Diseño.
 */
export const LayoutCellSchema = z.object({
  bunkerIdentifier: BunkerIdentifierSchema,
  priorityQoS: z.number().int().min(0).max(3),
  metabolicWeight: MetabolicWeightSchema,
  componentProperties: z.record(z.string(), z.unknown()),
  displayCondition: z.string().optional().describe('Lógica simple de visibilidad (ej: auth_only)'),
}).readonly();

/**
 * El Manifiesto del Inquilino: El mapa de la realidad proyectada.
 */
export const TenantManifestSchema = z.object({
  tenantIdentifier: TenantIdentifierSchema,
  version: z.string().regex(/^\d+\.\d+\.\d+$/),
  visualTokens: z.object({
    designSystem: z.enum(['Zenith_Dark', 'Obsidian_Gold', 'Liquid_Light']),
    primaryColor: z.string(),
    fontFamily: z.string(),
  }),
  layoutMatrix: z.array(LayoutCellSchema),
}).readonly();

export type ITenantManifest = z.infer<typeof TenantManifestSchema>;
export type ILayoutCell = z.infer<typeof LayoutCellSchema>;
export type ITenantIdentifier = z.infer<typeof TenantIdentifierSchema>;
export type IBunkerIdentifier = z.infer<typeof BunkerIdentifierSchema>;