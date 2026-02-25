/**
 * @apparatus CipherEngine
 * @role Motor de cifrado simétrico AES-GCM (256-bit).
 * @location libs/shared-fundamentals/crypto/src/lib/cipher-engine/cipher.logic.ts
 * @status <SEALED_PRODUCTION>
 */

import { EncodingUtils } from '../utils/encoding.utils';
import { 
  type IEncryptionInput, 
  type IEncryptedPacket, 
  EncryptionInputSchema 
} from '../crypto-core.schema';

const ALGORITHM_AES = 'AES-GCM';
const IV_LENGTH_BYTES = 12; // Recomendado por NIST para GCM (96 bits)

export const SovereignCipher = {
  /**
   * Cifra un payload convirtiéndolo a Materia Oscura (JWE).
   * Genera un IV único automáticamente.
   */
  encrypt: async (input: IEncryptionInput): Promise<IEncryptedPacket> => {
    // 1. Validación de ADN
    const validated = EncryptionInputSchema.parse(input);
    
    // 2. Preparación de Datos
    const plainText = typeof validated.dataPayload === 'string' 
      ? validated.dataPayload 
      : JSON.stringify(validated.dataPayload);
    
    const encodedData = EncodingUtils.textToBuffer(plainText);
    
    // 3. Generación de Entropía (IV)
    const iv = crypto.getRandomValues(new Uint8Array(IV_LENGTH_BYTES));

    // 4. Ejecución Criptográfica (Web Crypto API)
    const cipherBuffer = await crypto.subtle.encrypt(
      { name: ALGORITHM_AES, iv },
      validated.masterKey,
      encodedData
    );

    // 5. Empaquetado
    return {
      c: EncodingUtils.bufferToBase64Url(cipherBuffer) as any,
      iv: EncodingUtils.bufferToBase64Url(iv.buffer) as any,
      t: Date.now()
    };
  },

  /**
   * Descifra Materia Oscura y devuelve el payload original.
   */
  decrypt: async (packet: IEncryptedPacket, key: CryptoKey): Promise<unknown> => {
    const iv = EncodingUtils.base64UrlToBuffer(packet.iv);
    const cipherText = EncodingUtils.base64UrlToBuffer(packet.c);

    try {
      const decryptedBuffer = await crypto.subtle.decrypt(
        { name: ALGORITHM_AES, iv: new Uint8Array(iv) },
        key,
        cipherText
      );

      const decryptedString = EncodingUtils.bufferToText(decryptedBuffer);
      
      // Intento de parseo JSON automático
      try {
        return JSON.parse(decryptedString);
      } catch {
        return decryptedString;
      }
    } catch (error) {
      throw new Error('RWC-CRYPTO-DECRYPT-FAIL: Integridad comprometida o llave incorrecta.');
    }
  }
};