/**
 * @apparatus SilentWhispererLogic
 * @role Orquestador isomórfico de Service Workers, Background Sync y resiliencia de red.
 * @location libs/shared/nervous-system/src/lib/silent-whisperer/silent-whisperer.logic.ts
 * @status <SEALED_PRODUCTION>
 * @version 9.0.0
 * @protocol OEDP-V8.5 Lattice
 * @hilo Surface-Pulse
 * @structure NEXO
 * @compliance ISO_25010 | ISO_27001
 */

import { SovereignLogger, ApparatusIdentifierSchema, OperationCodeSchema } from '@razwritecore/nsk-shared-logger';
import {
  WorkerRegistrationInputSchema,
  type IWorkerRegistrationInput,
  type IBackgroundSyncTag
} from './silent-whisperer.schema';

const APPARATUS_ID = ApparatusIdentifierSchema.parse('SilentWhisperer');

export const SilentWhispererLogic = {
  /**
   * @method igniteWorkerOrchestration
   * @description Registra el Service Worker y establece el rastro de actualización atómica.
   */
  igniteWorkerOrchestration: async (registrationInput: IWorkerRegistrationInput): Promise<void> => {
    // 1. Isomorfía y Soporte (ISO 25010)
    if (typeof window === 'undefined' || !('serviceWorker' in navigator)) {
      return;
    }

    const validated = WorkerRegistrationInputSchema.parse(registrationInput);

    try {
      // 2. Proceso de Registro
      const registration = await navigator.serviceWorker.register(validated.scriptUrl, {
        scope: validated.scope
      });

      // 3. Gestión de Ciclo de Vida: Auto-sanación de Cache
      registration.onupdatefound = () => {
        const installingWorker = registration.installing;
        if (installingWorker) {
          installingWorker.onstatechange = () => {
            if (installingWorker.state === 'installed' && navigator.serviceWorker.controller) {
              SovereignLogger.emit({
                severity: 'INFO',
                apparatusIdentifier: APPARATUS_ID,
                operationCode: OperationCodeSchema.parse('WORKER_UPDATE_DETECTED'),
                semanticKey: 'NervousSystem.SilentWhisperer.updatePending',
                forensicMetadata: { policy: 'FORCE_RELOAD_ON_IDLE' }
              });
            }
          };
        }
      };

      SovereignLogger.emit({
        severity: 'INFO',
        apparatusIdentifier: APPARATUS_ID,
        operationCode: OperationCodeSchema.parse('WORKER_REGISTERED'),
        semanticKey: 'NervousSystem.SilentWhisperer.registrationSuccess',
        forensicMetadata: { scope: validated.scope, script: validated.scriptUrl }
      });

    } catch (caughtError) {
      SovereignLogger.emit({
        severity: 'ERROR',
        apparatusIdentifier: APPARATUS_ID,
        operationCode: OperationCodeSchema.parse('WORKER_REGISTRATION_FAILED'),
        semanticKey: 'NervousSystem.SilentWhisperer.registrationError',
        forensicMetadata: { caughtError }
      });
    }
  },

  /**
   * @method scheduleBackgroundSync
   * @description Registra una intención de sincronización que el navegador ejecutará al recuperar red.
   */
  scheduleBackgroundSync: async (syncTag: IBackgroundSyncTag): Promise<void> => {
    if (!('serviceWorker' in navigator)) return;

    try {
      const registration = await navigator.serviceWorker.ready;

      // Verificación de capacidad nativa (Background Sync API)
      if ('sync' in registration) {
        await (registration as any).sync.register(syncTag);

        SovereignLogger.emit({
          severity: 'INFO',
          apparatusIdentifier: APPARATUS_ID,
          operationCode: OperationCodeSchema.parse('SYNC_SCHEDULED'),
          semanticKey: 'NervousSystem.SilentWhisperer.syncScheduled',
          forensicMetadata: { tag: syncTag }
        });
      }
    } catch (caughtError) {
      console.error('NSK_WHISPERER_SYNC_REJECTED', caughtError);
    }
  },

  /**
   * @method dispatchMessageToWorker
   * @description Túnel de comunicación directa con el hilo de trasfondo.
   */
  dispatchMessageToWorker: async (messagePayload: unknown): Promise<void> => {
    const controller = navigator.serviceWorker.controller;
    if (controller) {
      controller.postMessage(messagePayload);
    }
  }
} as const;
