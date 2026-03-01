/**
 * @apparatus NeuralBridgeFacade
 * @role Único punto de entrada sellado para el córtex de traducción y forja de OpCodes.
 * @location libs/shared/matrix-neural-bridge/src/index.ts
 * @status <SEALED_PRODUCTION>
 * @version 9.2.2
 * @protocol OEDP-V8.5 Lattice
 */

export { MatrixNeuralBridgeGateway } from './lib/neural-bridge-core/neural-bridge-core.logic.js'; // ✅ CURADO

export {
  ApparatusIdentifierSchema,
  OperationIdentifierSchema,
  OperationOpCodeSchema,
  SeverityOpCodeSchema,
  ApparatusOpCodeSchema,
  LayerOpCodeSchema,
  CompoundOpCodeSchema,
  SeverityLevelSchema,
  DialectRegistrationInputSchema,
  OperationSearchInputSchema,
  CompoundForgeInputSchema
} from './lib/neural-bridge-core/neural-bridge-core.schema.js'; // ✅ CURADO

export type {
  IApparatusIdentifier,
  IOperationIdentifier,
  IOperationOpCode,
  ISeverityOpCode,
  IApparatusOpCode,
  ILayerOpCode,
  ICompoundOpCode,
  ISeverityLevel,
  IDialectRegistrationInput,
  IOperationSearchInput,
  ICompoundForgeInput
} from './lib/neural-bridge-core/neural-bridge-core.schema.js'; // ✅ CURADO
