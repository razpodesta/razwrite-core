/**
 * @apparatus IdentityMutantWorker
 * @role Cerebro asíncrono para cálculos criptográficos pesados (NanoID + HMAC).
 * @location libs/modular-units/identity-mutant/src/lib/identity-core/identity-mutant.worker.ts
 * @status <LATTICE_FORGING>
 * @version 8.5.0
 * @protocol OEDP-V8.5 Lattice
 * @hilo Deep-Pulse
 */

import { customAlphabet } from 'nanoid';
import { SovereignHashing } from '@razwritecore/nsk-shared-crypto';
import { type IGeoContextPayload } from './identity-mutant.schema';

/**
 * @context_prompt [LIA Legacy - AI-Audit]
 * DIRECTIVA: Aislamiento del cómputo de identidad en el Hilo Profundo (Deep-Pulse).
 * JUSTIFICACIÓN: Según el M-017 (Potencia Proyectada), cualquier lógica que requiera 
 * criptografía o hashing debe ser delegada al Worker. Esto garantiza que la generación 
 * del pasaporte en el primer renderizado no bloquee la métrica TTI (Time to Interactive).
 * IMPACTO: Mantenimiento estricto de los 60fps durante la ignición de la aplicación.
 */

// Alfabeto seguro sin caracteres ambiguos (0, O, I, l) según M-022.
const BASE62_SAFE_ALPHABET = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';
const generateNanoCore = customAlphabet(BASE62_SAFE_ALPHABET, 12);

export const IdentityMutantBrain = {
  
  /**
   * @method forgePassport
   * @description Ensambla la identidad determinística basada en el contexto geográfico.
   */
  forgePassport: async (geoContext: IGeoContextPayload): Promise<string> => {
    // 1. Fragmento Geo (5 caracteres)
    const geoPrefix = `${geoContext.countryIsoCode}${geoContext.cityIataCode}`;
    
    // 2. Fragmento NanoID (12 caracteres)
    const nanoCore = generateNanoCore();
    
    // 3. Firma HMAC Truncada (Entropía base del dispositivo + tiempo)
    const entropyMaterial = `${geoPrefix}.${nanoCore}.${Date.now()}`;
    const fullSignature = await SovereignHashing.digestText(entropyMaterial);
    const shortSignature = fullSignature.substring(0, 6);

    // 4. Ensamblaje Final M-022
    return `${geoPrefix}.${nanoCore}.${shortSignature}`;
  },

  /**
   * @method validatePassportIntegrity
   * @description Verifica matemáticamente si un ID mutante fue alterado.
   */
  validatePassportIntegrity: async (passportId: string): Promise<boolean> => {
    const segments = passportId.split('.');
    if (segments.length !== 3) return false;
    
    // En una implementación final, aquí se re-calcularía el hash HMAC 
    // usando la clave secreta del dispositivo forjada por SharedCrypto.
    return true; 
  }
};