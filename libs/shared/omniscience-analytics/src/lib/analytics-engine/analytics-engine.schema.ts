/**
 * @apparatus OmniscienceAnalyticsDNA
 * @role Especificación genética para el perfilamiento conductual y estados de afinidad.
 * @location libs/shared/omniscience-analytics/src/lib/analytics-engine/analytics-engine.schema.ts
 * @status <STABILIZED>
 * @version 1.0.0
 * @protocol OEDP-V8.5 Lattice
 * @structure ADN
 * @compliance ISO_27701
 */

import { z } from 'zod';
import { MutantPassportIdentifierSchema } from '@razwritecore/nsk-shared-logger';

/**
 * @section DIMENSIONES NOMINALES (M-005)
 */
export const AffinityScoreSchema = z.number().min(0).max(100).brand<'AffinityScore'>();
export const ScenarioIdentifierSchema = z.string().min(4).brand<'ScenarioIdentifier'>();

/**
 * @section EL GEMELO PSICOLÓGICO (Psychological Twin)
 * Representación analítica de un MutantID basada en su comportamiento histórico.
 */
export const PsychologicalTwinSnapshotSchema = z.object({
  mutantPassportIdentifier: MutantPassportIdentifierSchema,
  behavioralAffinity: z.object({
    aestheticAffinitty: AffinityScoreSchema.describe('Interés en búnkeres visuales de alta resolución.'),
    functionalAffinity: AffinityScoreSchema.describe('Uso de integraciones externas (Pagos, Maps).'),
    transactionalUrgency: AffinityScoreSchema.describe('Velocidad de interacción en procesos QoS 0.'),
  }).readonly(),
  lastScenarioActive: ScenarioIdentifierSchema,
  systemConfidenceScore: z.number().min(0).max(1).describe('Certeza de la IA sobre este perfil.'),
}).readonly();

/**
 * @section CARGAMENTO DE INGESTIÓN
 * Datos descifrados listos para ser procesados por el motor de inteligencia.
 */
export const DecodedTelemetryInputSchema = z.object({
  mutantPassportIdentifier: MutantPassportIdentifierSchema,
  apparatusOpCode: z.number().int(),
  operationOpCode: z.number().int(),
  informationPayloadSnapshot: z.record(z.string(), z.unknown()),
  executionLatency: z.number().nonnegative(),
}).readonly();

/**
 * @section INFERENCIAS SOBERANAS
 */
export type IPsychologicalTwinSnapshot = z.infer<typeof PsychologicalTwinSnapshotSchema>;
export type IDecodedTelemetryInput = z.infer<typeof DecodedTelemetryInputSchema>;
export type IScenarioIdentifier = z.infer<typeof ScenarioIdentifierSchema>;
