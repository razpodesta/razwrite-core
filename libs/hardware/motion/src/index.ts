/**
 * @apparatus KineticMotionMinistry
 * @role Punto de acceso único y sellado para la telemetría inercial.
 * @location libs/hardware/motion/src/index.ts
 * @status <SEALED_PRODUCTION>
 * @protocol OEDP-V8.5 Lattice
 */

// 1. Exportación del Cuerpo (Nexo)
export { KineticMotionLogic } from './lib/motion-refinery/motion-refinery.logic';

// 2. Exportación del Pulso (Contrato)
export { KineticMotionContract } from './lib/motion-refinery/motion-refinery.contract';

// 3. Exportación del ADN (Esquemas y Tipos Nominales)
export * from './lib/motion-refinery/motion-refinery.schema';
