/**
 * @apparatus NeuralBridgeCoreLogic
 * @role Puerta de enlace Rosetta, ensamblador Bitwise y registro de compresión ZTM.
 * @location libs/shared/matrix-neural-bridge/src/lib/neural-bridge-core/neural-bridge-core.logic.ts
 * @status <SEALED_PRODUCTION>
 * @version 9.2.1
 * @protocol OEDP-V8.5 Lattice
 * @hilo Deep-Pulse | Surface-Pulse
 * @structure NEXO
 * @compliance ISO_27001 | ISO_25010
 */

import {
  DialectRegistrationInputSchema,
  OperationSearchInputSchema,
  CompoundForgeInputSchema,
  OperationOpCodeSchema,
  SeverityOpCodeSchema,
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
} from './neural-bridge-core.schema';

/**
 * @interface IApparatusDialect
 * @private
 * @description Estructura interna de almacenamiento para vocabularios técnicos sellados.
 * Se utiliza un Record estricto para evitar colisiones de tipos parciales en la Matrix.
 */
interface IApparatusDialect {
  readonly apparatusOpCode: IApparatusOpCode;
  readonly layerOpCode: number;
  readonly operationDialect: Readonly<Record<IOperationIdentifier, IOperationOpCode>>;
}

/**
 * @section ESTADO COGNITIVO (DARK MATTER STORE)
 */
let isMatrixSealedState = false;

/**
 * @constant SEVERITY_NUMERIC_MAP
 * @private
 * @description Mapa estático de niveles de severidad a OpCodes de 3 bits (M-005).
 */
const SEVERITY_NUMERIC_MAP: Record<ISeverityLevel, number> = {
  INFO: 1,
  WARN: 2,
  ERROR: 3,
  CRITICAL: 4,
  FATAL: 5
};

/**
 * @constant APPARATUS_DIALECT_REGISTRY
 * @private
 * @description Registro centralizado de vocabularios técnicos.
 * El bootstrap inicial se realiza mediante casting nominal controlado para la ignición del Kernel.
 */
const APPARATUS_DIALECT_REGISTRY = new Map<IApparatusIdentifier, IApparatusDialect>([
  [
    'SovereignLogger' as IApparatusIdentifier,
    {
      apparatusOpCode: 101 as IApparatusOpCode,
      layerOpCode: 0,
      operationDialect: {
        ['SYSTEM_READY' as IOperationIdentifier]: 1 as IOperationOpCode,
        ['PULSE_EMITTED' as IOperationIdentifier]: 2 as IOperationOpCode,
        ['BUFFER_DRAINED' as IOperationIdentifier]: 3 as IOperationOpCode,
        ['ERROR_TRANSMUTED' as IOperationIdentifier]: 4 as IOperationOpCode,
      } as const as Record<IOperationIdentifier, IOperationOpCode>,
    },
  ],
  [
    'AtomicSceneProjector' as IApparatusIdentifier,
    {
      apparatusOpCode: 102 as IApparatusOpCode,
      layerOpCode: 0,
      operationDialect: {
        ['PROJECTION_IGNITION_START' as IOperationIdentifier]: 1 as IOperationOpCode,
        ['PROJECTION_STABILIZED' as IOperationIdentifier]: 2 as IOperationOpCode,
        ['APPARATUS_NOT_FOUND' as IOperationIdentifier]: 3 as IOperationOpCode,
      } as const as Record<IOperationIdentifier, IOperationOpCode>,
    },
  ],
]);

/**
 * @apparatus MatrixNeuralBridgeGateway
 * @description Fachada única de interacción para la transmutación de significados técnicos.
 */
export const MatrixNeuralBridgeGateway = {
  /**
   * @method registerDialect
   * @description Inyecta un nuevo vocabulario en la Matrix antes del sellado sistémico (M-010).
   * Resuelve TS2322 asegurando la inmutabilidad y el tipado Record completo.
   */
  registerDialect: (inputPayload: IDialectRegistrationInput): void => {
    if (isMatrixSealedState) return;

    const validatedDialect = DialectRegistrationInputSchema.parse(inputPayload);

    APPARATUS_DIALECT_REGISTRY.set(validatedDialect.apparatusIdentifier, {
      apparatusOpCode: validatedDialect.apparatusOpCode,
      layerOpCode: validatedDialect.layerOpCode,
      // Se realiza el casting a Record estricto tras la validación de Zod
      operationDialect: Object.freeze(
        validatedDialect.operationDialect as Record<IOperationIdentifier, IOperationOpCode>
      ),
    });
  },

  /**
   * @method sealMatrix
   * @description Bloquea el estado cognitivo para evitar inyecciones post-ignición (ISO 27001).
   */
  sealMatrix: (): void => {
    isMatrixSealedState = true;
    Object.freeze(SEVERITY_NUMERIC_MAP);
    Object.freeze(APPARATUS_DIALECT_REGISTRY);
  },

  /**
   * @method getSeverityOpCode
   * @description Transmuta un nivel de severidad en un OpCode de 3 bits.
   */
  getSeverityOpCode: (severityLevel: ISeverityLevel): ISeverityOpCode => {
    const numericValue = SEVERITY_NUMERIC_MAP[severityLevel] || 0;
    return SeverityOpCodeSchema.parse(numericValue);
  },

  /**
   * @method getApparatusOpCode
   * @description Retorna el identificador numérico de un aparato registrado.
   */
  getApparatusOpCode: (apparatusIdentifier: IApparatusIdentifier): IApparatusOpCode => {
    const apparatus = APPARATUS_DIALECT_REGISTRY.get(apparatusIdentifier);
    return apparatus ? apparatus.apparatusOpCode : (999 as IApparatusOpCode);
  },

  /**
   * @method getOperationOpCode
   * @description Transmuta un identificador de operación en su OpCode Rosetta.
   */
  getOperationOpCode: (searchInput: IOperationSearchInput): IOperationOpCode => {
    const validatedSearch = OperationSearchInputSchema.parse(searchInput);
    const apparatus = APPARATUS_DIALECT_REGISTRY.get(validatedSearch.apparatusIdentifier);

    if (!apparatus) return OperationOpCodeSchema.parse(0);

    const opCode = apparatus.operationDialect[validatedSearch.operationIdentifier] ?? 0;
    return OperationOpCodeSchema.parse(opCode);
  },

  /**
   * @method forgeCompoundOpCode
   * @description Ensamblador Bitwise Int32 (32-bit Signed) de alto rendimiento.
   * Arquitectura: [Severity: 3b][Layer: 3b][Apparatus: 10b][Operation: 16b]
   */
  forgeCompoundOpCode: (forgeInput: ICompoundForgeInput): ICompoundOpCode => {
    const validatedInput = CompoundForgeInputSchema.parse(forgeInput);
    const apparatus = APPARATUS_DIALECT_REGISTRY.get(validatedInput.apparatusIdentifier);

    const severityBits = MatrixNeuralBridgeGateway.getSeverityOpCode(validatedInput.severityLevel);
    const layerBits = apparatus?.layerOpCode ?? 0;
    const apparatusBits = apparatus?.apparatusOpCode ?? 999;
    const operationBits =
      apparatus?.operationDialect[validatedInput.operationIdentifier] ?? 0;

    // Fusión atómica mediante desplazamiento de bits O(1)
    const compoundValue =
      (severityBits << 29) | (layerBits << 26) | (apparatusBits << 16) | operationBits;

    return compoundValue as ICompoundOpCode;
  },

  /**
   * @method resolveSemanticOperation
   * @description Decodificación inversa para el análisis forense del Neural Sentinel.
   */
  resolveSemanticOperation: (
    apparatusIdentifier: IApparatusIdentifier,
    operationOpCode: IOperationOpCode
  ): string => {
    const apparatus = APPARATUS_DIALECT_REGISTRY.get(apparatusIdentifier);
    if (!apparatus) return 'UNKNOWN_DIALECT';

    const semanticEntry = Object.entries(apparatus.operationDialect).find(
      ([, operationValue]) => operationValue === operationOpCode
    );

    return semanticEntry ? semanticEntry[0] : 'UNKNOWN_OPERATION_ID';
  },
} as const;
