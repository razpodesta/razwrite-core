/**
 * @apparatus SyncOsmosisIndex
 * @role Ministerio Exterior de la Membrana Osmótica (Fachada Opaca).
 * @location libs/bunkers/synchronization-osmosis/src/index.ts
 * @status <SEALED_PRODUCTION>
 * @version 9.5.1
 * @protocol OEDP-V8.5 Lattice
 */

/**
 * 1. ORQUESTADORES DE LÓGICA (NEXOS)
 * Sello corrección TS2305: Se exporta 'OsmosisCoreLogic' (Nombre soberano nivelado).
 */
export { OsmosisCoreLogic } from './lib/osmosis-core/osmosis-core.logic';

/**
 * 2. CONTRATOS DE ADN (ESQUEMAS DE VALIDACIÓN)
 * Sello corrección TS2305: Sincronización con ADN 9.5.0.
 */
export {
  OsmosisConfigurationSchema,
  OsmoticPulseSchema,
  // Transmutación de 'OsmoticPayloadIdSchema' a 'OsmoticPulseIdentifierSchema'
  OsmoticPulseIdentifierSchema as PulseIdentifierSchema
} from './lib/osmosis-core/osmosis-core.schema';

/**
 * 3. INFERENCIAS SOBERANAS (TIPOS NOMINALES)
 * Tipado estricto para la circulación de información en el Sovereign Nervous System.
 */
export type {
  IOsmosisConfiguration,
  IOsmoticPulse,
  IOsmoticPulseIdentifier
} from './lib/osmosis-core/osmosis-core.schema';

/**
 * 4. TIPADO DE INTELIGENCIA (CEREBRO)
 * Habilita la instanciación de Web Workers vía RPC (Comlink) para búnkeres de hardware.
 */
export type { IOsmosisCoreBrain } from './lib/osmosis-core/osmosis-core.worker';

/**
 * @context_prompt [LIA Legacy - AI-Audit]
 * DIRECTIVA: Sello de Ministerio y Erradicación de Radiación (TS2305).
 * JUSTIFICACIÓN: Se sustituyen las exportaciones erróneas por los miembros reales
 * definidos en la Penta-Estructura. Se aplica un alias semántico 'PulseIdentifierSchema'
 * para facilitar el consumo en el Nexo Conductual sin romper la bioseguridad.
 * IMPACTO: Sanación definitiva del ruteo hacia 'synchronization-osmosis'.
 */
