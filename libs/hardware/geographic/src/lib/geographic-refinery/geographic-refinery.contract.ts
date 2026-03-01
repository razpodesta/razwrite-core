/**
 * @apparatus GeographicRefineryContract
 * @role Definición de suscripciones al Sistema Nervioso Soberano (SNS) e IntentOpCodes.
 * @location libs/hardware/geographic/src/lib/geographic-refinery/geographic-refinery.contract.ts
 * @status <STABILIZED>
 * @version 1.0.0
 * @protocol OEDP-V8.5 Lattice
 */

/**
 * @contract GeographicRefineryContract
 * @description Define el mapa de intenciones y reacciones para la comunicación multihilo.
 * @policy Erradicación de abreviaturas. Nomenclatura absoluta GEOGRAPHIC.
 */
export const GeographicRefineryContract = {
  intentions: {
    /**
     * @intent INTENT_GEOGRAPHIC_CONTEXT_EXTRACT
     * @description Dispara el ciclo de refinamiento de hardware.
     */
    EXTRACT_CONTEXT: 'INTENT_GEOGRAPHIC_CONTEXT_EXTRACT',
  },
  reactions: {
    /**
     * @reaction REACTION_GEOGRAPHIC_CONTEXT_SUCCESS
     * @description Notifica la disponibilidad de un Snapshot anonimizado.
     */
    CONTEXT_READY: 'REACTION_GEOGRAPHIC_CONTEXT_SUCCESS',
    /**
     * @reaction REACTION_GEOGRAPHIC_CONTEXT_FAILED
     * @description Informa el colapso del sensor o la denegación de permisos.
     */
    CONTEXT_ERROR: 'REACTION_GEOGRAPHIC_CONTEXT_FAILED'
  }
} as const;

// Tipado nominal para el despacho de intenciones en el SNS
export type IGeographicIntent = keyof typeof GeographicRefineryContract.intentions;
export type IGeographicReaction = keyof typeof GeographicRefineryContract.reactions;
