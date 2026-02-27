/**
 * @apparatus CipherEngineLogic
 * @role Motor de cifrado simétrico AES-GCM (256-bit) con sellado de integridad.
 * @location libs/shared/crypto/src/lib/cipher-engine/cipher-engine.logic.ts
 * @status <SEALED_PRODUCTION>
 * @version 9.1.0
 * @protocol OEDP-V8.5 Lattice
 * @hilo Deep-Pulse
 * @structure NEXO
 * @compliance ISO_27001 | ISO_25010
 */

import {
  CipherTransmissionInputSchema,
  OpaqueDataPacketSchema,
  type ICipherTransmissionInput,
  type IOpaqueDataPacket,
  type ICipherText,
  type IBase64UrlString
} from './cipher-engine.schema';

/**
 * @constant CIPHER_ALGORITHM
 * @private
 * AES-GCM proporciona cifrado y autenticación de datos simultáneamente.
 */
const CIPHER_ALGORITHM = 'AES-GCM';
const IV_LENGTH_BYTES = 12; // 96 bits - NIST Recommended.

export const CipherEngineLogic = {
  /**
   * @method encryptPayload
   * @description Transmuta un cargamento en Materia Oscura indescifrable.
   * Resuelve TS2769 mediante la normalización de BufferSource.
   */
  encryptPayload: async (
    requestPayload: ICipherTransmissionInput
  ): Promise<IOpaqueDataPacket> => {
    // 1. Aduana Genética (M-005)
    const validated = CipherTransmissionInputSchema.parse(requestPayload);

    // 2. Preparación de Buffer Isomórfico (Normalización de Memoria)
    let dataToEncrypt: ArrayBuffer;

    if (validated.informationPayload instanceof Uint8Array) {
      // Corrección de Error TS2769: Asegurar que el buffer no sea SharedArrayBuffer
      dataToEncrypt = ensureStandardArrayBuffer(validated.informationPayload);
    } else {
      const textToEncode = typeof validated.informationPayload === 'string'
        ? validated.informationPayload
        : JSON.stringify(validated.informationPayload);
      dataToEncrypt = new TextEncoder().encode(textToEncode).buffer;
    }

    // 3. Generación de Entropía Local (IV)
    const initializationVector = crypto.getRandomValues(new Uint8Array(IV_LENGTH_BYTES));

    // 4. Ejecución Criptográfica (Hardware Accelerated)
    // Se pasa initializationVector (Uint8Array estándar) y dataToEncrypt (ArrayBuffer estándar)
    const encryptedResultBuffer = await crypto.subtle.encrypt(
      { name: CIPHER_ALGORITHM, iv: initializationVector },
      validated.masterCryptionKey,
      dataToEncrypt
    );

    // 5. Sellado y Compresión ZTM (M-001)
    return OpaqueDataPacketSchema.parse({
      c: bufferToBase64Url(encryptedResultBuffer) as ICipherText,
      iv: bufferToBase64Url(initializationVector.buffer) as IBase64UrlString,
      t: Date.now()
    });
  },

  /**
   * @method decryptPayload
   * @description Restaura la legibilidad de un paquete de Materia Oscura.
   */
  decryptPayload: async (
    opaquePacket: IOpaqueDataPacket,
    decryptionKey: CryptoKey
  ): Promise<unknown> => {
    const validatedPacket = OpaqueDataPacketSchema.parse(opaquePacket);

    try {
      const initializationVector = base64UrlToBuffer(validatedPacket.iv);
      const cipherData = base64UrlToBuffer(validatedPacket.c);

      const decryptedBuffer = await crypto.subtle.decrypt(
        { name: CIPHER_ALGORITHM, iv: new Uint8Array(initializationVector) },
        decryptionKey,
        cipherData
      );

      const plainText = new TextDecoder().decode(decryptedBuffer);

      // Rehidratación Automática (ISO 25010)
      try {
        return JSON.parse(plainText);
      } catch {
        return plainText;
      }
    } catch (caughtError) {
      /**
       * @section MANIFIESTO 002
       * Señal sensorial de violación de integridad o rotación de llaves necesaria.
       */
      throw new Error('CRYPTO_INTEGRITY_VIOLATION');
    }
  }
} as const;

/**
 * @section REFINERÍA DE MEMORIA (M-015)
 * @function ensureStandardArrayBuffer
 * @description Detecta y transmuta SharedArrayBuffer a ArrayBuffer estándar.
 * Web Crypto API no acepta memorias compartidas por razones de seguridad de hilos.
 */
function ensureStandardArrayBuffer(view: Uint8Array): ArrayBuffer {
  if (view.buffer instanceof ArrayBuffer) return view.buffer;

  // Si es SharedArrayBuffer, realizamos una copia profunda a memoria local
  const standardBuffer = new ArrayBuffer(view.byteLength);
  new Uint8Array(standardBuffer).set(view);
  return standardBuffer;
}

/**
 * @section UTILIDADES DE ALTA PERFORMANCE (ZERO-JANK)
 * Implementación optimizada de Base64Url sin recursión de pila.
 */
function bufferToBase64Url(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  let binary = '';
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary)
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

function base64UrlToBuffer(base64Url: string): ArrayBuffer {
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes.buffer;
}
