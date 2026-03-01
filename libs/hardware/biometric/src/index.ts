/**
 * @apparatus BiometricRefineryIndex
 * @role Ministerio de Salud del Hardware y Broker de Señales Vitales.
 * @location libs/hardware/biometric/src/index.ts
 * @status <LATTICE_INTEGRATED>
 * @protocol OEDP-V8.5 Lattice
 */

// 1. Exportación de la Lógica de Superficie (Nexo)
export { BiometricRefineryLogic } from './lib/biometric-refinery/biometric-refinery.logic';

// 2. Exportación del ADN (Tipos Nominales)
export {
  BiometricMetabolicPulseSchema,
  type IBiometricMetabolicPulse
} from './lib/biometric-refinery/biometric-refinery.schema';

// 3. Exportación del Cerebro (Tipo para el Worker)
export type { IBiometricRefineryWorker } from './lib/biometric-refinery/biometric-refinery.worker';
