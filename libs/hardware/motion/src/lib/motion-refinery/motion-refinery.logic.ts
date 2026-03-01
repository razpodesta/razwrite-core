/**
 * @apparatus KineticMotionLogic
 * @role Orquestador de listeners inerciales con filtrado metabólico y gestión de permisos.
 * @location libs/hardware/motion/src/lib/motion-refinery/motion-refinery.logic.ts
 * @status <STABILIZED>
 * @version 1.1.0
 * @protocol OEDP-V8.5 Lattice
 * @hilo Surface-Pulse
 */

import * as Comlink from 'comlink';
import { SovereignLogger } from '@razwritecore/nsk-shared-logger';
import { MetabolicScheduler } from '@razwritecore/nsk-shared-metabolic-scheduler';
import { type IKineticMotionBrain } from './motion-refinery.worker';
import { type IMotionContextSnapshot } from './motion-refinery.schema';

// Identificador absoluto para el rastro forense (M-004)
const APPARATUS_IDENTIFIER = 'KineticMotionRefinery' as never;

// Estado volátil del puente con el Deep-Pulse
let inertialBrainProxy: Comlink.Remote<IKineticMotionBrain> | null = null;

export const KineticMotionLogic = {
  /**
   * @method igniteRefinery
   * @description Activa la escucha de hardware inercial bajo vigilancia metabólica.
   * @policy Gestiona la solicitud de permisos explícitos para entornos iOS/Project Fugu.
   */
  igniteRefinery: async (
    onPulseCaptured: (snapshot: IMotionContextSnapshot) => void
  ): Promise<void> => {

    // 1. Isomorfía y Soporte de Hardware
    const isSupported = typeof window !== 'undefined' && 'DeviceMotionEvent' in window;
    if (!isSupported) {
      throw new Error('KineticMotionRefinery.Errors.Unsupported');
    }

    try {
      /**
       * @step GESTIÓN_DE_DIPLOMACIA (iOS 13+)
       * Si el SO requiere permiso explícito, lo solicitamos antes de instanciar hilos.
       */
      const motionPermissionProvider = (DeviceMotionEvent as any).requestPermission;
      if (typeof motionPermissionProvider === 'function') {
        const permissionStatus = await motionPermissionProvider();
        if (permissionStatus !== 'granted') {
          throw new Error('KineticMotionRefinery.Errors.PermissionDenied');
        }
      }

      // 2. Inicialización del Cerebro en Deep-Pulse
      if (!inertialBrainProxy) {
        const inertialWorker = new Worker(
          new URL('./motion-refinery.worker.ts', import.meta.url),
          { type: 'module' }
        );
        inertialBrainProxy = Comlink.wrap<IKineticMotionBrain>(inertialWorker);
      }

      // 3. Listener Pasivo con Throttling Natural (M-021)
      let isRefining = false;

      window.addEventListener('devicemotion', async (event: DeviceMotionEvent) => {
        const metabolicMode = MetabolicScheduler.getCurrentMode();

        // Failsafe energético y control de concurrencia
        if (metabolicMode === 'EMERGENCY' || isRefining) return;

        isRefining = true;
        const rawAcceleration = event.accelerationIncludingGravity;

        if (rawAcceleration && inertialBrainProxy) {
          /**
           * @step REFINAMIENTO_ASÍNCRONO
           * Enviamos las señales crudas al Cerebro para cálculo vectorial y truncamiento.
           */
          const refinedSnapshot = await inertialBrainProxy.refineInertialSignal(
            rawAcceleration.x || 0,
            rawAcceleration.y || 0,
            rawAcceleration.z || 0
          );

          onPulseCaptured(refinedSnapshot);
        }

        /**
         * @policy THROTTLING_METABÓLICO_DINÁMICO
         * PEAK: 60Hz (16ms) | ECO: 10Hz (100ms)
         */
        const throttleDelay = metabolicMode === 'PEAK' ? 16 : 100;
        setTimeout(() => { isRefining = false; }, throttleDelay);

      }, { passive: true });

      // 4. Rastro Forense de Ignición (M-001)
      SovereignLogger.emit({
        severity: 'INFO',
        apparatusIdentifier: APPARATUS_IDENTIFIER,
        operationCode: 'INERTIAL_REFINERY_IGNITED' as never,
        semanticKey: 'KineticMotionRefinery.Status.IgnitionSuccess'
      });

    } catch (caughtError) {
      SovereignLogger.emit({
        severity: 'ERROR',
        apparatusIdentifier: APPARATUS_IDENTIFIER,
        operationCode: 'INERTIAL_IGNITION_FAILED' as never,
        semanticKey: 'KineticMotionRefinery.Errors.InitializationFailed',
        forensicMetadata: { caughtError }
      });
      throw caughtError;
    }
  }
};
