/**
 * @apparatus IdentityMutantLogic
 * @role Orquestador de superficie para la ignición, forja y recuperación de la identidad mutante.
 * @location libs/bunkers/identity/src/lib/identity-mutant/identity-mutant.logic.ts
 * @status <SEALED_PRODUCTION>
 * @version 9.0.0
 * @protocol OEDP-V8.5 Lattice
 * @hilo Surface-Pulse
 * @structure NEXO
 * @compliance ISO_27701 | ISO_25010
 */

import { 
  SovereignLogger, 
  ApparatusIdentifierSchema, 
  OperationCodeSchema 
} from '@razwritecore/nsk-shared-logger';
import { 
  ErrorRefineryLogic, 
  SystemErrorCodeSchema 
} from '@razwritecore/nsk-shared-error-engine';
import { IdentityMutantBrain } from './identity-mutant.worker';
import {
  type IMutantPassportIdentifier,
  MutantPassportIdentifierSchema,
  GeoContextPayloadSchema
} from './identity-mutant.schema';
import { z } from 'zod';

/**
 * @section DIMENSIONES NOMINALES (M-005)
 * Casting de bioseguridad para el rastro forense del Sistema Nervioso.
 */
type IApparatusIdentifier = z.infer<typeof ApparatusIdentifierSchema>;
type IOperationCode = z.infer<typeof OperationCodeSchema>;

/**
 * @section ESTADO CUÁNTICO LOCAL
 * Gestión de memoria L1 y cerrojo de ignición atómica.
 */
let activeMutantPassport: IMutantPassportIdentifier | null = null;
let ignitionLock: Promise<IMutantPassportIdentifier> | null = null;

export const IdentityMutantEngine = {
  /**
   * @method igniteSovereignIdentity
   * @description Activa el protocolo de identidad. Recupera de L2 o delega la forja al Worker.
   * @requirement ISO_25010 (Eficiencia: Anti-Race Condition Singleton)
   */
  igniteSovereignIdentity: (): Promise<IMutantPassportIdentifier> => {
    const ignitionStartTime = performance.now();

    // 1. Verificación de Memoria Caliente (L1)
    if (activeMutantPassport) {
      return Promise.resolve(activeMutantPassport);
    }

    // 2. Intercepción de Concurrencia (Ignición en Vuelo)
    if (ignitionLock) {
      return ignitionLock;
    }

    // 3. Inicio de Forja de Realidad Identitaria
    ignitionLock = (async () => {
      try {
        /**
         * @todo Implementar recuperación desde PersistenceBunker (L2/L3)
         * para persistencia entre recargas de página (M-023).
         */

        const defaultGeoContext = GeoContextPayloadSchema.parse({
          countryIsoCode: 'XX',
          cityIataCode: 'UNK'
        });

        // Delegación del cómputo pesado al Hilo Profundo (M-017)
        const rawPassportMaterial = await IdentityMutantBrain.forgePassport(defaultGeoContext);
        
        // Validación del ADN forjado
        activeMutantPassport = MutantPassportIdentifierSchema.parse(rawPassportMaterial);

        // Registro de Éxito en el Rastro Forense
        SovereignLogger.emit({
          severity: 'INFO',
          apparatusIdentifier: 'IdentityMutantEngine' as unknown as IApparatusIdentifier,
          operationCode: 'IDENTITY_IGNITED' as unknown as IOperationCode,
          semanticKey: 'IdentityMutant.Grants.ForgedSuccessfully',
          executionLatencyInMilliseconds: performance.now() - ignitionStartTime,
          forensicMetadata: { 
            geographicContext: defaultGeoContext,
            identityAlgorithm: 'M-022-ZENITH'
          }
        });

        return activeMutantPassport;

      } catch (caughtError) {
        // Liberación de recursos ante fallo crítico
        activeMutantPassport = null;
        ignitionLock = null;

        /**
         * @section MANIFIESTO 002
         * Transmutación del fallo en rastro forense purificado.
         */
        throw ErrorRefineryLogic.transmute({
          uniqueErrorCode: SystemErrorCodeSchema.parse('RWC-ID-5001'),
          severity: 'FATAL',
          apparatusIdentifier: 'IdentityMutantEngine' as unknown as IApparatusIdentifier,
          semanticKey: 'IdentityMutant.Errors.IgnitionFailed',
          caughtError,
          informationPayloadSnapshot: { 
            ignitionLatency: performance.now() - ignitionStartTime 
          }
        });
      }
    })();

    return ignitionLock;
  },

  /**
   * @method getActivePassport
   * @description Acceso síncrono O(1) a la identidad anclada en memoria L1.
   */
  getActivePassport: (): IMutantPassportIdentifier | null => {
    return activeMutantPassport;
  },

  /**
   * @method deauthorizeIdentity
   * @description Purgado de identidad para cumplimiento del "Derecho al Olvido" (ISO 27701).
   */
  deauthorizeIdentity: (): void => {
    activeMutantPassport = null;
    ignitionLock = null;
  }
} as const;