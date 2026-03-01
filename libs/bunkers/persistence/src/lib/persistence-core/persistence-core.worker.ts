/**
 * @apparatus PersistenceCoreBrain
 * @role Cerebro asíncrono para el sellado AES-GCM, integridad SHA-256 y normalización binaria.
 * @location libs/bunkers/persistence/src/lib/persistence-core/persistence-core.worker.ts
 * @status <SEALED_PRODUCTION>
 * @version 9.8.2
 * @protocol OEDP-V8.5 Lattice
 * @hilo Deep-Pulse
 * @structure CEREBRO
 * @compliance ISO_27001 | ISO_27701 | ISO_25010
 */

import * as Comlink from 'comlink';
import {
  CipherEngineLogic,
  HashingEngineLogic,
  KeyForgeEngineLogic,
  EncodingEngineLogic,
  KeyEntropyMaterialSchema,
  SaltContextIdentifierSchema,
  type ICipherText,
  type IEncodingBase64Url
} from '@razwritecore/nsk-shared-crypto';

import {
  type IVaultArtifact,
  type IPersistenceKey,
  ArtifactChecksumSchema
} from './persistence-core.schema';

/**
 * @context_prompt [LIA Legacy - AI-Audit]
 * DIRECTIVA: Saneamiento de BufferSource y Normalización de ArrayBuffer (TS2322).
 * JUSTIFICACIÓN: Se fuerza que los cargamentos binarios sean 'Uint8Array<ArrayBuffer>',
 * eliminando la posibilidad de 'SharedArrayBuffer' que bloqueaba la compilación por
 * falta de métodos de transferencia (resizable/resize).
 * IMPACTO: Estabilidad en la serialización hacia IndexedDB y ruteo nominal sellado.
 */

let activeSessionMasterKey: CryptoKey | null = null;
const VAULT_DERIVATION_SALT = 'RWC_ZENITH_L2_SALT_V1';

const PersistenceCoreBrain = {

  /**
   * @method igniteSecureSession
   * @description Deriva la llave maestra AES-GCM 'extractable: false' con validación de ADN.
   */
  igniteSecureSession: async (entropySeedMaterial: string): Promise<void> => {
    activeSessionMasterKey = await KeyForgeEngineLogic.forgeMasterSessionKey({
      secretMaterial: KeyEntropyMaterialSchema.parse(entropySeedMaterial),
      saltContext: SaltContextIdentifierSchema.parse(VAULT_DERIVATION_SALT)
    });
  },

  /**
   * @method refineArtifact
   * @description Transmuta datos planos en un Artefacto de Bóveda sellado y normalizado.
   */
  refineArtifact: async (
    targetKey: IPersistenceKey,
    informationMaterial: unknown
  ): Promise<IVaultArtifact> => {
    if (!activeSessionMasterKey) {
      throw new Error('PERSISTENCE_BRAIN_LOCKED: Master key not initialized.');
    }

    // 1. Cifrado AES-GCM 256 (Generación de Materia Oscura)
    const encryptedPacket = await CipherEngineLogic.encryptPayload({
      informationPayload: informationMaterial as any,
      masterCryptionKey: activeSessionMasterKey
    });

    // 2. Generación de Firma de Integridad SHA-256
    const integrityHash = await HashingEngineLogic.generateHash({
        informationMaterial: encryptedPacket.c,
        algorithm: 'SHA-256'
    });

    /**
     * @step Normalización Binaria (Resolución TS2322)
     * Forzamos que los cargamentos binarios residan en ArrayBuffers estándar.
     */
    const encryptedPayload = PersistenceCoreBrain.ensureStandardUint8Array(
      EncodingEngineLogic.transmuteBase64UrlToUint8Array(encryptedPacket.c)
    );

    const initializationVector = PersistenceCoreBrain.ensureStandardUint8Array(
      EncodingEngineLogic.transmuteBase64UrlToUint8Array(encryptedPacket.iv)
    );

    // 3. Ensamblaje bajo contrato genético 9.5.0
    return {
      key: targetKey,
      encryptedPayload,
      initializationVector,
      integrityHash: ArtifactChecksumSchema.parse(integrityHash),
      metadata: {
        schemaVersion: '9.5.0',
        metabolicWeight: 'MEDIUM',
        timestamp: Date.now(),
        isCompressed: false
      }
    };
  },

  /**
   * @method restoreArtifact
   * @description Recupera la legibilidad del material binario restaurando el branding.
   */
  restoreArtifact: async (vaultArtifact: IVaultArtifact): Promise<unknown> => {
    if (!activeSessionMasterKey) {
      throw new Error('PERSISTENCE_BRAIN_LOCKED: Master key missing.');
    }

    /**
     * @step Restauración de Branding (Resolución TS2352)
     */
    const cipherText = EncodingEngineLogic.transmuteUint8ArrayToBase64Url(vaultArtifact.encryptedPayload);
    const initializationVector = EncodingEngineLogic.transmuteUint8ArrayToBase64Url(vaultArtifact.initializationVector);

    // 2. Descifrado por Hardware Acceleration
    return await CipherEngineLogic.decryptPayload(
      {
        c: cipherText as unknown as ICipherText,
        iv: initializationVector as unknown as IEncodingBase64Url,
        t: vaultArtifact.metadata.timestamp
      },
      activeSessionMasterKey
    );
  },

  /**
   * @method ensureStandardUint8Array
   * @private
   * @description Garantiza que el buffer subyacente sea un ArrayBuffer (no SharedArrayBuffer).
   * @fix_error TS2322: Casting explícito a Uint8Array<ArrayBuffer>.
   */
  ensureStandardUint8Array: (inputView: Uint8Array): Uint8Array<ArrayBuffer> => {
    // Si el buffer NO es compartido y ya es un ArrayBuffer estándar
    if (
      inputView.buffer instanceof ArrayBuffer &&
      inputView.buffer.constructor.name !== 'SharedArrayBuffer'
    ) {
      return inputView as Uint8Array<ArrayBuffer>;
    }

    // Si es compartido o no posee los métodos requeridos, forzamos copia física
    const standardBuffer = new ArrayBuffer(inputView.byteLength);
    const standardView = new Uint8Array(standardBuffer);
    standardView.set(inputView);

    return standardView as Uint8Array<ArrayBuffer>;
  }
};

/**
 * @section EXPOSICIÓN RPC
 */
Comlink.expose(PersistenceCoreBrain);

export type IPersistenceCoreBrain = typeof PersistenceCoreBrain;
