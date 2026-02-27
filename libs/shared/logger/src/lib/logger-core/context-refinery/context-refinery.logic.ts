/**
 * @apparatus ContextRefineryLogic
 * @role Gestor de estado isomórfico con validación de bioseguridad en tiempo de ejecución.
 * @location libs/shared/logger/src/lib/logger-core/context-refinery/context-refinery.logic.ts
 * @status <STABILIZED>
 * @version 9.0.1
 * @protocol OEDP-V8.5 Lattice
 * @hilo Surface-Pulse | Acid-Pulse
 * @structure NEXO
 */

import { AsyncLocalStorage } from 'node:async_hooks';
import {
  type ISovereignExecutionContext,
  SovereignExecutionContextSchema,
} from './context-refinery.schema';

/**
 * @section DETECCIÓN DE ENTORNO (M-004)
 */
const isNodeRuntimeEnvironment =
  typeof process !== 'undefined' &&
  process.versions != null &&
  process.versions.node != null;

/**
 * @interface IGlobalSovereignContext
 * Extensión tipada de globalThis para evitar contaminación de espacio de nombres.
 */
interface IGlobalSovereignContext {
  __SOVEREIGN_ACTIVE_CONTEXT__?: ISovereignExecutionContext;
}

/**
 * @class SurfaceContextStorageAdapter
 * @description Implementación para navegadores basada en la persistencia del hilo de ejecución único.
 */
class SurfaceContextStorageAdapter {
  /**
   * @method getStore
   * @description Recupera el contexto activo de la memoria global del navegador.
   */
  public getStore(): ISovereignExecutionContext | undefined {
    return (globalThis as unknown as IGlobalSovereignContext)
      .__SOVEREIGN_ACTIVE_CONTEXT__;
  }

  /**
   * @method run
   * @description Ejecuta un flujo de lógica bajo un contexto validado por la Aduana de ADN.
   */
  public run<T>(
    contextPayload: ISovereignExecutionContext,
    executionCallback: () => T
  ): T {
    // 1. Aduana de Bioseguridad (M-005) - Resolución de error TS 2304/6133
    const validatedContext = SovereignExecutionContextSchema.parse(contextPayload);

    // 2. Inyección de Contexto
    (globalThis as unknown as IGlobalSovereignContext).__SOVEREIGN_ACTIVE_CONTEXT__ =
      validatedContext;

    try {
      return executionCallback();
    } finally {
      // Nota: En el navegador, el contexto persiste durante el ciclo de vida del evento/render.
    }
  }
}

/**
 * @class NodeContextStorageAdapter
 * @description Wrapper para AsyncLocalStorage que garantiza el cumplimiento del ADN.
 */
class NodeContextStorageAdapter {
  private readonly storageInstance = new AsyncLocalStorage<ISovereignExecutionContext>();

  public getStore(): ISovereignExecutionContext | undefined {
    return this.storageInstance.getStore();
  }

  public run<T>(
    contextPayload: ISovereignExecutionContext,
    executionCallback: () => T
  ): T {
    const validatedContext = SovereignExecutionContextSchema.parse(contextPayload);
    return this.storageInstance.run(validatedContext, executionCallback);
  }
}

/**
 * @section FACHADA DE CONTEXTO (M-010)
 * Exportación del Objeto Orquestador Constante adaptado al entorno de ejecución.
 */
export const ContextRefinery = isNodeRuntimeEnvironment
  ? new NodeContextStorageAdapter()
  : new SurfaceContextStorageAdapter();
