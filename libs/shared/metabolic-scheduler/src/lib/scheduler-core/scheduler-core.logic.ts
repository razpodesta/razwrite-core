/**
 * @apparatus MetabolicSchedulerLogic
 * @role Gobernador determinístico de recursos y orquestador de estados de energía.
 * @location libs/shared/metabolic-scheduler/src/lib/scheduler-core/scheduler-core.logic.ts
 * @status <SEALED_PRODUCTION>
 * @version 9.0.0
 * @protocol OEDP-V8.5 Lattice
 * @hilo Surface-Pulse
 * @structure NEXO
 * @compliance ISO_25010 | ISO_27001
 */

import {
  SovereignLogger,
  ApparatusIdentifierSchema,
  OperationCodeSchema
} from '@razwritecore/nsk-shared-logger';

import {
  type IMetabolicMode,
  type IExecutionPermitRequest,
  type IResourceSnapshot,
  ExecutionPermitRequestSchema
} from './scheduler-core.schema';

/**
 * @section EXTENSIONES DE INTERFAZ (DEEP-AUDIT)
 * Resolución de TS2430 mediante tipado defensivo de APIs de hardware.
 */
interface NetworkInformation extends EventTarget {
  readonly effectiveType: 'slow-2g' | '2g' | '3g' | '4g';
  readonly saveData: boolean;
  addEventListener: (type: 'change', listener: EventListener) => void;
}

interface BatteryManager extends EventTarget {
  readonly level: number;
  readonly charging: boolean;
  addEventListener: (type: 'levelchange' | 'chargingchange', listener: EventListener) => void;
}

interface SovereignNavigator extends Navigator {
  readonly connection?: NetworkInformation;
  readonly getBattery?: () => Promise<BatteryManager>;
  readonly deviceMemory?: number;
}

/**
 * @section CONSTANTES SOBERANAS
 */
const APPARATUS_ID = ApparatusIdentifierSchema.parse('MetabolicScheduler');
const EVALUATION_DEBOUNCE_MS = 150;

/**
 * @class MetabolicStateStream
 * @private
 * Implementación de estado reactivo Zero-Dependency.
 */
class MetabolicStateStream {
  private currentMode: IMetabolicMode = 'BALANCED';
  private readonly listeners = new Set<(mode: IMetabolicMode) => void>();

  public getValue(): IMetabolicMode { return this.currentMode; }

  public next(nextMode: IMetabolicMode): void {
    if (this.currentMode !== nextMode) {
      this.currentMode = nextMode;
      this.listeners.forEach(callback => callback(this.currentMode));
    }
  }

  public subscribe(callback: (mode: IMetabolicMode) => void): { unsubscribe: () => void } {
    this.listeners.add(callback);
    callback(this.currentMode);
    return { unsubscribe: () => this.listeners.delete(callback) };
  }
}

// Estado Único del Gobernador
const stateStream = new MetabolicStateStream();
let resourceSnapshot: IResourceSnapshot = {};
let evaluationTimeout: ReturnType<typeof setTimeout> | null = null;

/**
 * @internal Algoritmo Determinístico de Clasificación (ISO 25010).
 */
function calculateOptimalMode(snapshot: IResourceSnapshot): IMetabolicMode {
  if (typeof document !== 'undefined' && document.hidden) return 'HIBERNATE';

  const { batteryLevel, isCharging, isDataSaverActive, networkEffectiveType } = snapshot;

  // Regla de Supervivencia: <15% sin carga forzada.
  if (batteryLevel !== undefined && batteryLevel < 0.15 && !isCharging) return 'EMERGENCY';

  // Regla ECO: Red débil, ahorro de datos o batería <30%.
  if (
    isDataSaverActive ||
    ['slow-2g', '2g'].includes(networkEffectiveType || '') ||
    (batteryLevel !== undefined && batteryLevel < 0.30 && !isCharging)
  ) return 'ECO';

  // Regla PEAK: Hardware robusto y conectado.
  if (isCharging && networkEffectiveType === '4g') return 'PEAK';

  return 'BALANCED';
}

/**
 * @internal Ejecuta la transición de estado con rastro forense.
 */
function executeStateShift(reason: string): void {
  const nextMode = calculateOptimalMode(resourceSnapshot);

  if (nextMode !== stateStream.getValue()) {
    stateStream.next(nextMode);

    // Telemetría de transición (M-001)
    if (nextMode !== 'HIBERNATE') {
      SovereignLogger.emit({
        severity: 'INFO',
        apparatusIdentifier: APPARATUS_ID,
        operationCode: OperationCodeSchema.parse('METABOLIC_SHIFT'),
        semanticKey: 'NervousSystem.MetabolicScheduler.modeTransition',
        interpolationVariables: { newMode: nextMode, reason },
        forensicMetadata: { snapshot: resourceSnapshot }
      });
    }
  }
}

/**
 * @internal Amortiguador de fluctuaciones de hardware para evitar jitter.
 */
function requestReevaluation(reason: string): void {
  if (evaluationTimeout) clearTimeout(evaluationTimeout);
  evaluationTimeout = setTimeout(() => executeStateShift(reason), EVALUATION_DEBOUNCE_MS);
}

/**
 * @apparatus MetabolicScheduler
 * @description Fachada soberana para la gobernanza energética del dispositivo.
 */
export const MetabolicScheduler = {

  /**
   * @method igniteBiosensors
   * @description Activa la escucha activa de sensores de hardware (Idempotente).
   */
  igniteBiosensors: async (): Promise<void> => {
    if (typeof window === 'undefined') return;

    const nav = navigator as SovereignNavigator;

    // 1. Snapshot Inicial
    resourceSnapshot = {
      ...resourceSnapshot,
      deviceMemoryGB: nav.deviceMemory,
      hardwareConcurrency: nav.hardwareConcurrency
    };

    // 2. Sensor de Visibilidad
    document.addEventListener('visibilitychange', () => {
      requestReevaluation(document.hidden ? 'UI_HIDDEN' : 'UI_VISIBLE');
    });

    // 3. Sensor de Energía (Battery Status API)
    if (nav.getBattery) {
      try {
        const battery = await nav.getBattery();
        const update = () => {
          resourceSnapshot = { ...resourceSnapshot, batteryLevel: battery.level, isCharging: battery.charging };
          requestReevaluation('BATTERY_EVENT');
        };
        battery.addEventListener('levelchange', update);
        battery.addEventListener('chargingchange', update);
        update();
      } catch { /* Fail-safe para navegadores restrictivos */ }
    }

    // 4. Sensor de Red (Network Information API)
    if (nav.connection) {
      const conn = nav.connection;
      const update = () => {
        resourceSnapshot = { ...resourceSnapshot, networkEffectiveType: conn.effectiveType, isDataSaverActive: conn.saveData };
        requestReevaluation('NETWORK_EVENT');
      };
      conn.addEventListener('change', update);
      update();
    }
  },

  /**
   * @method consultExecutionPermit
   * @description Determina si una intención QoS puede ejecutarse bajo el modo actual.
   */
  consultExecutionPermit: (requestPayload: IExecutionPermitRequest): boolean => {
    const validated = ExecutionPermitRequestSchema.parse(requestPayload);
    const mode = stateStream.getValue();

    // VITAL (0) y OPERATIONAL (1) son innegociables.
    if (validated.qualityOfServiceTier <= 1) return true;

    // RESILIENT (2) bloqueado en emergencia.
    if (validated.qualityOfServiceTier === 2 && mode === 'EMERGENCY') return false;

    // BEHAVIORAL (3) solo permitido en PEAK/BALANCED.
    if (validated.qualityOfServiceTier === 3) {
      return ['PEAK', 'BALANCED'].includes(mode);
    }

    return true;
  },

  /**
   * @method observeMetabolicState
   */
  observeMetabolicState: (callback: (mode: IMetabolicMode) => void) => {
    return stateStream.subscribe(callback);
  },

  /**
   * @method getCurrentMode
   */
  getCurrentMode: (): IMetabolicMode => stateStream.getValue()

} as const;
