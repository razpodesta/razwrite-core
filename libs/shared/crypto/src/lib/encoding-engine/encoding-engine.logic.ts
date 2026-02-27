/**
 * @apparatus EncodingEngineLogic
 * @role Puente de traducción isomórfico entre flujos binarios y representaciones Base64Url.
 * @location libs/shared/crypto/src/lib/encoding-engine/encoding-engine.logic.ts
 * @status <SEALED_PRODUCTION>
 * @version 9.0.0
 * @protocol OEDP-V8.5 Lattice
 * @hilo Surface-Pulse | Deep-Pulse | Acid-Pulse
 * @structure NEXO
 * @compliance ISO_25010
 */

import {
  Base64UrlStringSchema,
  type IBase64UrlString,
  type IBufferSource
} from './encoding-engine.schema';

export const EncodingEngineLogic = {
  /**
   * @method transmuteBufferToBase64Url
   * @description Convierte un buffer binario en una cadena Base64Url segura para transporte.
   */
  transmuteBufferToBase64Url: (informationBuffer: IBufferSource): IBase64UrlString => {
    const bytes = informationBuffer instanceof Uint8Array
      ? informationBuffer
      : new Uint8Array(informationBuffer);

    let binaryString = '';
    for (let i = 0; i < bytes.byteLength; i++) {
      binaryString += String.fromCharCode(bytes[i]);
    }

    const base64Url = btoa(binaryString)
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');

    return Base64UrlStringSchema.parse(base64Url);
  },

  /**
   * @method transmuteBase64UrlToBuffer
   * @description Reconstruye la estructura binaria a partir de una cadena Base64Url.
   */
  transmuteBase64UrlToBuffer: (encodedPayload: string): ArrayBuffer => {
    let base64Padding = encodedPayload.replace(/-/g, '+').replace(/_/g, '/');

    // Restauración de padding para compatibilidad con atob nativo
    while (base64Padding.length % 4) {
      base64Padding += '=';
    }

    try {
      const binaryString = atob(base64Padding);
      const bufferResult = new Uint8Array(binaryString.length);

      for (let i = 0; i < binaryString.length; i++) {
        bufferResult[i] = binaryString.charCodeAt(i);
      }

      return bufferResult.buffer;
    } catch {
      throw new Error('ENCODING_ENGINE_CORRUPTION: Invalid Base64Url sequence.');
    }
  },

  /**
   * @method transmuteTextToBuffer
   * @description Codifica prosa técnica en un buffer UTF-8.
   */
  transmuteTextToBuffer: (semanticText: string): ArrayBuffer => {
    return new TextEncoder().encode(semanticText).buffer;
  },

  /**
   * @method transmuteBufferToText
   * @description Decodifica un buffer binario en prosa técnica legible.
   */
  transmuteBufferToText: (informationBuffer: IBufferSource): string => {
    return new TextDecoder().decode(informationBuffer);
  }
} as const;
