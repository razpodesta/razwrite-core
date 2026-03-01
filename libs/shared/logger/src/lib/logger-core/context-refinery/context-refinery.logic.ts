/**
 * @apparatus ContextRefineryLogic
 * @role Gestor de estado isomórfico com validação de biosegurança em tempo de execução.
 * @location libs/shared/logger/src/lib/logger-core/context-refinery/context-refinery.logic.ts
 * @status <STABILIZED>
 * @version 9.0.2
 * @protocol OEDP-V8.5 Lattice
 * @hilo Surface-Pulse | Acid-Pulse
 * @structure NEXO
 * @compliance ISO_25010 | ISO_27001
 */

import { AsyncLocalStorage } from 'node:async_hooks';

/**
 * @section Sincronia_NodeNext
 * M-019: Inserção do rastro .js para resolução de módulos em ambiente ESM de 2026.
 */
import {
  type ISovereignExecutionContext,
  SovereignExecutionContextSchema,
} from './context-refinery.schema.js';

/**
 * @section DETECCIÓN DE ENTORNO (M-004)
 */
const isNodeRuntimeEnvironment =
  typeof process !== 'undefined' &&
  process.versions != null &&
  process.versions.node != null;

/**
 * @interface ISovereignGlobalScope
 * @description Extensão tipada para o escopo global (Window ou Node Global).
 */
interface ISovereignGlobalScope {
  __SOVEREIGN_ACTIVE_CONTEXT__?: ISovereignExecutionContext;
}

/**
 * @class SurfaceContextStorageAdapter
 * @description Implementação para navegadores (Surface-Pulse) baseada na memória global do fio único.
 */
class SurfaceContextStorageAdapter {
  /**
   * @method getStore
   * @description Recupera o contexto ativo da memória global sem casting inseguro.
   */
  public getStore(): ISovereignExecutionContext | undefined {
    const globalContextSource = globalThis as unknown as ISovereignGlobalScope;
    return globalContextSource.__SOVEREIGN_ACTIVE_CONTEXT__;
  }

  /**
   * @method run
   * @description Executa um fluxo sob um contexto validado pela Aduana de ADN.
   */
  public run<T>(
    contextPayload: ISovereignExecutionContext,
    executionCallback: () => T
  ): T {
    // Aduana de Biosegurança (M-005)
    const validatedExecutionContext = SovereignExecutionContextSchema.parse(contextPayload);

    // Injeção de Contexto no rastro global
    (globalThis as unknown as ISovereignGlobalScope).__SOVEREIGN_ACTIVE_CONTEXT__ =
      validatedExecutionContext;

    try {
      return executionCallback();
    } finally {
      // No navegador, o contexto é mantido para correlação de micro-gestos
    }
  }
}

/**
 * @class NodeContextStorageAdapter
 * @description Implementação para servidores e SSR (Acid-Pulse) baseada em ganchos assíncronos nativos.
 */
class NodeContextStorageAdapter {
  /** @section Biosegurança_de_Memória */
  private readonly storageInstance = new AsyncLocalStorage<ISovereignExecutionContext>();

  /**
   * @method getStore
   * @description Recupera o contexto do balde assíncrono ativo.
   */
  public getStore(): ISovereignExecutionContext | undefined {
    return this.storageInstance.getStore();
  }

  /**
   * @method run
   * @description Isola a execução sob um rastro forense inalterável.
   */
  public run<T>(
    contextPayload: ISovereignExecutionContext,
    executionCallback: () => T
  ): T {
    const validatedExecutionContext = SovereignExecutionContextSchema.parse(contextPayload);
    return this.storageInstance.run(validatedExecutionContext, executionCallback);
  }
}

/**
 * @section FACHADA DE CONTEXTO (M-010)
 * Exportação do Objeto Orquestrador adaptado dinamicamente ao ambiente de execução.
 * Garante que o Logger consuma a mesma API em qualquer hilo (Isomorfismo).
 */
export const ContextRefinery = isNodeRuntimeEnvironment
  ? new NodeContextStorageAdapter()
  : new SurfaceContextStorageAdapter();
