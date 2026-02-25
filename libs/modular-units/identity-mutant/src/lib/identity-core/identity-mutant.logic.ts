/**
 * @apparatus IdentityMutantLogic
 * @role Orquestador de superficie para la ignición y recuperación de la identidad.
 * @location libs/modular-units/identity-mutant/src/lib/identity-core/identity-mutant.logic.ts
 * @status <SEALED_PRODUCTION>
 * @version 8.6.1
 * @protocol OEDP-V8.5 Lattice
 * @hilo Surface-Pulse
 */

import { SovereignLogger } from '@razwritecore/nsk-shared-logger';
import { 
  SovereignErrorRefinery, 
  SystemErrorCodeSchema 
} from '@razwritecore/nsk-shared-error-engine';
import { IdentityMutantBrain } from './identity-mutant.worker';
import { 
  type IMutantPassportIdentifier, 
  MutantPassportIdentifierSchema,
  GeoContextPayloadSchema
} from './identity-mutant.schema';

/**
 * @context_prompt [LIA Legacy - AI-Audit]
 * DIRECTIVA: Inyección de Cerrojo de Ignición (Singleton Promise) y Corrección Nominal.
 * JUSTIFICACIÓN: 
 * 1. Se detectó riesgo de 'Race Condition' si múltiples búnkeres solicitan identidad al unísono.
 * 2. Se corrigió la violación de tipo M-005 usando `SystemErrorCodeSchema.parse()`.
 * IMPACTO: Garantía de que solo se genera 1 pasaporte por sesión (ahorro CPU) y cumplimiento estricto de TS.
 */

// Memoria L1 (Volátil)
let activeMutantPassport: IMutantPassportIdentifier | null = null;

// Cerrojo de Concurrencia (Promise Singleton)
let ignitionLock: Promise<IMutantPassportIdentifier> | null = null;

export const IdentityMutantEngine = {

  /**
   * @method igniteSovereignIdentity
   * @description Despierta o forja el pasaporte del usuario actual (Idempotente).
   */
  igniteSovereignIdentity: (): Promise<IMutantPassportIdentifier> => {
    // 1. Retorno Inmediato si ya existe identidad (Cache L1)
    if (activeMutantPassport) {
      return Promise.resolve(activeMutantPassport);
    }

    // 2. Retorno de Promesa en Vuelo si ya se está forjando (Anti-Race Condition)
    if (ignitionLock) {
      return ignitionLock;
    }

    // 3. Inicio del Proceso de Forja (Atomicidad)
    ignitionLock = (async () => {
      try {
        // [Futuro] Aquí iría la recuperación L2 (IndexedDB / Cookie)
        // const recoveredId = await PersistenceBunker.retrieve('MUTANT_ID');

        // Forja de Nueva Identidad (Si no existe L1/L2)
        const defaultGeoContext = GeoContextPayloadSchema.parse({
          countryIsoCode: 'XX',
          cityIataCode: 'UNK'
        });

        // Delegación al Cerebro (Worker)
        const rawPassport = await IdentityMutantBrain.forgePassport(defaultGeoContext);
        
        // Validación de ADN y Asignación L1
        activeMutantPassport = MutantPassportIdentifierSchema.parse(rawPassport);

        // Rastro Forense de Ignición (Fast-Path)
        SovereignLogger.buffer({
          severity: 'INFO',
          apparatusIdentifier: 'IdentityMutantEngine',
          operationCode: 'IDENTITY_FORGED',
          semanticKey: 'ModularUnits.IdentityMutant.forgedSuccessfully',
          forensicMetadata: { geoContext: defaultGeoContext }
        });

        return activeMutantPassport;

      } catch (caughtError) {
        // En caso de fallo, liberamos el cerrojo para permitir reintentos
        activeMutantPassport = null;
        ignitionLock = null;

        throw SovereignErrorRefinery.transmute({
          uniqueErrorCode: SystemErrorCodeSchema.parse('RWC-ID-5001'), // Validación Nominal
          severity: 'FATAL',
          apparatusIdentifier: 'IdentityMutantEngine',
          semanticKey: 'ModularUnits.IdentityMutant.ignitionFailed',
          caughtError
        });
      }
    })();

    return ignitionLock;
  },

  /**
   * @method getActivePassport
   * @description Acceso síncrono O(1) para el Sistema Nervioso.
   */
  getActivePassport: (): IMutantPassportIdentifier | null => {
    return activeMutantPassport;
  }
};