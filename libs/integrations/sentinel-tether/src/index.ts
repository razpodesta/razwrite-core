/**
 * @apparatus SentinelTether
 * @role Fachada de exportación soberana para el túnel de telemetría forense.
 * @location libs/integrations/sentinel-tether/src/index.ts
 * @protocol OEDP-V8.5 Lattice
 */

// Exportación del Cuerpo (Nexo)
// Corregimos la ruta hacia el subdirectorio físico 'tether-core'
export { SentinelForensicTether } from './lib/tether-core/tether-core.logic';

// Exportación del ADN (Contratos Nominales)
export * from './lib/tether-core/tether-core.schema';
