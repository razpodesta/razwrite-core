/**
 * @apparatus PersistenceDNA
 * @role Contratos de validación para el almacenamiento y la recuperación de estado.
 * @location libs/modular-units/persistence/src/lib/persistence-core/persistence.schema.ts
 * @status <SEALED_PRODUCTION>
 * @version 8.6.0
 * @protocol OEDP-V8.5 Lattice
 */

import { z } from 'zod';

/**
 * @context_prompt [LIA Legacy - AI-Audit]
 * DIRECTIVA: Tipado Nominal para Claves de Persistencia.
 * JUSTIFICACIÓN: Evitar colisiones de espacio de nombres. Una clave de 'SETTINGS' no debe 
 * sobreescribir una clave de 'IDENTITY'.
 * IMPACTO: Integridad referencial en el almacenamiento Key-Value.
 */

export const PersistenceKeySchema = z.string().min(2).regex(/^[A-Z_]+$/).brand<'PersistenceKey'>();
export type IPersistenceKey = z.infer<typeof PersistenceKeySchema>;

/**
 * El contenedor físico que se guarda en IndexedDB.
 * Contiene el payload cifrado y metadatos de integridad.
 */
export const VaultArtifactSchema = z.object({
  key: PersistenceKeySchema,
  encryptedBlob: z.instanceof(ArrayBuffer), // Materia Oscura
  iv: z.instanceof(ArrayBuffer),            // Vector de Inicialización
  checksum: z.string(),                     // Hash SHA-256 para verificar anti-tampering
  updatedAt: z.number(),
}).readonly();

export type IVaultArtifact = z.infer<typeof VaultArtifactSchema>;

/**
 * Payload de transporte hacia el Worker
 */
export interface IEncryptionRequest {
  key: string;
  plainData: unknown;
}