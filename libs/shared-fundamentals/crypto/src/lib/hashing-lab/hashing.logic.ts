/**
 * @apparatus HashingLab
 * @role Generador de huellas digitales inmutables (SHA-256).
 * @location libs/shared-fundamentals/crypto/src/lib/hashing-lab/hashing.logic.ts
 * @status <SEALED_PRODUCTION>
 */

import { EncodingUtils } from '../utils/encoding.utils';

export const SovereignHashing = {
  /**
   * Genera un hash SHA-256 corto y seguro para URLs (Fingerprint).
   */
  digestText: async (text: string): Promise<string> => {
    const encoder = new TextEncoder();
    const data = encoder.encode(text);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    return EncodingUtils.bufferToBase64Url(hashBuffer);
  }
};