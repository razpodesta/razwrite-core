/**
 * @apparatus SentinelTetherContract
 * @role Definición de túneles de transmisión y QoS de telemetría.
 * @location libs/integrations/sentinel-tether/src/lib/tether-core/tether-core.contract.ts
 */

export const SentinelTetherContract = {
  apparatusKey: 'SentinelTether',
  intentions: [
    {
      opCode: 'INTENT_SHIP_FORENSIC_BUNDLE',
      priorityQoS: 1, // OPERATIONAL
      isCancellable: false
    }
  ]
};
