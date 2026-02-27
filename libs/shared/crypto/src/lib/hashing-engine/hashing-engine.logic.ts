/**
 * @apparatus HashingEngineLogic
 * @role Generador de huellas digitales inmutables (SHA-256) con aceleración por hardware.
 * @location libs/shared/crypto/src/lib/hashing-engine/hashing-engine.logic.ts
 * @status <SEALED_PRODUCTION>
 * @version 9.0.0
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

/**
 * @constant HASH_ALGORITHM
 * SHA-256 es el estándar de inmutabilidad para el rastro forense NSK.
 */
const HASH_ALGORITHM = 'SHA-256';

export const HashingEngineLogic = {
  /**
   * @method computeFingerprint
   * @description Calcula una huella digital determinística SHA-256.
   */
  computeFingerprint: async (
    requestPayload: IHashingInput
  ): Promise<IHashedFingerprint> => {
    // 1. Aduana Genética
    const validated = HashingInputSchema.parse(requestPayload);

    // 2. Normalización de Memoria (Soporte para flujos de sensores M-015)
    let dataToDigest: ArrayBuffer;

    if (typeof validated.informationMaterial === 'string') {
      const materialWithSalt = validated.saltContext
        ? `${validated.informationMaterial}:${validated.saltContext}`
        : validated.informationMaterial;
      dataToDigest = EncodingEngineLogic.transmuteTextToBuffer(materialWithSalt);
    } else {
      dataToDigest = ensureStandardBuffer(validated.informationMaterial);
    }

    // 3. Ejecución Criptográfica (Nativo/Subtle)
    const hashBuffer = await crypto.subtle.digest(HASH_ALGORITHM, dataToDigest);

    // 4. Transmutación a Representación Transportable (ZTM)
    const fingerprint = EncodingEngineLogic.transmuteBufferToBase64Url(hashBuffer);

    return HashedFingerprintSchema.parse(fingerprint);
  }
} as const;

/**
 * @section REFINERÍA DE MEMORIA
 * @private
 * Asegura que el material no resida en memoria compartida (SharedArrayBuffer),
 * la cual es rechazada por crypto.subtle.digest.
 */
function ensureStandardBuffer(input: ArrayBuffer | Uint8Array): ArrayBuffer {
  if (input instanceof ArrayBuffer) return input;
  if (input.buffer instanceof ArrayBuffer) return input.buffer;

  // Clonación atómica si se detecta SharedArrayBuffer
  const standardBuffer = new ArrayBuffer(input.byteLength);
  new Uint8Array(standardBuffer).set(input instanceof Uint8Array ? input : new Uint8Array(input));
  return standardBuffer;
}
