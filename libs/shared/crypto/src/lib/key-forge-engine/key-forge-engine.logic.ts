/**
 * @apparatus KeyForgeEngineLogic
 * @role Forjador de llaves maestras simétricas con blindaje de memoria (Non-Extractable).
 * @location libs/shared/crypto/src/lib/key-forge-engine/key-forge-engine.logic.ts
 * @status <SEALED_PRODUCTION>
 * @version 9.0.0
 * @protocol OEDP-V8.5 Lattice
 * @hilo Deep-Pulse
 * @structure NEXO
 * @compliance ISO_27001 | ISO_25010
 */

import { EncodingEngineLogic } from '../encoding-engine/encoding-engine.logic';
import {
  MasterKeyDerivationInputSchema,
  type IMasterKeyDerivationInput
} from './key-forge-engine.schema';

/**
 * @constant FORGE_CONSTANTS
 * PBKDF2 configurado bajo el estándar OWASP 2025 para entornos web de alta seguridad.
 */
const ITERATIONS_COUNT = 100000;
const DIGEST_ALGORITHM = 'SHA-256';
const TARGET_ALGORITHM = 'AES-GCM';
const KEY_LENGTH_BITS = 256;

export const KeyForgeEngineLogic = {
  /**
   * @method forgeMasterSessionKey
   * @description Deriva una llave AES-GCM 'extractable: false' para uso exclusivo en memoria volátil.
   */
  forgeMasterSessionKey: async (
    requestPayload: IMasterKeyDerivationInput
  ): Promise<CryptoKey> => {
    // 1. Aduana Genética
    const validated = MasterKeyDerivationInputSchema.parse(requestPayload);

    // 2. Transmutación a Material de Llave Primario (Raw)
    const rawEntropyBuffer = EncodingEngineLogic.transmuteTextToBuffer(validated.secretMaterial);

    const baseKeyMaterial = await crypto.subtle.importKey(
      'raw',
      rawEntropyBuffer,
      { name: 'PBKDF2' },
      false, // El material base no es exportable
      ['deriveKey']
    );

    // 3. Ejecución de Derivación PBKDF2 (Aislamiento de Entropía)
    const saltBuffer = EncodingEngineLogic.transmuteTextToBuffer(validated.saltContext);

    /**
     * @step Sello de Seguridad ISO 27001
     * Se genera la llave con 'extractable: false'.
     * Esto impide que la llave sea leída por el depurador o robada mediante ataques XSS.
     */
    return crypto.subtle.deriveKey(
      {
        name: 'PBKDF2',
        salt: saltBuffer,
        iterations: ITERATIONS_COUNT,
        hash: DIGEST_ALGORITHM,
      },
      baseKeyMaterial,
      {
        name: TARGET_ALGORITHM,
        length: KEY_LENGTH_BITS
      },
      false, // BLINDAJE: extractable: false
      ['encrypt', 'decrypt']
    );
  }
} as const;
