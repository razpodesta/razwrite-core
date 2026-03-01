/**
 * @apparatus ProximityEngineContract
 * @role Definición de suscripciones al SNS para IOT-Proximity.
 */
export const ProximityEngineContract = {
  intentions: {
    IGNITE_NFC: 'INTENT_HARDWARE_PROXIMITY_NFC_START',
    STOP_NFC: 'INTENT_HARDWARE_PROXIMITY_NFC_STOP'
  },
  reactions: {
    TAG_DETECTED: 'REACTION_HARDWARE_PROXIMITY_SUCCESS',
    READ_ERROR: 'REACTION_HARDWARE_PROXIMITY_FAILED'
  }
} as const;
