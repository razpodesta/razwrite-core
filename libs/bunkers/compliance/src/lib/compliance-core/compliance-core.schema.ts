/**
 * @apparatus ComplianceCoreDNA
 * @role Contratos genéticos para la bioseguridad y tokenización de acceso.
 * @location libs/bunkers/compliance/src/lib/compliance-core/compliance-core.schema.ts
 * @status <SEALED_PRODUCTION>
 * @version 1.1.0
 * @protocol OEDP-V8.5 Lattice
 */

import { z } from 'zod';

export const ComplianceTokenSchema = z.string().min(32).brand<'ComplianceToken'>();
export type IComplianceToken = z.infer<typeof ComplianceTokenSchema>;

export const PermissionTypeSchema = z.enum([
  'GEOGRAPHIC_ACCESS',
  'BIOMETRIC_READ',
  'KINETIC_TRACKING',
  'PROXIMITY_IOT',
  'BEHAVIORAL_TELEMETRY'
]);
export type IPermissionType = z.infer<typeof PermissionTypeSchema>;

/**
 * M-025: Cargamento Único de Solicitud de Permiso.
 */
export const BiosecurityGrantInputSchema = z.object({
  permissionRequested: PermissionTypeSchema,
  expirationInSeconds: z.number().int().min(60).max(3600).default(300),
  justificationSemanticKey: z.string().describe('Ruta i18n para explicar el motivo.'),
}).readonly();

export type IBiosecurityGrantInput = z.infer<typeof BiosecurityGrantInputSchema>;

/**
 * Registro de Verdad de Cumplimiento (ISO 27701).
 */
export const ConsentSnapshotSchema = z.object({
  activePermissions: z.array(PermissionTypeSchema),
  jurisdictionCode: z.string().length(2),
  lastAuditTimestamp: z.number().int(),
}).readonly();

export type IConsentSnapshot = z.infer<typeof ConsentSnapshotSchema>;
