/**
 * @apparatus SharedCryptoEngine (NSK-CRYPTO)
 * @role Motor de Bioseguridad y Cifrado Nativo.
 * @location libs/shared-fundamentals/crypto/
 * @status <SEALED_PRODUCTION>
 * @version 8.5.0 Zenith Edition
 * @protocol OEDP-V8.5 Lattice
 * @iso 27001 (Cryptographic Controls)
 */

# 🔐 SHARED CRYPTO ENGINE

## 📜 DECLARACIÓN DE MISIÓN
El `SharedCryptoEngine` es la bóveda matemática del ecosistema. Su misión es proveer primitivas criptográficas de **Grado Militar (AES-GCM 256)** utilizando exclusivamente la aceleración por hardware del navegador (`Web Crypto API`).

Este búnker está diseñado para operar en un entorno de **Confianza Cero**. Las llaves generadas son marcadas como `extractable: false`, lo que significa que el material de la clave nunca puede ser leído por JavaScript, previniendo la exfiltración masiva ante ataques XSS.

## 🧠 LÓGICA DE ÉLITE (ZENITH V8.5)

### 1. Clúster de Especialización
*   **Cipher Engine:** Encriptación autenticada. Genera su propia entropía (IV) para cada paquete.
*   **Key Forge:** Derivación de llaves robusta (PBKDF2 100k iteraciones) con sal contextual.
*   **Hashing Lab:** Generación de huellas digitales inmutables.

### 2. Materia Oscura (JWE Light)
El output del motor no son bytes crudos, es un objeto estructurado `IEncryptedPacket` que contiene el texto cifrado y el vector de inicialización necesarios para la recuperación, codificados en **Base64Url** seguro para transporte HTTP.

## 🛠️ PROTOCOLO DE CONSUMO (M-010)

```typescript
import { SovereignCipher, SovereignKeyForge } from '@razwritecore/nsk-shared-crypto';

// 1. Forjar una llave de sesión (en memoria)
const sessionKey = await SovereignKeyForge.deriveSessionKey({
  secretMaterial: 'user-password-input',
  saltContext: 'user-uuid-v4'
});

// 2. Cifrar datos sensibles
const encryptedData = await SovereignCipher.encrypt({
  dataPayload: { creditCard: '4111...' },
  masterKey: sessionKey
});

// encryptedData es seguro para enviar al servidor:
// { c: "...", iv: "...", t: 171... }