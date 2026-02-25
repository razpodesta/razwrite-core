🔑 MANIFIESTO #022: IDENTIDAD UNIFICADA Y PAYLOAD MUTANTE (NSK EDITION)
Estatus: <SUPREME_ZENITH> | Subsistema: libs/bunkers/identity
Objetivo: Crear un ancla de identidad única, cifrada y resiliente que sirva como el "Pasaporte Universal" a través de todas las capas del Kernel.
1. LA FÓRMULA DEL ID MUTANTE (DETERMINISMO OPACO)
Cada entidad es identificada por un hash alfanumérico generado en un hilo secundario (Web Worker):
[GEO-CID-YY] . [BASE62-NANOID] . [HMAC-SIG]
Geo-Context (5 chars): [ISO-Country][IATA-City][YY]. Extraído del hardware-geo bajo permiso del compliance-bunker.
Nano-Core (10-12 chars): Generado con alfabeto A-Z, a-z, 0-9 (sin 0, O, I, l).
Signature (4 chars): Firma corta HMAC-SHA256 truncada para validar integridad sin base de datos.
2. ARQUITECTURA DE PERSISTENCIA TRICAMERAL
Capa Inmutable (Cookie _u_id): Solo el ID. HttpOnly (si se genera en servidor) o Secure/SameSite=Lax.
Capa de Estado Caliente (Cookie _u_pld): El Payload dinámico. Obligatoriamente cifrado mediante el shared-crypto.
Contenido: tier | session_count | last_geo_hash | compliance_version.
Bóveda de Resiliencia (IndexedDB): Backup completo gestionado por el persistence-bunker. En caso de purga de cookies, el sistema "auto-sana" la identidad comparando la firma del hardware.
3. LÓGICA DE IGNICIÓN (THE IDENTITY HEARTBEAT)
El búnker de identidad no actúa solo. Sigue este flujo de "Élite":
Wake-up: El shared-kernel-runtime despierta al identity-bunker en un Web Worker.
Compliance Check: Consulta al compliance-bunker. ¿Hay permiso de persistencia?
Recovery/Gen: Si existe ID, valida firma. Si no, genera uno nuevo con entropía del dispositivo.
Broadcast: Emite evento IDENTITY_READY a través del shared-bridge-bus.
Headers Injection: El bridge-bus inyecta el ID en todas las peticiones salientes del renderer-shell.
4. SEGURIDAD Y PRIVACIDAD (ZERO-TRUST)
Rotación de Payload: El payload se re-cifra cada vez que el session_count aumenta o el usuario cambia de red (hardware-motion detecta el cambio).
Anonimización por Compliance: Si el usuario revoca permisos, el identity-bunker transmuta el ID real a un ID de Sesión Volátil y purga las cookies de persistencia.
🛠️ ESTRUCTURA LÓGICA DEL APARATO (libs/bunkers/identity)
Siguiendo el Manifiesto 008 (Lego-Core), este búnker se organiza así:
code
Text
libs/bunkers/identity/src/lib/identity-mutant/
├── identity-mutant.tsx           # Adaptador (UI de login o perfil si aplica)
├── identity-mutant.schema.ts     # ADN: Contratos Zod para el ID y Payload
├── identity-mutant.logic.ts      # CEREBRO: Algoritmo NanoID y Checksum (Worker Ready)
├── identity-mutant.crypto.ts     # ADAPTADOR INFRA: Cifrado vía shared-crypto
└── i18n/                         # ALMA: Mensajes de "Sesión recuperada" o "Error de Identidad"

---
## 5. ADÉNDUM: BÓVEDA DE CORRELACIÓN Y SOBERANÍA DEL NEXO (SHADOW CORRELATION)

El sistema rige bajo el principio de "Segregación de Hemisferios".
*   **Aislamiento de PII:** Está estrictamente prohibido almacenar Información Personal Identificable (PII como emails, nombres o teléfonos) en las mismas bases de datos o unidades que gestionan el comportamiento, la proyección visual (SDUI) o la telemetría.
*   **El Nexo Central:** La correlación entre el `mutantPassportIdentifier` (Gemelo Virtual) y el usuario civil (Dueño Real) reside de forma exclusiva en el `identity-correlation-vault`. 
*   **Acceso Restringido:** Solo el núcleo más profundo del Kernel (Acid-Pulse) tiene los permisos criptográficos para consultar esta bóveda. Los inquilinos (Tenants) jamás tendrán acceso a este nexo; la "Identidad Real" es propiedad exclusiva de la infraestructura RazWrite Core para monetización y cumplimiento legal transaccional.

---



