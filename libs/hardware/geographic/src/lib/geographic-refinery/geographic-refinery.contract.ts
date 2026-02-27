/**
 * @apparatus GeoRefineryContract
 * @role Definición de suscripciones al Sistema Nervioso Soberano (SNS).
 * @location libs/hardware/geo/src/lib/geo-refinery.contract.ts
 */
export const GeoRefineryContract = {
  intentions: {
    EXTRACT_CONTEXT: 'INTENT_HW_GEO_EXTRACT',
  },
  reactions: {
    CONTEXT_READY: 'REACTION_HW_GEO_SUCCESS',
    CONTEXT_ERROR: 'REACTION_HW_GEO_FAILED'
  }
} as const;
