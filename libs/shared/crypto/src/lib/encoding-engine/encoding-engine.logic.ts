/**
 * @apparatus EncodingEngineLogic
 * @role Puente de traducción isomórfico entre flujos binarios y representaciones Base64Url.
 * @location libs/shared/crypto/src/lib/encoding-engine/encoding-engine.logic.ts
 * @status <SEALED_PRODUCTION>
 * @version 9.2.2
 * @protocol OEDP-V8.5 Lattice
 * @hilo Surface-Pulse | Deep-Pulse | Acid-Pulse
 * @structure NEXO
 * @compliance ISO_25010 | ISO_27001
 */

import {
  Base64UrlStringSchema,
  type IEncodingBase64Url,
  type IInformationMaterial
} from './encoding-engine.schema';

export const EncodingEngineLogic = {
  /**
   * @method transmuteBufferToBase64Url
   * @description Convierte un material binario en una cadena Base64Url segura para transporte.
   * @optimization Uso de procesamiento por segmentos (32k) para prevenir Stack Overflow.
   */
  transmuteBufferToBase64Url: (informationMaterial: IInformationMaterial): IEncodingBase64Url => {
    // 1. Normalización de Memoria (Resolución TS2345)
    const bytes = EncodingEngineLogic.ensureStandardUint8Array(informationMaterial);

    // 2. Procesamiento por Chunks de alto rendimiento
    let binaryContent = '';
    const bufferChunkSize = 0x8000; // 32,768 bytes por segmento

    for (let i = 0; i < bytes.length; i += bufferChunkSize) {
      binaryContent += String.fromCharCode.apply(
        null,
        bytes.subarray(i, Math.min(i + bufferChunkSize, bytes.length)) as unknown as number[]
      );
    }

    const base64Url = btoa(binaryContent)
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');

    return Base64UrlStringSchema.parse(base64Url);
  },

  /**
   * @method transmuteBase64UrlToBuffer
   * @description Reconstruye la estructura ArrayBuffer a partir de una cadena Base64Url.
   */
  transmuteBase64UrlToBuffer: (encodedPayload: string): ArrayBuffer => {
    let base64Padding = encodedPayload.replace(/-/g, '+').replace(/_/g, '/');

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
    } catch (caughtError) {
      throw new Error(`ENCODING_ENGINE_CORRUPTION: Invalid Base64Url sequence. ${caughtError}`);
    }
  },

  /**
   * @method transmuteBase64UrlToUint8Array
   * @description Transmuta directamente a vista Uint8Array para optimización de L2 (IndexedDB).
   */
  transmuteBase64UrlToUint8Array: (encodedPayload: string): Uint8Array => {
    return new Uint8Array(EncodingEngineLogic.transmuteBase64UrlToBuffer(encodedPayload));
  },

  /**
   * @method transmuteUint8ArrayToBase64Url
   * @description Transmuta una vista Uint8Array a Base64Url.
   * @fix_error TS2345: Casting seguro a IInformationMaterial tras normalización.
   */
  transmuteUint8ArrayToBase64Url: (informationMaterial: Uint8Array): IEncodingBase64Url => {
    // Brindamos el material al contrato esperado por el método principal
    return EncodingEngineLogic.transmuteBufferToBase64Url(informationMaterial as unknown as IInformationMaterial);
  },

  /**
   * @method transmuteTextToBuffer
   * @description Codifica prosa técnica en un buffer UTF-8 inmutable.
   */
  transmuteTextToBuffer: (semanticText: string): ArrayBuffer => {
    return new TextEncoder().encode(semanticText).buffer;
  },

  /**
   * @method transmuteBufferToText
   * @description Decodifica un material binario en prosa técnica legible.
   */
  transmuteBufferToText: (informationMaterial: IInformationMaterial): string => {
    return new TextDecoder().decode(informationMaterial);
  },

  /**
   * @method ensureStandardUint8Array
   * @private
   * @description Garantiza que el buffer subyacente sea un ArrayBuffer (no SharedArrayBuffer).
   * Vital para operaciones que no aceptan memoria compartida.
   */
  ensureStandardUint8Array: (inputMaterial: IInformationMaterial | Uint8Array): Uint8Array => {
    const view = inputMaterial instanceof Uint8Array
      ? inputMaterial
      : new Uint8Array(inputMaterial);

    // Si el buffer es compartido (Shared), realizamos copia física a memoria privada
    if (view.buffer instanceof ArrayBuffer && view.buffer.constructor.name !== 'SharedArrayBuffer') {
      return view;
    }

    const standardBuffer = new ArrayBuffer(view.byteLength);
    const standardView = new Uint8Array(standardBuffer);
    standardView.set(view);
    return standardView;
  }
} as const;
