/**
 * @apparatus PersistenceCoreDNA
 * @role Contratos genéticos para la Bóveda Tricameral y Memoria Resiliente.
 * @location libs/bunkers/persistence/src/lib/persistence-core/persistence-core.schema.ts
 * @status <SEALED_PRODUCTION>
 * @version 9.5.0
 * @protocol OEDP-V8.5 Lattice
 * @structure ADN
 * @compliance ISO_27001 | ISO_27701
 */

import { z } from 'zod';

/**
 * @section DIMENSIONES NOMINALES (M-005)
 * Sellado de claves y metadatos de integridad.
 */
export const PersistenceKeySchema = z.string()
  .min(2)
  .regex(/^[A-Z0-9_]+$/)
  .brand<'PersistenceKey'>();

export const ArtifactChecksumSchema = z.string()
  .min(64)
  .brand<'ArtifactChecksum'>();

/**
 * @section TAXONOMÍA DE ALMACENAMIENTO (M-023)
 */
export const StorageLayerSchema = z.enum(['L1_RAM', 'L2_INDEXEDDB', 'L3_COOKIE']);

/**
 * @section ARTEFACTO DE LA BÓVEDA (VAULT ARTIFACT)
 * El contenedor físico inmutable para datos en reposo.
 */
export const VaultArtifactSchema = z.object({
  // Identificador único de la rama de datos
  key: PersistenceKeySchema,

  // Materia Oscura (Datos cifrados AES-GCM)
  encryptedPayload: z.instanceof(Uint8Array).describe('Cargamento cifrado.'),

  // Vector de Inicialización (NIST standard 96-bit)
  initializationVector: z.instanceof(Uint8Array).describe('IV determinístico.'),

  // Sello de integridad SHA-256 (Anti-tampering)
  integrityHash: ArtifactChecksumSchema,

  // Metadatos de Gobernanza
  metadata: z.object({
    schemaVersion: z.string().describe('Versión del ADN al momento del sellado.'),
    metabolicWeight: z.enum(['LIGHT', 'MEDIUM', 'HEAVY']),
    timestamp: z.number().int(),
    isCompressed: z.boolean().default(false),
  }),
}).readonly();

/**
 * @section CARGAMENTOS DE INTERACCIÓN (M-010)
 */
export const PersistenceWriteInputSchema = z.object({
  targetKey: PersistenceKeySchema,
  informationMaterial: z.unknown().describe('Datos planos a transmutar.'),
  priority: z.enum(['VITAL', 'CRITICAL', 'RESILIENT']).default('RESILIENT'),
}).readonly();

export const PersistenceReadOutputSchema = z.object({
  key: PersistenceKeySchema,
  decryptedData: z.unknown(),
  lastSyncTimestamp: z.number().int(),
}).readonly();

/**
 * @section INFERENCIAS SOBERANAS
 */
export type IPersistenceKey = z.infer<typeof PersistenceKeySchema>;
export type IArtifactChecksum = z.infer<typeof ArtifactChecksumSchema>;
export type IVaultArtifact = z.infer<typeof VaultArtifactSchema>;
export type IPersistenceWriteInput = z.infer<typeof PersistenceWriteInputSchema>;
export type IPersistenceReadOutput = z.infer<typeof PersistenceReadOutputSchema>;
