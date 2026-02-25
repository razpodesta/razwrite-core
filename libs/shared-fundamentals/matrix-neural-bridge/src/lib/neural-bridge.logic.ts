/**
 * @apparatus MatrixNeuralBridgeLogic
 * @role Puerta de enlace Rosetta, ensamblador Bitwise y registro de compresión sistémica ZTM.
 * @location libs/shared-fundamentals/matrix-neural-bridge/src/lib/neural-bridge.logic.ts
 * @status <SEALED_PRODUCTION>
 * @version 8.6.0
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
  type ICompoundOpCode,
  type ISeverityLevel,
  DialectRegistrationPayloadSchema,
  ApparatusLookupPayloadSchema,
  OperationLookupPayloadSchema,
  ReverseLookupPayloadSchema,
  CompoundOpCodePayloadSchema
} from './neural-bridge.schema';

/**
 * @context_prompt [LIA Legacy - AI-Audit]
 * DIRECTIVA: Inyección de Dialectos Fundacionales y Optimización Bitwise.
 * JUSTIFICACIÓN: El sistema requería un vocabulario base para evitar OpCodes '9999'.
 * Se ha estructurado la máscara de bits para soportar hasta 1024 aparatos y 16,384 operaciones cada uno.
 * IMPACTO: Observabilidad omnisciente desde el arranque (T0).
 */

let isMatrixSealedState = false;

const internalSeverityMatrix: Record<ISeverityLevel, number> = {
  INFO: 1, WARN: 2, ERROR: 3, CRITICAL: 4, FATAL: 5
};

interface IRegisteredApparatus {
  readonly apparatusOpCode: number;
  readonly layerOpCode: number;
  readonly operationDialect: Record<string, number>;
}

/**
 * ONTOLOGÍA FUNDACIONAL (CAPA ZERO)
 * Registro inmutable de los órganos vitales del RazWrite Core.
 */
const internalApparatusRegistry: Record<string, IRegisteredApparatus> = {
  SovereignLogger: {
    apparatusOpCode: 101, layerOpCode: 0,
    operationDialect: { SYSTEM_READY: 1, PULSE_EMITTED: 2, BUFFER_DRAINED: 3, INVALID_PAYLOAD: 4 }
  },
  SovereignErrorEngine: {
    apparatusOpCode: 102, layerOpCode: 0,
    operationDialect: { ERROR_TRANSMUTED: 1, RECOVERY_ACTION_TRIGGERED: 2, SCRUBBING_COMPLETED: 3 }
  },
  MatrixNeuralBridge: {
    apparatusOpCode: 103, layerOpCode: 0,
    operationDialect: { DIALECT_REGISTERED: 1, MATRIX_SEALED: 2, LOOKUP_FAILED: 3 }
  },
  MetabolicScheduler: {
    apparatusOpCode: 104, layerOpCode: 0,
    operationDialect: { METABOLIC_MODE_SHIFT: 1, EXECUTION_PERMIT_DENIED: 2, BIOSENSOR_IGNITED: 3 }
  },
  IdentityMutantEngine: {
    apparatusOpCode: 105, layerOpCode: 2, // Reside en Modular Units
    operationDialect: { IDENTITY_FORGED: 1, IDENTITY_ROTATED: 2, ACCESS_DENIED: 3 }
  }
};

export const MatrixNeuralBridgeGateway = {

  /**
   * @method registerApparatusDialect
   * @description Registra un nuevo dialecto numérico. Solo permitido antes del sellado.
   */
  registerApparatusDialect: (registrationPayload: IDialectRegistrationPayload): void => {
    if (isMatrixSealedState) {
      console.warn('[RWC-MNB] Registro denegado: Matriz Sellada.');
      return;
    }
    const validatedPayload = DialectRegistrationPayloadSchema.parse(registrationPayload);

    (internalApparatusRegistry as any)[validatedPayload.apparatusIdentifier] = {
      apparatusOpCode: validatedPayload.apparatusOpCode,
      layerOpCode: validatedPayload.layerOpCode,
      operationDialect: validatedPayload.operationDialect
    };
  },

  /**
   * @method sealMatrixCognitiveState
   * @description Bloquea el registro para garantizar inmutabilidad ISO 27001.
   */
  sealMatrixCognitiveState: (): void => {
    isMatrixSealedState = true;
    Object.freeze(internalSeverityMatrix);
    // Congelamiento profundo manual del registro
    Object.keys(internalApparatusRegistry).forEach(key => {
      Object.freeze(internalApparatusRegistry[key].operationDialect);
      Object.freeze(internalApparatusRegistry[key]);
    });
    Object.freeze(internalApparatusRegistry);
  },

  /**
   * @method getSeverityOpCode
   * @description Retorna el OpCode de severidad (Rango: 1-5).
   */
  getSeverityOpCode: (lookupPayload: { severityLevel: string }): ISeverityOpCode => {
    return (internalSeverityMatrix[lookupPayload.severityLevel as ISeverityLevel] || 1) as ISeverityOpCode;
  },

  /**
   * @method getApparatusOpCode
   * @description Retorna el OpCode del aparato (Rango: 1-1023).
   */
  getApparatusOpCode: (lookupPayload: IApparatusLookupPayload): IApparatusOpCode => {
    const validatedPayload = ApparatusLookupPayloadSchema.parse(lookupPayload);
    const apparatus = internalApparatusRegistry[validatedPayload.apparatusIdentifier];
    return (apparatus ? apparatus.apparatusOpCode : 999) as IApparatusOpCode;
  },

  /**
   * @method getOperationOpCode
   * @description Retorna el OpCode de la operación específica (Rango: 1-16383).
   */
  getOperationOpCode: (lookupPayload: IOperationLookupPayload): IOperationOpCode => {
    const validatedPayload = OperationLookupPayloadSchema.parse(lookupPayload);
    const apparatus = internalApparatusRegistry[validatedPayload.apparatusIdentifier];
    if (!apparatus) return 9999 as IOperationOpCode;

    return (apparatus.operationDialect[validatedPayload.operationIdentifier] || 9999) as IOperationOpCode;
  },

  /**
   * @method forgeCompoundOpCode
   * @description Genera un identificador Bitwise Int32 único.
   * Estructura: Severidad(4) | Capa(4) | Aparato(10) | Operación(14)
   */
  forgeCompoundOpCode: (lookupPayload: ICompoundOpCodePayload): ICompoundOpCode => {
    const validatedPayload = CompoundOpCodePayloadSchema.parse(lookupPayload);
    const apparatus = internalApparatusRegistry[validatedPayload.apparatusIdentifier];

    const severityBits = MatrixNeuralBridgeGateway.getSeverityOpCode({ severityLevel: validatedPayload.severityLevel });
    const layerBits = apparatus ? apparatus.layerOpCode : 0;
    const apparatusBits = apparatus ? apparatus.apparatusOpCode : 999;
    const operationBits = apparatus ? (apparatus.operationDialect[validatedPayload.operationIdentifier] || 9999) : 9999;

    // Fusión Bitwise O(1)
    const compoundValue = (severityBits << 28) | (layerBits << 24) | (apparatusBits << 14) | operationBits;

    return compoundValue as ICompoundOpCode;
  },

  /**
   * @method resolveSemanticOperationIdentifier
   * @description Reconstrucción inversa para rastro forense.
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
