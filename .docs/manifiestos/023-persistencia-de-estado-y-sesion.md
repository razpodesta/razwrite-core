🏛️ MANIFIESTO #023: SOBERANÍA DE PERSISTENCIA Y MEMORIA RESILIENTE (NSK EDITION)
Estatus: <SUPREME_ZENITH> | Subsistema: libs/bunkers/persistence
Objetivo: Garantizar la inmortalidad del estado del usuario mediante una arquitectura de persistencia multinivel, cifrada y desacoplada del hilo de UI.
1. ARQUITECTURA DE MEMORIA TRICAMERAL
La persistencia no es un bloque único, es un flujo de tres capas gestionado por el PersistenceBunker:
CAPA 1: Memoria Caliente (L1 - RAM): Gestionada por TanStack Query. Estado volátil de ultra-performance (<1ms).
CAPA 2: Bóveda de Disco (L2 - IndexedDB): El almacén principal. Obligatoriamente cifrado con AES-GCM. Contiene telemetría acumulada, estados de búnkeres de hardware y progreso de usuario.
CAPA 3: Pasaporte de Supervivencia (L3 - Cookie _u_pld): La "Caja Negra". Contiene solo el ADN mínimo (Manifiesto 022) para que el Kernel pueda re-generar las llaves de descifrado de la Capa 2 tras un fallo total.
2. EL PROCESO DE "SHADOW MIRRORING" (ACID COMPLIANCE)
Para evitar estados corruptos durante cierres repentinos:
Stage: Los datos se preparan en un buffer temporal en el Web Worker.
Sign: El shared-crypto firma el paquete con un hash de integridad.
Write: Se escribe en un slot "B" mientras el slot "A" sigue activo.
Swap: Una vez verificada la integridad en "B", se convierte en el estado maestro.
Commit: Se actualiza el last_action_id en el Payload de la Cookie (_u_pld).
3. LÓGICA DE RE-HIDRATACIÓN (RECOVERY PROTOCOL)
Al inicio (shared-kernel-runtime), el sistema ejecuta el "Juicio de Verdad":
Discovery: Intenta leer L2 (IndexedDB).
Integrity Check: Valida el hash contra el ID Mutante del identity-bunker.
Reconciliation: Si L2 falló o está vacío, lee L3 (Cookie).
Re-Gen: El identity-bunker reconstruye el contexto básico y el sync-bunker solicita al servidor los datos faltantes para re-llenar L2.
Broadcast: El evento STATE_HYDRATED se emite al bridge-bus.
4. ESTRATEGIA DE ESCRITURA (PULSE SAVING)
Idle-Time Writing: Las escrituras a disco solo ocurren durante periodos de inactividad de CPU (requestIdleCallback), a menos que sea un evento crítico (ej. pago iniciado).
Atomic Debounce: Agrupación de cambios cada 3 segundos para minimizar el desgaste del hardware (SSD/Flash) y el consumo de energía.
🛠️ ESTRUCTURA LÓGICA DEL APARATO (libs/bunkers/persistence)
Siguiendo el Manifiesto 008 (Lego-Core):
code
Text
libs/bunkers/persistence/src/lib/state-bunker/
├── state-bunker.tsx           # Adaptador: Provider de TanStack & DevTools
├── state-bunker.schema.ts     # ADN: Esquemas de los Snapshots y Versiones de BD
├── state-bunker.logic.ts      # CEREBRO: Orquestador de Mirroring y Re-hidratación
├── state-bunker.worker.ts     # MOTOR: Web Worker para serialización y cifrado
└── i18n/                      # ALMA: Mensajes de "Restaurando experiencia..."

---

