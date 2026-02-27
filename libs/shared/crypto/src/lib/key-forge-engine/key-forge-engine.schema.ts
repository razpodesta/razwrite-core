/**
 * @apparatus KeyForgeEngineDNA
 * @role Especificación genética para la derivación de llaves maestras y gestión de entropía.
 * @location libs/shared/crypto/src/lib/key-forge-engine/key-forge-engine.schema.ts
 * @status <SEALED_PRODUCTION>
 * @version 9.0.0
 * @protocol OEDP-V8.5 Lattice
 * @structure ADN
 * @compliance ISO_27001
 */

import { z } from 'zod';

/**
 * @section DIMENSIONES NOMINALES (M-005)
 */
export const KeyEntropyMaterialSchema = z.string().min(16).brand<'KeyEntropyMaterial'>();
export const SaltContextIdentifierSchema = z.string().min(8).brand<'SaltContextIdentifier'>();

/**
 * @section CARGAMENTO DE ENTRADA (M-010)
 * Contrato para la derivación determinística de llaves AES-GCM.
 */
export const MasterKeyDerivationInputSchema = z.object({
  secretMaterial: KeyEntropyMaterialSchema.describe('Material de entropía base (ej: User Signature).'),
  saltContext: SaltContextIdentifierSchema.describe('Contexto de sal inyectado (ej: MutantID + AppID).'),
}).readonly();

/**
 * @section INFERENCIAS SOBERANAS
 */
export type IMasterKeyDerivationInput = z.infer<typeof MasterKeyDerivationInputSchema>;
