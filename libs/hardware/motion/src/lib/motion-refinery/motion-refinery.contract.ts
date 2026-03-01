/**
 * @apparatus KineticMotionContract
 * @role Definición de suscripciones al Sistema Nervioso Soberano (SNS) e IntentOpCodes.
 * @location libs/hardware/motion/src/lib/motion-refinery/motion-refinery.contract.ts
 * @status <STABILIZED>
 * @version 1.0.0
 * @protocol OEDP-V8.5 Lattice
 */

/**
 * @contract KineticMotionContract
 * @description Define el mapa de intenciones y reacciones para la comunicación inercial multihilo.
 * @policy Erradicación de abreviaturas. Nomenclatura absoluta KINETIC_MOTION.
 */
export const KineticMotionContract = {
  intentions: {
    /**
     * @intent INTENT_KINETIC_MONITORING_IGNITION
     * @description Solicita la activación de los sensores inerciales y el cerebro de refinamiento.
     */
    START_MONITORING: 'INTENT_KINETIC_MONITORING_IGNITION',
    /**
     * @intent INTENT_KINETIC_MONITORING_CESSATION
     * @description Ordena el apagado de los sensores para preservar la homeostasis energética.
     */
    STOP_MONITORING: 'INTENT_KINETIC_MONITORING_CESSATION'
  },
  reactions: {
    /**
     * @reaction REACTION_KINETIC_REFINEMENT_SUCCESS
     * @description Notifica la disponibilidad de un snapshot de movimiento procesado y anonimizado.
     */
    SNAPSHOT_READY: 'REACTION_KINETIC_REFINEMENT_SUCCESS',
    /**
     * @reaction REACTION_KINETIC_GESTURE_IDENTIFIED
     * @description Evento de alta jerarquía disparado ante la detección de SHAKING o FREE_FALL.
     */
    GESTURE_DETECTED: 'REACTION_KINETIC_GESTURE_IDENTIFIED',
    /**
     * @reaction REACTION_KINETIC_HARDWARE_COLLAPSE
     * @description Informa el fallo crítico del sensor o la denegación de permisos del SO.
     */
    REFINERY_ERROR: 'REACTION_KINETIC_HARDWARE_COLLAPSE'
  }
} as const;

/**
 * @section TIPADO_NOMINAL_SNS
 * Tipos soberanos para el ruteo de intenciones en el Sovereign Nervous System.
 */
export type IKineticIntent = keyof typeof KineticMotionContract.intentions;
export type IKineticReaction = keyof typeof KineticMotionContract.reactions;
