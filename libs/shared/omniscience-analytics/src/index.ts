/**
 * @apparatus OmniscienceAnalyticsFacade
 * @role Ministério de Inteligência e única porta de entrada para o Córtex Analítico.
 * @location libs/shared/omniscience-analytics/src/index.ts
 * @status <SEALED_PRODUCTION>
 * @version 1.0.2
 * @protocol OEDP-V8.5 Lattice
 */

// --- 1. MOTOR DE INFERÊNCIA (NEXO) ---
// Exportação do objeto constante que processa a "Matéria Escura".
export { OmniscienceAnalyticsEngine } from './lib/analytics-engine/analytics-engine.logic';

// --- 2. CONTRATOS DE ADN (ESQUEMAS) ---
// Validação Zod para o Gemelo Psicológico e ingestão de telemetria.
export {
  PsychologicalTwinSnapshotSchema,
  DecodedTelemetryInputSchema,
  AffinityScoreSchema,
  ScenarioIdentifierSchema
} from './lib/analytics-engine/analytics-engine.schema';

// --- 3. INFERÊNCIAS SOBERANAS (TIPOS) ---
export type {
  IPsychologicalTwinSnapshot,
  IDecodedTelemetryInput,
  IScenarioIdentifier
} from './lib/analytics-engine/analytics-engine.schema';
