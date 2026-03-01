/**
 * @apparatus HashingEngineLogic
 * @role Motor de generación de huellas e integridad binaria con aceleración por hardware.
 * @location libs/shared/crypto/src/lib/hashing-engine/hashing-engine.logic.ts
 * @status <SEALED_PRODUCTION>
 * @version 9.3.0
 * @protocol OEDP-V8.5 Lattice
 * @hilo Surface-Pulse | Deep-Pulse
 * @structure NEXO
 * @compliance ISO_27001 | ISO_25010
 */

import { EncodingEngineLogic } from '../encoding-engine/encoding-engine.logic';
import {
  HashingInputSchema,
  HashedFingerprintSchema,
  type IHashingInput,
  type IHashedFingerprint
} from './hashing-engine.schema';

export const HashingEngineLogic = {
  /**
   * @method generateHash
   * @description Genera un digest (Hexadecimal) inalterable.
   */
  generateHash: async (requestPayload: IHashingInput): Promise<string> => {
    const hashBuffer = await HashingEngineLogic.internalDigest(requestPayload);

    // Transmutación a Hexadecimal (Fórmula de Pasaporte M-022)
    return Array.from(new Uint8Array(hashBuffer))
      .map((bytePosition) => bytePosition.toString(16).padStart(2, '0'))
      .join('');
  },

  /**
   * @method computeFingerprint
   * @description Calcula una huella digital determinística (Base64Url).
   */
  computeFingerprint: async (
    requestPayload: IHashingInput
  ): Promise<IHashedFingerprint> => {
    const hashBuffer = await HashingEngineLogic.internalDigest(requestPayload);

    // Transmutación a representación compacta para transporte (ZTM)
    const fingerprint = EncodingEngineLogic.transmuteBufferToBase64Url(hashBuffer);

    return HashedFingerprintSchema.parse(fingerprint);
  },

  /**
   * @method internalDigest
   * @private
   * @description Orquestación central del proceso de digestión.
   */
  internalDigest: async (requestPayload: IHashingInput): Promise<ArrayBuffer> => {
    // 1. Aduana Genética
    const validated = HashingInputSchema.parse(requestPayload);

    // 2. Normalización de Memoria (Soporte para flujos de sensores)
    let dataToDigest: ArrayBuffer;

    if (typeof validated.informationMaterial === 'string') {
      const materialWithSalt = validated.saltContext
        ? `${validated.informationMaterial}:${validated.saltContext}`
        : validated.informationMaterial;

      dataToDigest = EncodingEngineLogic.transmuteTextToBuffer(materialWithSalt);
    } else {
      dataToDigest = HashingEngineLogic.refineBufferForSubtle(validated.informationMaterial);
    }

    // 3. Ejecución Criptográfica Nativa
    return await crypto.subtle.digest(validated.algorithm, dataToDigest);
  },

  /**
   * @method refineBufferForSubtle
   * @private
   * @description Protege contra el rechazo de SharedArrayBuffer en Web Crypto API.
   */
  refineBufferForSubtle: (inputMaterial: ArrayBuffer | Uint8Array): ArrayBuffer => {
    // Retorno inmediato si ya es un ArrayBuffer estándar
    if (inputMaterial instanceof ArrayBuffer) return inputMaterial;

    // Validación de origen de memoria
    if (
      inputMaterial.buffer instanceof ArrayBuffer &&
      inputMaterial.buffer.constructor.name !== 'SharedArrayBuffer'
    ) {
      return inputMaterial.buffer;
    }

    // Clonación Atómica ISO 25010
    const standardBuffer = new ArrayBuffer(inputMaterial.byteLength);
    new Uint8Array(standardBuffer).set(
      inputMaterial instanceof Uint8Array ? inputMaterial : new Uint8Array(inputMaterial)
    );
    return standardBuffer;
  }
} as const;
