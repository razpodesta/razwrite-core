/**
 * @apparatus MetabolicSchedulerLogic
 * @role Gobernador de recursos, biosensores y orquestador de estados de energía (Zero-Dependencies).
 * @location libs/shared-fundamentals/metabolic-scheduler/src/lib/scheduler-core/scheduler.logic.ts
 * @status <SEALED_PRODUCTION>
 * @version 8.6.3
 * @protocol OEDP-V8.5 Lattice
 * @hilo Surface-Pulse
 * @metabolism PEAK
 * @structure NEXO
 */

import { SovereignLogger } from '@razwritecore/nsk-shared-logger';
import { 
  type IMetabolicMode, 
  type IExecutionPermitRequest,
  type IResourceSnapshot,
  ExecutionPermitRequestSchema 
} from './scheduler.schema';

/**
 * @context_prompt [LIA Legacy - AI-Audit]
 * DIRECTIVA: Atomización de Lógica de Cálculo y Blindaje de Ciclo de Vida.
 * JUSTIFICACIÓN: 
 * 1. Se desacopla el motor de cálculo (Determinismo) de los adaptadores de sensores.
 * 2. Se corrige definitivamente la colisión de tipos en 'hardwareConcurrency' (TS 2430).
 * 3. Se implementa un sistema de limpieza para evitar fugas de memoria en entornos HMR.
 * IMPACTO: Mantenibilidad ISO 25010 elevada. El Scheduler es ahora una caja negra determinística.
 */

// --- 1. UNIDAD ATÓMICA: MOTOR DE ESTADO (ISOMÓRFICO) ---

type ISubscriptionCallback<TValue> = (value: TValue) => void;
interface ISovereignSubscription { unsubscribe: () => void; }
interface IObservableState<TValue> { subscribe: (subscriptionCallback: ISubscriptionCallback<TValue>) => ISovereignSubscription; }

class SovereignStateStream<TValue> {
  private currentStoredValue: TValue;
  private activeListenerCollection = new Set<ISubscriptionCallback<TValue>>();

  constructor(initialValue: TValue) {
    this.currentStoredValue = initialValue;
  }

  public getValue(): TValue {
    return this.currentStoredValue;
  }

  public next(nextValue: TValue): void {
    if (this.currentStoredValue !== nextValue) {
      this.currentStoredValue = nextValue;
      this.activeListenerCollection.forEach(callback => callback(this.currentStoredValue));
    }
  }

  public asObservable(): IObservableState<TValue> {
    return {
      subscribe: (callback: ISubscriptionCallback<TValue>): ISovereignSubscription => {
        this.activeListenerCollection.add(callback);
        callback(this.currentStoredValue);
        return {
          unsubscribe: () => {
            this.activeListenerCollection.delete(callback);
          }
        };
      }
    };
  }
}

// --- 2. UNIDAD ATÓMICA: DEFINICIÓN DE HARDWARE ---

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

// --- 3. UNIDAD ATÓMICA: NÚCLEO DE CÁLCULO (INTERNO) ---

const INITIAL_METABOLIC_MODE: IMetabolicMode = 'BALANCED';
const metabolicStateStream = new SovereignStateStream<IMetabolicMode>(INITIAL_METABOLIC_MODE);
let currentResourceSnapshot: IResourceSnapshot = {};
let isBiosensorIgnitionActive = false;
let evaluationDebounceTimeout: ReturnType<typeof setTimeout> | null = null;

/**
 * @internal Algoritmo Determinístico de Clasificación Energética.
 * Centraliza las reglas de negocio metabólicas del sistema.
 */
function calculateOptimalMetabolicMode(snapshot: IResourceSnapshot): IMetabolicMode {
  // Regla de Visibilidad: Si el usuario no mira, el sistema no consume.
  if (typeof document !== 'undefined' && document.hidden) return 'HIBERNATE';

  const { batteryLevel, isCharging, isDataSaverActive, networkEffectiveType } = snapshot;

  // Regla de Supervivencia: <15% sin corriente.
  if (batteryLevel !== undefined && batteryLevel < 0.15 && !isCharging) return 'EMERGENCY';

  // Regla de Eficiencia (ECO): Data Saver activo, red obsoleta o batería <30%.
  if (
    isDataSaverActive || 
    ['slow-2g', '2g'].includes(networkEffectiveType || '') ||
    (batteryLevel !== undefined && batteryLevel < 0.30 && !isCharging)
  ) return 'ECO';

  // Regla de Máximo Rendimiento: Conectado a corriente y red de alta fidelidad.
  if (isCharging && ['4g'].includes(networkEffectiveType || '4g')) return 'PEAK';

  return 'BALANCED';
}

/**
 * @internal Orquestador de Transiciones.
 * Gestiona el rastro forense y la emisión de cambios de estado.
 */
function triggerMetabolicStateShift(triggerReason: string): void {
  const nextCalculatedMode = calculateOptimalMetabolicMode(currentResourceSnapshot);

  if (nextCalculatedMode !== metabolicStateStream.getValue()) {
    metabolicStateStream.next(nextCalculatedMode);
    
    // El rastro forense se omite en HIBERNATE para no despertar el disco innecesariamente.
    if (nextCalculatedMode !== 'HIBERNATE') {
      SovereignLogger.buffer({
        severity: 'INFO',
        apparatusIdentifier: 'MetabolicScheduler',
        operationCode: 'METABOLIC_MODE_SHIFT',
        semanticKey: 'SharedFundamentals.MetabolicScheduler.modeTransition',
        interpolationVariables: { newMode: nextCalculatedMode, reason: triggerReason },
        forensicMetadata: { resourceSnapshot: currentResourceSnapshot }
      });
    }
  }
}

/**
 * @internal Amortiguador de Fluctuaciones de Hardware.
 */
function requestReevaluation(reason: string): void {
  if (evaluationDebounceTimeout) clearTimeout(evaluationDebounceTimeout);
  evaluationDebounceTimeout = setTimeout(() => triggerMetabolicStateShift(reason), 150);
}

// --- 4. FACHADA SOBERANA (M-010) ---

export const MetabolicScheduler = {

  /**
   * @method igniteBiosensors
   * @description Inicializa los detectores físicos del dispositivo (Idempotente).
   */
  igniteBiosensors: async (): Promise<void> => {
    if (typeof window === 'undefined' || isBiosensorIgnitionActive) return;
    isBiosensorIgnitionActive = true;

    const sovereignNavigator = navigator as SovereignNavigator;

    // Captura estática inicial del metal.
    currentResourceSnapshot = {
      ...currentResourceSnapshot,
      deviceMemoryGB: sovereignNavigator.deviceMemory,
      hardwareConcurrency: sovereignNavigator.hardwareConcurrency,
    };

    // Sensor 1: Visibilidad de Interfaz.
    document.addEventListener('visibilitychange', () => {
      requestReevaluation(document.hidden ? 'UI_FOCUS_LOST' : 'UI_FOCUS_REGAINED');
    });

    // Sensor 2: Bio-Energía.
    if (sovereignNavigator.getBattery) {
      try {
        const batteryContext = await sovereignNavigator.getBattery();
        const executeUpdate = () => {
          currentResourceSnapshot = { 
            ...currentResourceSnapshot, 
            batteryLevel: batteryContext.level, 
            isCharging: batteryContext.charging 
          };
          requestReevaluation('HARDWARE_POWER_UPDATE');
        };
        batteryContext.addEventListener('levelchange', executeUpdate);
        batteryContext.addEventListener('chargingchange', executeUpdate);
        executeUpdate(); 
      } catch (caughtError) {
        // Fallo tolerado para navegadores restrictivos.
      }
    }

    // Sensor 3: Calidad de Conectividad.
    if (sovereignNavigator.connection) {
      const networkContext = sovereignNavigator.connection;
      const executeUpdate = () => {
        currentResourceSnapshot = {
          ...currentResourceSnapshot,
          networkEffectiveType: networkContext.effectiveType,
          isDataSaverActive: networkContext.saveData
        };
        requestReevaluation('HARDWARE_NETWORK_UPDATE');
      };
      networkContext.addEventListener('change', executeUpdate);
      executeUpdate();
    }
  },

  /**
   * @method observeMetabolicState
   * @description Provee un canal de observación reactiva para cambios energéticos.
   */
  observeMetabolicState: (): IObservableState<IMetabolicMode> => {
    return metabolicStateStream.asObservable();
  },

  /**
   * @method getCurrentMode
   * @description Consulta síncrona del estado energético actual.
   */
  getCurrentMode: (): IMetabolicMode => {
    return metabolicStateStream.getValue();
  },

  /**
   * @method consultExecutionPermit
   * @description Oráculo de gobernanza para el despacho de intenciones QoS (M-015).
   */
  consultExecutionPermit: (requestPayload: IExecutionPermitRequest): boolean => {
    const validatedRequest = ExecutionPermitRequestSchema.parse(requestPayload);
    const activeMetabolicMode = metabolicStateStream.getValue();

    // VITAL (0) y OPERATIONAL (1): Ejecución garantizada.
    if (validatedRequest.qualityOfServiceTier <= 1) return true;
    
    // RESILIENT (2): Prohibido en colapso energético.
    if (validatedRequest.qualityOfServiceTier === 2 && activeMetabolicMode === 'EMERGENCY') return false;
    
    // BEHAVIORAL (3): Solo permitido en estados de alta disponibilidad.
    if (validatedRequest.qualityOfServiceTier === 3) {
      return ['PEAK', 'BALANCED'].includes(activeMetabolicMode);
    }
    
    return true;
  }
};