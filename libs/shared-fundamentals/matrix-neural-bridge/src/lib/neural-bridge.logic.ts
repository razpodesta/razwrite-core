/**
 * @apparatus MatrixNeuralBridgeLogic
 * @role Puerta de enlace Rosetta, ensamblador Bitwise y registro de compresión sistémica ZTM.
 * @location libs/shared-fundamentals/matrix-neural-bridge/src/lib/neural-bridge.logic.ts
 * @status <SEALED_PRODUCTION>
 * @version 8.5.0
 * @protocol OEDP-V8.5 Lattice
 * @hilo Deep-Pulse / Surface-Pulse
 */

import { 
  type IDialectRegistrationPayload,
  type IApparatusLookupPayload,
  type IOperationLookupPayload,
  type IReverseLookupPayload,
  type ICompoundOpCodePayload,
  type IOperationOpCode, 
  type ISeverityOpCode, 
  type IApparatusOpCode,
  type ILayerOpCode,
  type ICompoundOpCode,
  type ISeverityLevel,
  DialectRegistrationPayloadSchema,
  ApparatusLookupPayloadSchema,
  OperationLookupPayloadSchema,
  ReverseLookupPayloadSchema,
  CompoundOpCodePayloadSchema
} from './neural-bridge.schema';

/**
 * ESTADOS CUÁNTICOS INTERNOS (Memoria de Registro)
 */
let isMatrixSealedState = false;

const internalSeverityMatrix: Record<ISeverityLevel, number> = {
  INFO: 1, WARN: 2, ERROR: 3, CRITICAL: 4, FATAL: 5
};

interface IRegisteredApparatus {
  apparatusOpCode: number;
  layerOpCode: number;
  operationDialect: Record<string, number>;
}

const internalApparatusRegistry: Record<string, IRegisteredApparatus> = {
  // Búnkeres de la Capa Zero (Foundation) pre-registrados para evitar colapso de arranque.
  SovereignLogger: { apparatusOpCode: 101, layerOpCode: 0, operationDialect: {} },
  SovereignErrorEngine: { apparatusOpCode: 102, layerOpCode: 0, operationDialect: {} },
  MatrixNeuralBridge: { apparatusOpCode: 103, layerOpCode: 0, operationDialect: {} }
};

/**
 * @section FACHADA SOBERANA (M-010)
 */
export const MatrixNeuralBridgeGateway = {
  
  /**
   * @method registerApparatusDialect
   * @description Permite a un módulo inyectar su ontología numérica durante la ignición.
   */
  registerApparatusDialect: (registrationPayload: IDialectRegistrationPayload): void => {
    if (isMatrixSealedState) {
      console.warn('[RWC-MNB] Registro denegado: La Matriz Cognitiva ya ha sido sellada.');
      return;
    }
    const validatedPayload = DialectRegistrationPayloadSchema.parse(registrationPayload);
    
    internalApparatusRegistry[validatedPayload.apparatusIdentifier] = {
      apparatusOpCode: validatedPayload.apparatusOpCode,
      layerOpCode: validatedPayload.layerOpCode,
      operationDialect: validatedPayload.operationDialect
    };
  },

  /**
   * @method sealMatrixCognitiveState
   * @description Congela el registro en memoria, garantizando inmutabilidad estricta (ISO 27001).
   */
  sealMatrixCognitiveState: (): void => {
    isMatrixSealedState = true;
    Object.freeze(internalApparatusRegistry);
    Object.freeze(internalSeverityMatrix);
  },

  /**
   * @method getSeverityOpCode
   * @description Transmuta el nivel semántico a su equivalente numérico.
   */
  getSeverityOpCode: (lookupPayload: { severityLevel: string }): ISeverityOpCode => {
    return (internalSeverityMatrix[lookupPayload.severityLevel as ISeverityLevel] || 1) as ISeverityOpCode;
  },

  /**
   * @method getApparatusOpCode
   * @description Transmuta el identificador del aparato a su equivalente numérico.
   */
  getApparatusOpCode: (lookupPayload: IApparatusLookupPayload): IApparatusOpCode => {
    const validatedPayload = ApparatusLookupPayloadSchema.parse(lookupPayload);
    const apparatus = internalApparatusRegistry[validatedPayload.apparatusIdentifier];
    return (apparatus ? apparatus.apparatusOpCode : 999) as IApparatusOpCode;
  },

  /**
   * @method getOperationOpCode
   * @description Transmuta la intención a su equivalente numérico según el dialecto del aparato.
   */
  getOperationOpCode: (lookupPayload: IOperationLookupPayload): IOperationOpCode => {
    const validatedPayload = OperationLookupPayloadSchema.parse(lookupPayload);
    const apparatus = internalApparatusRegistry[validatedPayload.apparatusIdentifier];
    if (!apparatus) return 9999 as IOperationOpCode;
    
    return (apparatus.operationDialect[validatedPayload.operationIdentifier] || 9999) as IOperationOpCode;
  },

  /**
   * @method forgeCompoundOpCode
   * @description Genera una Máscara de Bits (Int32) combinando Severidad, Capa, Aparato y Operación.
   * Estructura: Severidad(3 bits) | Capa(3 bits) | Aparato(10 bits) | Operacion(15 bits)
   */
  forgeCompoundOpCode: (lookupPayload: ICompoundOpCodePayload): ICompoundOpCode => {
    const validatedPayload = CompoundOpCodePayloadSchema.parse(lookupPayload);
    const apparatus = internalApparatusRegistry[validatedPayload.apparatusIdentifier];
    
    const severityBits = MatrixNeuralBridgeGateway.getSeverityOpCode({ severityLevel: validatedPayload.severityLevel });
    const layerBits = apparatus ? apparatus.layerOpCode : 0;
    const apparatusBits = apparatus ? apparatus.apparatusOpCode : 999;
    const operationBits = apparatus ? (apparatus.operationDialect[validatedPayload.operationIdentifier] || 9999) : 9999;

    // Fusión Bitwise asegurando un entero de 32 bits estricto y positivo.
    const compoundOpCode = (severityBits << 28) | (layerBits << 25) | (apparatusBits << 15) | operationBits;
    
    return compoundOpCode as ICompoundOpCode;
  },

  /**
   * @method resolveSemanticOperationIdentifier
   * @description Mapeo inverso para la reconstrucción forense en el Neural Sentinel.
   */
  resolveSemanticOperationIdentifier: (lookupPayload: IReverseLookupPayload): string => {
    const validatedPayload = ReverseLookupPayloadSchema.parse(lookupPayload);
    const apparatus = internalApparatusRegistry[validatedPayload.apparatusIdentifier];
    
    if (!apparatus) return 'UNKNOWN_APPARATUS_DIALECT';

    const semanticIdentifier = Object.keys(apparatus.operationDialect).find(
      key => apparatus.operationDialect[key] === validatedPayload.operationOpCode
    );
    
    return semanticIdentifier || 'UNKNOWN_OPERATION_IDENTIFIER';
  }
};