/**
 * @apparatus AdaptiveTransportLogic
 * @role Selector de vehículo de red (Fetch vs Beacon) según el estado de supervivencia del cliente.
 * @location libs/modular-units/sync-osmosis/src/lib/osmosis-core/adaptive-transport.logic.ts
 * @status <SEALED_PRODUCTION>
 * @version 8.6.1
 * @protocol OEDP-V8.5 Lattice
 */

import { SovereignLogger } from '@razwritecore/nsk-shared-logger';
import { type IOsmoticPulse } from './osmosis-core.schema';

/**
 * @context_prompt [LIA Legacy - AI-Audit]
 * DIRECTIVA: Enriquecimiento de Logs y Fallback de Beacon.
 * JUSTIFICACIÓN: 
 * 1. Se corrigió la variable no usada 'caughtError' integrándola en la metadata forense.
 * 2. Se añadió lógica defensiva para 'sendBeacon': si el blob supera los 64kb (límite común),
 *    el navegador rechaza el envío. El sistema ahora detecta el 'false' y hace fallback a 'fetch-keepalive'.
 * IMPACTO: Mayor tasa de entrega de datos en payloads grandes y observabilidad real de fallos de red.
 */

export const AdaptiveTransport = {
  
  /**
   * @method dispatchPayload
   * @description Decide el mecanismo de transporte y dispara el cargamento.
   */
  dispatchPayload: async (pulse: IOsmoticPulse, isPageTerminating: boolean): Promise<boolean> => {
    const endpoint = pulse.targetVaultEndpoint;
    
    try {
      const payloadString = typeof pulse.opaquePayload === 'string' 
        ? pulse.opaquePayload 
        : JSON.stringify(pulse.opaquePayload);

      // ESTRATEGIA DE SUPERVIVENCIA (QoS 0/1 o Muerte de Página)
      if (isPageTerminating || pulse.qualityOfServiceTier <= 1) {
        
        // 1. Intento Primario: Beacon (No bloqueante, ideal para unload)
        if (typeof navigator !== 'undefined' && navigator.sendBeacon) {
          const blob = new Blob([payloadString], { type: 'application/json' });
          // sendBeacon retorna false si el payload es demasiado grande (aprox > 64kb) o cola llena
          const beaconAccepted = navigator.sendBeacon(endpoint, blob);
          
          if (beaconAccepted) return true;
          // Si retorna false, caemos al fallback inmediatamente...
        }
        
        // 2. Fallback: Fetch con Keepalive (Permite payloads mayores y sobrevive al cierre)
        const response = await fetch(endpoint, {
          method: 'POST',
          body: payloadString,
          headers: { 'Content-Type': 'application/json' },
          keepalive: true, 
        });
        return response.ok;
      }

      // ESTRATEGIA ESTÁNDAR (QoS 2/3 - Vida Normal)
      const response = await fetch(endpoint, {
        method: 'POST',
        body: payloadString,
        headers: { 'Content-Type': 'application/json' }
      });

      return response.ok;

    } catch (caughtError) {
      // Captura forense del motivo de fallo (NetworkError, CORS, etc.)
      const errorDetails = caughtError instanceof Error ? caughtError.message : String(caughtError);

      SovereignLogger.buffer({
        severity: 'WARN',
        apparatusIdentifier: 'AdaptiveTransport',
        operationCode: 'TRANSPORT_FAILED',
        semanticKey: 'ModularUnits.SyncOsmosis.transportDeliveryFailed',
        forensicMetadata: { 
          endpoint: endpoint,
          errorReason: errorDetails,
          payloadSizeEstimate: JSON.stringify(pulse.opaquePayload).length
        }
      });
      
      return false;
    }
  }
};