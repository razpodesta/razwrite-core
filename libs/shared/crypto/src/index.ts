/**
 * @apparatus SharedCryptoFacade
 * @role Ministerio de Bioseguridad y única puerta de entrada al clúster criptográfico.
 * @location libs/shared/crypto/src/index.ts
 * @status <SEALED_PRODUCTION>
 * @version 9.0.0
 * @protocol OEDP-V8.5 Lattice
 */

// --- 1. MOTORES DE LÓGICA (NEXOS) ---
export { CipherEngineLogic } from './lib/cipher-engine/cipher-engine.logic';
export { EncodingEngineLogic } from './lib/encoding-engine/encoding-engine.logic';
export { HashingEngineLogic } from './lib/hashing-engine/hashing-engine.logic';
export { KeyForgeEngineLogic } from './lib/key-forge-engine/key-forge-engine.logic';

// --- 2. CONTRATOS DE ADN (CIPHER) ---
export {
  CipherTransmissionInputSchema,
  OpaqueDataPacketSchema,
  Base64UrlStringSchema as CipherBase64UrlSchema,
  CipherTextSchema,
  InitializationVectorSchema
} from './lib/cipher-engine/cipher-engine.schema';

export type {
  ICipherTransmissionInput,
  IOpaqueDataPacket,
  ICipherText,
  IInitializationVector
} from './lib/cipher-engine/cipher-engine.schema';

// --- 3. CONTRATOS DE ADN (ENCODING) ---
export {
  Base64UrlStringSchema as EncodingBase64UrlSchema
} from './lib/encoding-engine/encoding-engine.schema';

export type {
  IBase64UrlString as IEncodingBase64Url,
  IBufferSource
} from './lib/encoding-engine/encoding-engine.schema';

// --- 4. CONTRATOS DE ADN (HASHING) ---
export {
  HashedFingerprintSchema,
  HashingInputSchema
} from './lib/hashing-engine/hashing-engine.schema';

export type {
  IHashedFingerprint,
  IHashingInput
} from './lib/hashing-engine/hashing-engine.schema';

// --- 5. CONTRATOS DE ADN (KEY FORGE) ---
export {
  MasterKeyDerivationInputSchema,
  KeyEntropyMaterialSchema,
  SaltContextIdentifierSchema
} from './lib/key-forge-engine/key-forge-engine.schema';

export type {
  IMasterKeyDerivationInput
} from './lib/key-forge-engine/key-forge-engine.schema';
