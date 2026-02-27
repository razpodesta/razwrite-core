🔐 MANIFIESTO #019: SOBERANÍA CRIPTOGRÁFICA Y PRIVACIDAD ATÓMICA (NSK EDITION)
Estatus: <SUPREME_ZENITH> | Subsistema: libs/shared/crypto
Objetivo: Garantizar que el "Petróleo de Datos" sea invisible e inútil para cualquier entidad ajena al Kernel NSK, utilizando aceleración por hardware y protocolos de confianza cero.
1. EL NÚCLEO DE PODER (WEB CRYPTO ENGINE)
El sistema prohíbe el uso de librerías criptográficas pesadas (ej: CryptoJS) para honrar el Presupuesto Cero.
Standard Mandatorio: Uso exclusivo de la Web Crypto API (nativo del navegador).
Algoritmo de Reposo: AES-GCM (256-bit) para datos en IndexedDB y LocalStorage. AES-GCM es preferido sobre AES-CBC por su verificación de integridad integrada (AEAD).
Algoritmo de Tránsito: JWE (JSON Web Encryption) con curvas elípticas (P-256) para el intercambio de llaves efímero con el servidor.
2. LA DOCTRINA DE DERIVACIÓN (KDF)
La clave maestra de cifrado (K_master) no se guarda; se forja en cada sesión:
Salt: El _u_id mutante (M-022).
Entropía: El Device Fingerprint (Manifiesto 020) generado localmente.
Iteración: Uso de PBKDF2 o HKDF para derivar la clave final.
Resultado: Una clave única por dispositivo y por usuario que el navegador mantiene solo en la memoria volátil del Web Worker.
3. ZERO-KNOWLEDGE PERSISTENCE (L2 SHIELD)
Siguiendo el Manifiesto 023 (Persistencia), el flujo de guardado es:
Blindaje: Antes de que el PersistenceBunker escriba en L2, el CryptoBunker recibe el objeto plano en el Web Worker.
Encapsulamiento: Devuelve un Blob cifrado con un vector de inicialización (IV) único.
Invisibilidad: Un inspector de base de datos solo verá basura alfanumérica.
4. FIRMA ELECTRÓNICA Y ANTI-TAMPERING (HMAC)
Toda telemetría refinada (M-021/025) debe ser firmada antes del envío:
Protocolo: HMAC-SHA256.
Validación: El servidor rechaza cualquier paquete donde el HMAC no coincida con el rastro del _u_id, detectando ataques de intermediario (MITM) o manipulación de red.
5. ANONIMIZACIÓN DINÁMICA (COMPLIANCE LOCK)
El Shared-Crypto actúa como el brazo ejecutor del ComplianceBunker (M-025):
Kill-Switch: Si el usuario revoca el permiso de "Personalización", el búnker de seguridad destruye las llaves de derivación locales.
Data Scrambling: Los datos en L2 se vuelven instantáneamente irrecuperables (Purga Criptográfica), eliminando la necesidad de costosos procesos de borrado físico.
🛠️ ESTRUCTURA LÓGICA DEL APARATO (libs/shared/crypto)
Siguiendo el Manifiesto 008 (Lego-Core):
code
Text
libs/shared/crypto/src/lib/crypto-engine/
├── crypto-engine.schema.ts     # ADN: Esquemas para IVs, Salts y Ciphertexts
├── crypto-engine.logic.ts      # CEREBRO: Wrappers de Web Crypto (Encrypt/Decrypt/Sign)
├── crypto-engine.worker.ts     # MOTOR: El Web Worker donde vive la Clave Maestra
├── crypto-engine.utils.ts      # HERRAMIENTAS: Generación de Fingerprint y Entropía
└── README.md                   # PASAPORTE: Documentación del protocolo de rotación

---
## 6. ADÉNDUM: DOCTRINA DE PRIVACIDAD ASIMÉTRICA Y CONTROL SOBERANO

Bajo el estándar Lattice V8.5, el cifrado extremo (Zero-Knowledge) rige para entidades externas e inquilinos, pero **no aplica a la inteligencia central del RazWrite Core**. 
*   **Propiedad del Dato:** La telemetría conductual, intenciones de compra y mapas de calor (Clickstream) son el "Petróleo" del ecosistema. Esta información es envuelta en Materia Oscura (JWE) en el cliente para protegerla en tránsito, pero el **Omniscience Analytics Engine** en el servidor posee las llaves maestras asimétricas para descifrar, persistir y analizar el 100% de este flujo.
*   **Perfilamiento Libre de Riesgo (Risk-Free Profiling):** Al aislar la Identidad Real (PII) de la Identidad Mutante, el sistema obtiene control total para cruzar datos de usuarios entre múltiples inquilinos (Cross-Tenant Profiling) sin violar la normativa ISO 27701. Nosotros perfilamos el comportamiento del hash criptográfico, obteniendo inteligencia de negocio de grado corporativo sin la exposición legal de custodiar identidades civiles.

---

Aplica a: Manifiesto 015 y 019
Directiva: Blindaje total de Server Actions contra la visibilidad de datos.
Protocolo de Relevo Ciego: Las Next.js Server Actions operan como túneles de transporte. El servidor de aplicaciones tiene prohibido descifrar payloads que contengan PII (Información Personal Identificable).
Validación Stateless: El servidor solo valida la firma HMAC del paquete y la vigencia del MutantPassportIdentifier. Si la firma es válida, el paquete se releva directamente a la capa de base de datos cifrada o al Neural Sentinel.
Robustez: Esto garantiza que incluso ante un compromiso total del servidor de aplicaciones, los datos del usuario permanezcan cifrados (Zero-Knowledge Architecture).

---


