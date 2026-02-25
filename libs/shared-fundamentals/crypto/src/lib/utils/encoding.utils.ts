/**
 * @apparatus BinaryEncodingUtils
 * @role Puente de traducción entre el mundo binario (ArrayBuffer) y el texto transportable (Base64Url).
 * @location libs/shared-fundamentals/crypto/src/lib/utils/encoding.utils.ts
 * @status <SEALED_PRODUCTION>
 */

export const EncodingUtils = {
  /**
   * Convierte un ArrayBuffer a una cadena Base64Url-safe (sin padding '=').
   */
  bufferToBase64Url: (buffer: ArrayBuffer): string => {
    const bytes = new Uint8Array(buffer);
    let binary = '';
    for (let i = 0; i < bytes.byteLength; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary)
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');
  },

  /**
   * Convierte una cadena Base64Url a ArrayBuffer.
   */
  base64UrlToBuffer: (base64Url: string): ArrayBuffer => {
    let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    while (base64.length % 4) {
      base64 += '=';
    }
    const binary = atob(base64);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    return bytes.buffer;
  },

  /**
   * Convierte texto UTF-8 a ArrayBuffer (para inputs crudos).
   */
  textToBuffer: (text: string): ArrayBuffer => {
    return new TextEncoder().encode(text).buffer;
  },

  /**
   * Convierte ArrayBuffer a texto UTF-8 (para outputs descifrados).
   */
  bufferToText: (buffer: ArrayBuffer): string => {
    return new TextDecoder().decode(buffer);
  }
};