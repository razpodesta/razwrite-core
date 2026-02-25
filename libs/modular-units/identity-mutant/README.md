/**
@apparatus IdentityMutantEngine (IME)
@role Ancla de Soberanía Identitaria, Generador de Pasaportes Mutantes y Gestor de Roaming.
@location libs/bunkers/identity-mutant/README.md
@status <LATTICE_FORGING>
@version 8.5.0 Zenith Edition
@protocol OEDP-V8.5 Lattice
\*/
🗝️ IDENTITY-MUTANT-ENGINE (EL MOTOR DE IDENTIDAD SOBERANA)
📜 DECLARACIÓN DE MISIÓN
El Identity Mutant Engine (IME) es la evolución del antiguo bunker-identity. Su misión es actuar como la Única Fuente de Verdad del Sujeto dentro del RazWrite Core. Implementa la doctrina de Identidad Concéntrica para forjar pasaportes digitales determinísticos, indescifrables y resilientes.
El IME garantiza que el rastro del usuario sea inalterable para el Kernel, pero totalmente opaco para terceros, permitiendo un Handshake de Roaming fluido entre inquilinos (Tenants) sin comprometer la privacidad atómica, emulando la arquitectura de Identidad Unificada (UnionID) de las Super-Apps asiáticas.
🧠 LÓGICA DEL BÚNKER (DOCTRINA LATTICE)
Bajo la Arquitectura de Celosía, el IME implementa los siguientes pilares de soberanía:
Algoritmo de Identidad Mutante (M-022):
Forja identificadores bajo la fórmula: [GEO-CID-YY] . [BASE62-NANOID] . [HMAC-SIG].
El ID transmuta (rota) su firma HMAC periódicamente basándose en la entropía del dispositivo capturada por el Bio-Refinery.
Protocolo de Roaming Inteligente: Gestiona la derivación de llaves para convertir el UnionID (Identidad Global RWC) en un OpenID (Identidad específica del inquilino), asegurando que el perfil conductual sea coherente pero aislado por compartimentos estancos.
Persistencia Tricameral Resiliente (M-023):
L1 (Sincronía): Contexto en memoria volátil para acceso inmediato del SNS.
L2 (Bóveda): Respaldo cifrado en IndexedDB gestionado fuera del hilo principal.
L3 (Supervivencia): Secure Cookie con el payload mutante mínimo para regenerar el estado tras una purga total del navegador.
Zero-Knowledge Validation: El sistema valida la integridad del pasaporte localmente. El servidor nunca recibe la "Identidad Real" desprotegida, solo fragmentos de validación criptográfica.
🏗️ ANATOMÍA DE LEGO (M-008)
Este búnker reside en la capa bunkers/ y mantiene fronteras de acero:
code
Text
libs/bunkers/identity-mutant/src/
├── index.ts # LA PUERTA SELLADA (Fachada IME)
└── lib/
└── identity-mutant-core/ # EL MOTOR ATÓMICO
├── identity-mutant.logic.ts # EL CEREBRO: Generación de NanoID y HMAC
├── identity-mutant.schema.ts# EL ADN: Contratos de Pasaporte y Roaming
├── identity-mutant.worker.ts# EL MOTOR: Ejecución asíncrona de criptografía
├── roaming-handshake.ts # LA TÁCTICA: Gestión de cambio de Tenant
└── i18n/ # EL ALMA: Mensajes de seguridad y biometría
🔗 INTER-CONECTIVIDAD (LATTICE NETWORK)
Con el Shared-Crypto: Consume el motor SubtleCrypto para la firma y derivación de llaves.
Con el Geo-Refinery: Extrae el prefijo de contexto geográfico para la fórmula del ID.
Con el Sovereign Nervous System: Provee el encabezado de identidad para cada intención despachada hacia la Bóveda Cloud.
🛡️ REGLAS DE SOBERANÍA IA
Zero Abbreviations Policy (M-004): Prohibido usar id, usr, auth. Utilizar mutantPassportIdentifier, authenticatedUserContext, identityAuthenticationProtocol.
Aislamiento de Hilo Obligatorio (M-017): El 100% de la lógica de generación de hashes y firmas debe ocurrir en el identity-mutant.worker.ts. El hilo de UI solo recibe el resultado final.
Prohibición de Texto Plano: Ningún identificador o fragmento del pasaporte puede ser almacenado o transmitido sin pasar por el proceso de sellado criptográfico del Shared-Crypto.
Inmutabilidad de la Verdad: Una vez generado un mutantPassportIdentifier para una sesión, este es inmutable hasta el próximo evento de rotación de llaves dictado por el Metabolic Scheduler.
Firma de Autoridad:
Raz Podestá - Arquitecto Jefe
/**
@apparatus IdentityMutantEngine (IME)
@role Ancla de Soberanía Identitaria, Generador de Pasaportes Mutantes y Gestor de Roaming.
@location libs/bunkers/identity-mutant/README.md
@status <LATTICE_FORGING>
@version 8.5.0 Zenith Edition
@protocol OEDP-V8.5 Lattice
\*/
🗝️ IDENTITY-MUTANT-ENGINE (EL MOTOR DE IDENTIDAD SOBERANA)
📜 DECLARACIÓN DE MISIÓN
El Identity Mutant Engine (IME) es la evolución del antiguo bunker-identity. Su misión es actuar como la Única Fuente de Verdad del Sujeto dentro del RazWrite Core. Implementa la doctrina de Identidad Concéntrica para forjar pasaportes digitales determinísticos, indescifrables y resilientes.
El IME garantiza que el rastro del usuario sea inalterable para el Kernel, pero totalmente opaco para terceros, permitiendo un Handshake de Roaming fluido entre inquilinos (Tenants) sin comprometer la privacidad atómica, emulando la arquitectura de Identidad Unificada (UnionID) de las Super-Apps asiáticas.
🧠 LÓGICA DEL BÚNKER (DOCTRINA LATTICE)
Bajo la Arquitectura de Celosía, el IME implementa los siguientes pilares de soberanía:
Algoritmo de Identidad Mutante (M-022):
Forja identificadores bajo la fórmula: [GEO-CID-YY] . [BASE62-NANOID] . [HMAC-SIG].
El ID transmuta (rota) su firma HMAC periódicamente basándose en la entropía del dispositivo capturada por el Bio-Refinery.
Protocolo de Roaming Inteligente: Gestiona la derivación de llaves para convertir el UnionID (Identidad Global RWC) en un OpenID (Identidad específica del inquilino), asegurando que el perfil conductual sea coherente pero aislado por compartimentos estancos.
Persistencia Tricameral Resiliente (M-023):
L1 (Sincronía): Contexto en memoria volátil para acceso inmediato del SNS.
L2 (Bóveda): Respaldo cifrado en IndexedDB gestionado fuera del hilo principal.
L3 (Supervivencia): Secure Cookie con el payload mutante mínimo para regenerar el estado tras una purga total del navegador.
Zero-Knowledge Validation: El sistema valida la integridad del pasaporte localmente. El servidor nunca recibe la "Identidad Real" desprotegida, solo fragmentos de validación criptográfica.
🏗️ ANATOMÍA DE LEGO (M-008)
Este búnker reside en la capa bunkers/ y mantiene fronteras de acero:
code
Text
libs/bunkers/identity-mutant/src/
├── index.ts # LA PUERTA SELLADA (Fachada IME)
└── lib/
└── identity-mutant-core/ # EL MOTOR ATÓMICO
├── identity-mutant.logic.ts # EL CEREBRO: Generación de NanoID y HMAC
├── identity-mutant.schema.ts# EL ADN: Contratos de Pasaporte y Roaming
├── identity-mutant.worker.ts# EL MOTOR: Ejecución asíncrona de criptografía
├── roaming-handshake.ts # LA TÁCTICA: Gestión de cambio de Tenant
└── i18n/ # EL ALMA: Mensajes de seguridad y biometría
🔗 INTER-CONECTIVIDAD (LATTICE NETWORK)
Con el Shared-Crypto: Consume el motor SubtleCrypto para la firma y derivación de llaves.
Con el Geo-Refinery: Extrae el prefijo de contexto geográfico para la fórmula del ID.
Con el Sovereign Nervous System: Provee el encabezado de identidad para cada intención despachada hacia la Bóveda Cloud.
🛡️ REGLAS DE SOBERANÍA IA
Zero Abbreviations Policy (M-004): Prohibido usar id, usr, auth. Utilizar mutantPassportIdentifier, authenticatedUserContext, identityAuthenticationProtocol.
Aislamiento de Hilo Obligatorio (M-017): El 100% de la lógica de generación de hashes y firmas debe ocurrir en el identity-mutant.worker.ts. El hilo de UI solo recibe el resultado final.
Prohibición de Texto Plano: Ningún identificador o fragmento del pasaporte puede ser almacenado o transmitido sin pasar por el proceso de sellado criptográfico del Shared-Crypto.
Inmutabilidad de la Verdad: Una vez generado un mutantPassportIdentifier para una sesión, este es inmutable hasta el próximo evento de rotación de llaves dictado por el Metabolic Scheduler.
Firma de Autoridad:
Raz Podestá - Arquitecto Jefe
