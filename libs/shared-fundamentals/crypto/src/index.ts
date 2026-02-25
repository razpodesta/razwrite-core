/**
 * @apparatus SharedCryptoIndex
 * @role Punto de entrada único para el Clúster de Criptografía Soberana.
 * @location libs/shared-fundamentals/crypto/src/index.ts
 * @status <SEALED_PRODUCTION>
 * @version 8.5.3
 * @protocol OEDP-V8.5 Lattice
 */

export { SovereignCipher } from './lib/cipher-engine/cipher.logic';
export { SovereignKeyForge } from './lib/key-forge/key-forge.logic';
export { SovereignHashing } from './lib/hashing-lab/hashing.logic';
export { EncodingUtils } from './lib/utils/encoding.utils';

// Exportación de ADN y Tipos Nominales
export {
  EncryptionInputSchema,
  EncryptedPacketSchema,
  KeyDerivationInputSchema,
  Base64UrlStringSchema,
  CipherTextSchema,
  InitializationVectorSchema
} from './lib/crypto-core.schema';

export type {
  IEncryptedPacket,
  IEncryptionInput,
  IKeyDerivationInput,
  IBase64UrlString,
  ICipherText,
  IInitializationVector
} from './lib/crypto-core.schema';