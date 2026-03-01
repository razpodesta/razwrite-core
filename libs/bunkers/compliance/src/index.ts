/**
 * @apparatus ComplianceIndex
 * @role Ministerio de Cumplimiento y Bioseguridad (Fachada Opaca).
 * @location libs/bunkers/compliance/src/index.ts
 * @status <SEALED_PRODUCTION>
 * @version 1.1.2
 * @protocol OEDP-V8.5 Lattice
 */

// 1. Exportación del Orquestador (Nexo) siguiendo el Patrón Fachada (M-010)
export { ComplianceBunker } from './lib/compliance-core/compliance-core.logic';

// 2. Exportación Selectiva de ADN (Tipos Nominales y Esquemas)
// Evitamos 'export *' para prevenir colisiones en el Sovereign Nervous System.
export {
  ComplianceTokenSchema,
  PermissionTypeSchema,
  BiosecurityGrantInputSchema,
  ConsentSnapshotSchema,
} from './lib/compliance-core/compliance-core.schema';

// 3. Inferencia de Tipos para Consumidores (Contratos de Bioseguridad)
export type {
  IComplianceToken,
  IPermissionType,
  IBiosecurityGrantInput,
  IConsentSnapshot,
} from './lib/compliance-core/compliance-core.schema';
