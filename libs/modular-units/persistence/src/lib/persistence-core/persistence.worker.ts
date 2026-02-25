/**
 * @apparatus PersistenceWorker
 * @role Motor de cifrado asíncrono y derivación de llaves para la Bóveda L2 (IndexedDB).
 * @location libs/modular-units/persistence/src/lib/persistence-core/persistence.worker.ts
 * @status <SEALED_PRODUCTION>
 * @version 8.7.0
 * @protocol OEDP-V8.5 Lattice
 * @hilo Deep-Pulse
 */

import * as Comlink from 'comlink';
import { 
  SovereignCipher, 
  SovereignHashing, 
  SovereignKeyForge,
  EncodingUtils,
  type IBase64UrlString,
  type ICipherText,
  type IEncryptedPacket 
} from '@razwritecore/nsk-shared-crypto';

import { 
  type IVaultArtifact, 
  type IPersistenceKey 
} from './persistence.schema';

/**
 * @context_prompt [LIA Legacy - AI-Audit]
 * DIRECTIVA: Exposición de API vía Comlink.
 * JUSTIFICACIÓN: Para garantizar el aislamiento de hilos (M-017), el objeto de lógica 
 * debe ser expuesto mediante un canal de mensajería (RPC). 
 * IMPACTO: El hilo principal (Surface-Pulse) delega la carga computacional pesada 
 * a este trabajador sin bloquear el renderizado.
 */

let sessionMasterKey: CryptoKey | null = null;
const VAULT_DERIVATION_SALT = 'RWC_L2_PERSISTENCE_CONTEXT_V1';

const PersistenceRefinery = {

  /**
   * @method igniteSecureSession
   * @description Deriva la llave maestra de persistencia usando PBKDF2 (M-019).
   */
  igniteSecureSession: async (entropySeed: string): Promise<void> => {
    sessionMasterKey = await SovereignKeyForge.deriveSessionKey({
      secretMaterial: entropySeed,
      saltContext: VAULT_DERIVATION_SALT
    });
  },

  /**
   * @method refineArtifact
   * @description Transmuta datos planos en un Artefacto de Bóveda cifrado (Materia Oscura).
   */
  refineArtifact: async (key: string, data: unknown): Promise<IVaultArtifact> => {
    if (!sessionMasterKey) {
      throw new Error('RWC-VAULT-LOCKED: La llave maestra no ha sido iniciada en el Worker.');
    }

    const encryptedPacket = await SovereignCipher.encrypt({
      dataPayload: data as Record<string, unknown>,
      masterKey: sessionMasterKey
    });

    return {
      key: key as IPersistenceKey,
      encryptedBlob: EncodingUtils.base64UrlToBuffer(encryptedPacket.c),
      iv: EncodingUtils.base64UrlToBuffer(encryptedPacket.iv),
      checksum: await SovereignHashing.digestText(encryptedPacket.c),
      updatedAt: Date.now()
    };
  },

  /**
   * @method restoreArtifact
   * @description Recupera y descifra datos de la bóveda (Regresión-Free).
   */
  restoreArtifact: async (artifact: IVaultArtifact): Promise<unknown> => {
    if (!sessionMasterKey) {
      throw new Error('RWC-VAULT-LOCKED: Llave de sesión ausente.');
    }

    const packet: IEncryptedPacket = {
      c: EncodingUtils.bufferToBase64Url(artifact.encryptedBlob) as ICipherText,
      iv: EncodingUtils.bufferToBase64Url(artifact.iv) as IBase64UrlString,
      t: artifact.updatedAt
    };

    return await SovereignCipher.decrypt(packet, sessionMasterKey);
  }
};

// Exposición soberana del trabajador al hilo de superficie
Comlink.expose(PersistenceRefinery);

// Exportación del tipo para el Proxy en el hilo principal
export type IPersistenceRefinery = typeof PersistenceRefinery;