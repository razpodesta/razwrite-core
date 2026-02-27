/**
 * @apparatus BinaryBridgeLogic
 * @role Orquestrador de ignição binária e mediador multi-hilo mediante Comlink.
 * @location libs/shared/binary-bridge/src/lib/binary-core/binary-core.logic.ts
 * @status <SEALED_PRODUCTION>
 * @version 1.0.2
 * @protocol OEDP-V8.5 Lattice
 * @hilo Surface-Pulse
 * @structure NEXO
 * @compliance ISO_25010
 */

import * as Comlink from 'comlink';
import {
  SovereignLogger,
  ApparatusIdentifierSchema,
  OperationCodeSchema
} from '@razwritecore/nsk-shared-logger';
import { MetabolicScheduler } from '@razwritecore/nsk-shared-metabolic-scheduler';
import {
  BinaryIgnitionInputSchema,
  type IBinaryIgnitionInput,
  type IBinaryModuleIdentifier,
  type IBinaryWorkerContract
} from './binary-core.schema';

/**
 * @section CONSTANTES SOBERANAS
 */
const APPARATUS_ID = ApparatusIdentifierSchema.parse('BinaryBridge');

/**
 * @section ALMACÉN DE PUENTES (VOLATILE)
 * Gerencia os túneis de comunicação com os Workers binários.
 */
const ACTIVE_WORKER_PROXIES = new Map<IBinaryModuleIdentifier, Comlink.Remote<IBinaryWorkerContract>>();

export const BinaryBridgeLogic = {
  /**
   * @method igniteBinaryCore
   * @description Inicializa um novo fio de execução binária validando recursos energéticos.
   */
  igniteBinaryCore: async (ignitionPayload: IBinaryIgnitionInput): Promise<boolean> => {
    // 1. Aduana Genética (M-005)
    const validatedInformation = BinaryIgnitionInputSchema.parse(ignitionPayload);

    // 2. Auditoria Metabólica (ISO 25010)
    const hasMetabolicPermit = MetabolicScheduler.consultExecutionPermit({
      qualityOfServiceTier: 1, // Prioridade Operacional
      estimatedComplexity: 90  // Carga de instanciação WASM
    });

    if (!hasMetabolicPermit) {
      SovereignLogger.emit({
        severity: 'WARN',
        apparatusIdentifier: APPARATUS_ID,
        operationCode: OperationCodeSchema.parse('IGNITION_DENIED_BY_METABOLISM'),
        semanticKey: 'BinaryBridge.ignitionDenied'
      });
      return false;
    }

    try {
      /**
       * 3. Forja de Hilo (Web Worker)
       * Resolução de TS1343: A configuração do tsconfig.lib.json agora permite import.meta.url.
       */
      const binaryExecutionWorker = new Worker(
        new URL('./binary-core.worker.ts', import.meta.url),
        {
          type: 'module',
          name: `nsk-binary-core-${validatedInformation.moduleIdentifier}`
        }
      );

      // 4. Enlace Comlink (Túnel Tipado)
      const workerProxy = Comlink.wrap<IBinaryWorkerContract>(binaryExecutionWorker);

      // 5. Carga do Binário no Deep-Pulse
      await workerProxy.loadWasm(validatedInformation.webAssemblyResourceLocation);

      ACTIVE_WORKER_PROXIES.set(validatedInformation.moduleIdentifier, workerProxy);

      // 6. Rastro Forense de Estabilização
      SovereignLogger.emit({
        severity: 'INFO',
        apparatusIdentifier: APPARATUS_ID,
        operationCode: OperationCodeSchema.parse('BINARY_CORE_STABILIZED'),
        semanticKey: 'BinaryBridge.ignitionSuccess',
        forensicMetadata: { moduleIdentifier: validatedInformation.moduleIdentifier }
      });

      return true;

    } catch (caughtError) {
      // 7. Transmutação de Falha Crítica
      SovereignLogger.emit({
        severity: 'CRITICAL',
        apparatusIdentifier: APPARATUS_ID,
        operationCode: OperationCodeSchema.parse('BINARY_IGNITION_FAILURE'),
        semanticKey: 'BinaryBridge.ignitionError',
        forensicMetadata: { caughtError }
      });
      return false;
    }
  },

  /**
   * @method getCoreProxy
   * @description Recupera o túnel de comunicação tipado para o núcleo binário.
   */
  getCoreProxy: (
    moduleIdentifier: IBinaryModuleIdentifier
  ): Comlink.Remote<IBinaryWorkerContract> | null => {
    return ACTIVE_WORKER_PROXIES.get(moduleIdentifier) || null;
  }
} as const;
