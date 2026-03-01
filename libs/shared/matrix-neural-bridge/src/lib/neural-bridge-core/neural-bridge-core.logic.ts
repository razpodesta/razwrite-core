/**
 * @apparatus NeuralBridgeCoreLogic
 * @role Puerta de enlace Rosetta, ensamblador Bitwise y registro de compresión ZTM.
 * @location libs/shared/matrix-neural-bridge/src/lib/neural-bridge-core/neural-bridge-core.logic.ts
 * @status <SEALED_PRODUCTION>
 * @version 9.2.2
 * @protocol OEDP-V8.5 Lattice
 * @structure NEXO
 */

import {
  DialectRegistrationInputSchema,
  OperationSearchInputSchema,
  CompoundForgeInputSchema,
  OperationOpCodeSchema,
  SeverityOpCodeSchema,
  ApparatusOpCodeSchema,
  type IDialectRegistrationInput,
  type IOperationSearchInput,
  type ICompoundForgeInput,
  type ICompoundOpCode,
  type ISeverityOpCode,
  type IApparatusOpCode,
  type IOperationOpCode,
  type ISeverityLevel,
  type IApparatusIdentifier,
  type IOperationIdentifier
} from './neural-bridge-core.schema.js'; // ✅ CURADO: Rastro .js

/**
 * @interface IApparatusDialect
 * @private
 */
interface IApparatusDialect {
  readonly apparatusOpCode: IApparatusOpCode;
  readonly layerOpCode: number;
  readonly operationDialect: Readonly<Record<IOperationIdentifier, IOperationOpCode>>;
}

let isMatrixSealedState = false;

/**
 * @constant SEVERITY_NUMERIC_MAP
 * @private
 */
const SEVERITY_NUMERIC_MAP: Readonly<Record<ISeverityLevel, number>> = {
  INFO: 1,
  WARN: 2,
  ERROR: 3,
  CRITICAL: 4,
  FATAL: 5
};

const APPARATUS_DIALECT_REGISTRY = new Map<IApparatusIdentifier, IApparatusDialect>();

const igniteBaseDialects = () => {
  // 1. Registro do Sistema de Telemetria
  APPARATUS_DIALECT_REGISTRY.set('SovereignLogger' as IApparatusIdentifier, {
    apparatusOpCode: ApparatusOpCodeSchema.parse(101),
    layerOpCode: 0,
    operationDialect: Object.freeze({
      ['SYSTEM_READY' as IOperationIdentifier]: OperationOpCodeSchema.parse(1),
      ['PULSE_EMITTED' as IOperationIdentifier]: OperationOpCodeSchema.parse(2),
      ['BUFFER_DRAINED' as IOperationIdentifier]: OperationOpCodeSchema.parse(3),
      ['ERROR_TRANSMUTED' as IOperationIdentifier]: OperationOpCodeSchema.parse(4),
    })
  });

  // 2. Registro do Projetor de Cenas (SDUI)
  APPARATUS_DIALECT_REGISTRY.set('AtomicSceneProjector' as IApparatusIdentifier, {
    apparatusOpCode: ApparatusOpCodeSchema.parse(102),
    layerOpCode: 0,
    operationDialect: Object.freeze({
      ['PROJECTION_IGNITION_START' as IOperationIdentifier]: OperationOpCodeSchema.parse(1),
      ['PROJECTION_STABILIZED' as IOperationIdentifier]: OperationOpCodeSchema.parse(2),
      ['APPARATUS_NOT_FOUND' as IOperationIdentifier]: OperationOpCodeSchema.parse(3),
    })
  });
};

igniteBaseDialects();

export const MatrixNeuralBridgeGateway = {
  registerDialect: (inputPayload: IDialectRegistrationInput): void => {
    if (isMatrixSealedState) return;

    const validatedDialect = DialectRegistrationInputSchema.parse(inputPayload);

    APPARATUS_DIALECT_REGISTRY.set(validatedDialect.apparatusIdentifier, {
      apparatusOpCode: validatedDialect.apparatusOpCode,
      layerOpCode: validatedDialect.layerOpCode,
      operationDialect: Object.freeze(
        validatedDialect.operationDialect as Record<IOperationIdentifier, IOperationOpCode>
      ),
    });
  },

  sealMatrix: (): void => {
    isMatrixSealedState = true;
    Object.freeze(APPARATUS_DIALECT_REGISTRY);
  },

  getSeverityOpCode: (severityLevel: ISeverityLevel): ISeverityOpCode => {
    const numericValue = SEVERITY_NUMERIC_MAP[severityLevel] ?? 0;
    return SeverityOpCodeSchema.parse(numericValue);
  },

  getApparatusOpCode: (apparatusIdentifier: IApparatusIdentifier): IApparatusOpCode => {
    const apparatus = APPARATUS_DIALECT_REGISTRY.get(apparatusIdentifier);
    return apparatus ? apparatus.apparatusOpCode : (ApparatusOpCodeSchema.parse(999));
  },

  getOperationOpCode: (searchInput: IOperationSearchInput): IOperationOpCode => {
    const validatedSearch = OperationSearchInputSchema.parse(searchInput);
    const apparatus = APPARATUS_DIALECT_REGISTRY.get(validatedSearch.apparatusIdentifier);

    if (!apparatus) return OperationOpCodeSchema.parse(0);

    const opCode = apparatus.operationDialect[validatedSearch.operationIdentifier] ?? 0;
    return OperationOpCodeSchema.parse(opCode);
  },

  forgeCompoundOpCode: (forgeInput: ICompoundForgeInput): ICompoundOpCode => {
    const validatedInput = CompoundForgeInputSchema.parse(forgeInput);
    const apparatus = APPARATUS_DIALECT_REGISTRY.get(validatedInput.apparatusIdentifier);

    const severityBits = MatrixNeuralBridgeGateway.getSeverityOpCode(validatedInput.severityLevel);
    const layerBits = apparatus?.layerOpCode ?? 0;
    const apparatusBits = apparatus?.apparatusOpCode ?? 999;
    const operationBits =
      apparatus?.operationDialect[validatedInput.operationIdentifier] ?? 0;

    const compoundValue =
      (severityBits << 29) | (layerBits << 26) | (apparatusBits << 16) | operationBits;

    return compoundValue as ICompoundOpCode;
  },

  resolveSemanticOperation: (
    apparatusIdentifier: IApparatusIdentifier,
    operationOpCode: IOperationOpCode
  ): string => {
    const apparatus = APPARATUS_DIALECT_REGISTRY.get(apparatusIdentifier);
    if (!apparatus) return 'UNKNOWN_DIALECT';

    const semanticEntry = Object.entries(apparatus.operationDialect).find(
      ([, operationValue]) => operationValue === operationOpCode
    );

    return semanticEntry ? (semanticEntry[0] as string) : 'UNKNOWN_OPERATION_ID';
  },
} as const;
