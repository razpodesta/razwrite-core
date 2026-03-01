/**
 * @apparatus GeographicRefineryMinistry
 * @role Punto de acceso único y sellado para el contexto espacial del hardware.
 * @location libs/hardware/geographic/src/index.ts
 * @status <SEALED_PRODUCTION>
 * @protocol OEDP-V8.5 Lattice
 */

// 1. Exportación del Cuerpo (Nexo de Lógica)
export { GeographicRefineryLogic } from './lib/geographic-refinery/geographic-refinery.logic';

// 2. Exportación del Pulso (Contrato SNS)
export { GeographicRefineryContract } from './lib/geographic-refinery/geographic-refinery.contract';

// 3. Exportación del ADN (Contratos de Datos Nominales)
export * from './lib/geographic-refinery/geographic-refinery.schema';

// 4. Exportación de Utilidades de Transmutación
export { GeographicContextTransmuter } from './lib/geographic-refinery/logic/geographic-context-transmuter.logic';
