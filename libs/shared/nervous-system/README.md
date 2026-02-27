/**
 * @apparatus SovereignNervousSystemCluster (NSK-SHARED-SNS)
 * @role Orquestador de Comunicación Multihilo, Clúster de Intenciones y Homeostasis de QoS.
 * @location libs/shared-fundamentals/sovereign-nervous-system/README.md
 * @status <SEALED_PRODUCTION>
 * @version 8.5.0 Zenith Edition
 * @protocol OEDP-V8.5 Lattice
 */

# 🧠 SOVEREIGN-NERVOUS-SYSTEM (EL CÓRTEX SENSORIAL)

## 📜 DECLARACIÓN DE MISIÓN
El Sovereign Nervous System (SNS) es la evolución terminal del antiguo bridge-bus. Su misión es actuar como el Córtex Cerebral del RazWrite Core, gestionando el flujo de información entre el Plano de Superficie (UI), el Plano del Kernel (Web Worker) y el Plano de la Bóveda (Server).

A diferencia de un bus de eventos tradicional, el SNS es un **Clúster Cognitivo** que intercepta, prioriza, comprime y cifra cada bit de intención, garantizando que el sistema mantenga una performance de 60fps incluso bajo presión osmótica de datos masivos. Su arquitectura interna respeta la **Doctrina de Agrupación por Dominio (M-036)**.

## 🧠 LÓGICA DEL BÚNKER (DOCTRINA LATTICE)
Bajo la Arquitectura de Celosía, el SNS implementa los siguientes pilares de gobernanza:

1.  **Orquestación de Triple Hilo (M-015):** Intercepta intenciones en la UI y decide instantáneamente su destino. Si la operación es "Dark Matter" (Cifrado, Persistencia, Lógica), la desvía al Web Worker sin tocar el hilo principal.
2.  **Priorización QoS (Quality of Service):** Clasifica el tráfico en cuatro rangos matemáticos mediante el `IntentionRouter`:
    *   **VITAL (0):** Acciones financieras e identidad (Latencia Cero).
    *   **OPERATIONAL (1):** Navegación y carga de búnkeres (Prioridad Media).
    *   **RESILIENT (2):** Sincronización de estado (Puede esperar).
    *   **BEHAVIORAL (3):** Telemetría de micro-gestos (Prioridad Baja / Background).
3.  **Estado Cuántico (Zero-Copy):** A través del `QuantumBridge`, gestiona túneles de `SharedArrayBuffer` para que los datos masivos no necesiten ser clonados entre hilos, eliminando la latencia de serialización.
4.  **Resiliencia Silenciosa:** El `SilentWhisperer` orquesta los Service Workers para mantener el flujo de datos vitales incluso si el usuario cierra la pestaña o pierde conectividad momentánea.

## 🏗️ ANATOMÍA DE LEGO (M-008 & M-036)
Este búnker reside en la capa `shared-fundamentals/` y posee una estructura de Clúster (Domain Clustering):

```text
libs/shared-fundamentals/sovereign-nervous-system/src/
├── index.ts                        # LA PUERTA SELLADA (Fachada del Clúster)
└── lib/
    ├── intention-router/           # UNIDAD 1: El Córtex de RxJS (QoS)
    │   ├── intention-router.logic.ts
    │   ├── intention-router.schema.ts
    │   └── i18n/                   # El Alma del Router
    ├── quantum-bridge/             # UNIDAD 2: Memoria Compartida (Zero-Copy)
    │   └── quantum-bridge.logic.ts
    └── silent-whisperer/           # UNIDAD 3: Orquestador de Service Workers
        └── silent-whisperer.logic.ts
🔗 INTER-CONECTIVIDAD (LATTICE NETWORK)
Con el Metabolic Scheduler: Recibe órdenes para silenciar pulsos de baja prioridad (QoS 3) si el dispositivo entra en modo ECO.
Con el Identity Mutant Engine: Solicita la firma HMAC para cada pulso que sale hacia la nube.
Con el SDUI Projector: Provee los canales de datos reactivos para hidratar búnkeres visuales en tiempo real.
🛡️ REGLAS DE SOBERANÍA IA
Prohibición de Bloqueo: Está terminantemente prohibido ejecutar lógica síncrona de más de 1ms dentro del intention-router.logic.ts. Cualquier cálculo debe ser delegado a un Worker o diferido.
Nomenclatura Zenith (M-004): No usar bus, msg o emit. Usar sovereignNervousSystem, dispatchIntention y observeReaction.
Integridad de Contrato: Toda nueva intención debe ser registrada primero en el MatrixNeuralBridge antes de ser implementada en el SNS.
Zero-Copy Awareness: Al forjar lógica de transferencia de datos masivos, se debe priorizar el uso del QuantumBridge para evitar la latencia de clonado de memoria JSON.parse.
Firma de Autoridad:
Raz Podestá - Arquitecto Jefe

---

