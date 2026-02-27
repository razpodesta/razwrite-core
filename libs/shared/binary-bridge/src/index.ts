/**
 * @apparatus BinaryBridgeFacade
 * @role Ministerio de Potencia Binaria y punto de entrada para núcleos Rust/WASM.
 * @location libs/shared/binary-bridge/src/index.ts
 * @status <SEALED_PRODUCTION>
 * @version 1.0.2
 * @protocol OEDP-V8.5 Lattice
 */

// 1. Orquestador Maestro (Nexo)
// Se exporta la lógica de ignición y mediación Comlink.
export { BinaryBridgeLogic } from './lib/binary-core/binary-core.logic';

// 2. Contratos de ADN (Esquemas y Tipos)
// Cumplimiento estricto de M-005 y M-010.
export {
  BinaryModuleIdentifierSchema,
  BinaryIgnitionInputSchema,
} from './lib/binary-core/binary-core.schema';

export type {
  IBinaryModuleIdentifier,
  IBinaryIgnitionInput,
  IBinaryWorkerContract,
} from './lib/binary-core/binary-core.schema';
