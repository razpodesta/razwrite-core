/**
 * @apparatus KeyForge
 * @role Derivador de llaves maestras a partir de secretos débiles (PBKDF2).
 * @location libs/shared-fundamentals/crypto/src/lib/key-forge/key-forge.logic.ts
 * @status <SEALED_PRODUCTION>
 */

import { EncodingUtils } from '../utils/encoding.utils';
import { type IKeyDerivationInput, KeyDerivationInputSchema } from '../crypto-core.schema';

const ITERATIONS = 100000; // Estándar OWASP 2025 para Web
const HASH_ALGO = 'SHA-256';

export const SovereignKeyForge = {
  /**
   * Deriva una llave AES-GCM 256 'extractable: false' para uso en memoria.
   */
  deriveSessionKey: async (input: IKeyDerivationInput): Promise<CryptoKey> => {
    const validated = KeyDerivationInputSchema.parse(input);

    // 1. Importar el secreto como "Material de Llave"
    const keyMaterial = await crypto.subtle.importKey(
      'raw',
      EncodingUtils.textToBuffer(validated.secretMaterial),
      { name: 'PBKDF2' },
      false,
      ['deriveKey']
    );

    // 2. Derivar la Llave Maestra usando la Sal Contextual
    return crypto.subtle.deriveKey(
      {
        name: 'PBKDF2',
        salt: EncodingUtils.textToBuffer(validated.saltContext),
        iterations: ITERATIONS,
        hash: HASH_ALGO,
      },
      keyMaterial,
      { name: 'AES-GCM', length: 256 },
      false, // IMPORTANTE: La llave derivada NO puede ser exportada/leída
      ['encrypt', 'decrypt']
    );
  }
};