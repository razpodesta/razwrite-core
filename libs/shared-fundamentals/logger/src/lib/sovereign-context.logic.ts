/**
 * @apparatus UniversalContextInjector
 * @role Gestor de estado isomórfico. Garantiza supervivencia del contexto en el Cliente y el Servidor.
 * @location libs/shared-fundamentals/logger/src/lib/sovereign-context.logic.ts
 * @status <SEALED_PRODUCTION>
 * @version 8.5.0
 * @protocol OEDP-V8.5 Lattice
 */

import { AsyncLocalStorage } from 'node:async_hooks';
import type { ISovereignExecutionContext } from './sovereign-logger.schema';

/**
 * Detección determinística del plano de existencia (ISO 25010 - Portabilidad).
 * Previene colapsos en entornos Edge que no poseen el motor Node completo.
 */
const isNodeServerEnvironment = typeof process !== 'undefined' && 
                                process.versions != null && 
                                process.versions.node != null;

/**
 * Emulador de Almacenamiento Atómico para el Plano de Superficie (Navegador).
 * En el cliente (hilo principal), el contexto se ancla al objeto global
 * para evitar pérdida de memoria entre re-renderizados del Proyector (React 19).
 */
class SurfaceContextStorageMock {
  public getStore(): ISovereignExecutionContext | undefined {
    // Extracción segura desde la memoria global del navegador
    return (globalThis as unknown as { __SOVEREIGN_ACTIVE_CONTEXT__?: ISovereignExecutionContext })
      .__SOVEREIGN_ACTIVE_CONTEXT__;
  }

  public run<ReturnPayloadType>(
    store: ISovereignExecutionContext, 
    callback: () => ReturnPayloadType
  ): ReturnPayloadType {
    // Inyección atómica en la memoria global
    (globalThis as unknown as { __SOVEREIGN_ACTIVE_CONTEXT__: ISovereignExecutionContext })
      .__SOVEREIGN_ACTIVE_CONTEXT__ = store;
    
    const executionResult = callback();
    
    // Nota Estratégica: En el navegador no purgamos el store al finalizar 
    // porque la pestaña pertenece a un único usuario/inquilino.
    return executionResult;
  }
}

/**
 * @section FACHADA SOBERANA
 * Orquestador Atómico que transmuta dependiendo del plano de existencia.
 * Acid-Pulse (Servidor) -> AsyncLocalStorage puro para concurrencia masiva.
 * Surface-Pulse (Cliente) -> Emulador anclado a globalThis.
 */
export const SovereignContextStorage = isNodeServerEnvironment
  ? new AsyncLocalStorage<ISovereignExecutionContext>()
  : new SurfaceContextStorageMock();