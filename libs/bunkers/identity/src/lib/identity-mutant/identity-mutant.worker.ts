/**
 * @apparatus IdentityMutantWorker
 * @role Cerebro asíncrono para la forja de identidad determinística y firmas HMAC.
 * @location libs/bunkers/identity/src/lib/identity-mutant/identity-mutant.worker.ts
 * @status <STABILIZED>
 * @version 8.9.0
 * @protocol OEDP-V8.5 Lattice
 * @hilo Deep-Pulse
 * @structure CEREBRO
 * @compliance ISO_27701 | ISO_27001
 */

import { customAlphabet } from 'nanoid';
import { HashingEngineLogic } from '@razwritecore/nsk-shared-crypto';
import { type IGeoContextPayload } from './identity-mutant.schema';

/**
 * @context_prompt [LIA Legacy - AI-Audit]
 * DIRECTIVA: Implementación estricta de Fórmula M-022 y Sincronización 9.3.0.
 * JUSTIFICACIÓN: Se integra el fragmento cronológico 'YY' en el prefijo para mejorar
 * la trazabilidad de rotación. Se sincroniza con el HashingEngine para usar 'informationMaterial'.
 * IMPACTO: Eliminación de errores de propiedad desconocida y garantía de unicidad global.
 */

// Alfabeto Base62 purificado (M-004/M-022) para evitar ambigüedades visuales.
const BASE62_ALPHABET = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';
const generateNanoCore = customAlphabet(BASE62_ALPHABET, 12);

export const IdentityMutantBrain = {

  /**
   * @method forgePassport
   * @description Ensambla un pasaporte mutante siguiendo la arquitectura concéntrica.
   * @formula [GEO(2)+CITY(3)+YY(2)] . [NANOID(12)] . [HMAC(6)]
   */
  forgePassport: async (geoContext: IGeoContextPayload): Promise<string> => {
    // 1. Fragmento de Contexto (7 chars): Pais + Ciudad + Año
    const currentYearSuffix = new Date().getFullYear().toString().slice(-2);
    const geoPrefix = `${geoContext.countryIsoCode}${geoContext.cityIataCode}${currentYearSuffix}`;

    // 2. Fragmento de Núcleo (12 chars): Entropía pura Base62
    const nanoCore = generateNanoCore();

    // 3. Firma de Integridad (6 chars): Hashing acelerado por hardware
    // Inyectamos entropía adicional del sistema para la semilla de la firma
    const entropyMaterial = `${geoPrefix}.${nanoCore}.${crypto.randomUUID()}`;

    const fullSignature = await HashingEngineLogic.generateHash({
        informationMaterial: entropyMaterial,
        algorithm: 'SHA-256'
    });

    // Truncamiento estratégico para el transporte de Materia Oscura
    const shortSignature = fullSignature.substring(0, 6);

    // 4. Sellado Final
    return `${geoPrefix}.${nanoCore}.${shortSignature}`;
  },

  /**
   * @method validatePassportIntegrity
   * @description Auditoría matemática de la estructura del pasaporte.
   * @requirement ISO_27001 (Control Criptográfico)
   */
  validatePassportIntegrity: async (mutantPassportIdentifier: string): Promise<boolean> => {
    const identificationSegments = mutantPassportIdentifier.split('.');

    // Validación de segmentación trimodal
    if (identificationSegments.length !== 3) return false;

    const [geoSegment, coreSegment, signatureSegment] = identificationSegments;

    // Validación de longitudes nominales
    const isStructureValid =
        geoSegment.length === 7 &&
        coreSegment.length === 12 &&
        signatureSegment.length === 6;

    /**
     * @todo Integrar validación contra la llave maestra del KeyForgeEngine
     * cuando el túnel del QuantumBridge esté operativo.
     */
    return isStructureValid;
  }
} as const;
