/**
 * @apparatus BinaryBridgeWorker
 * @role Kernel de execução assíncrona para módulos WebAssembly (WASM).
 * @location libs/shared/binary-bridge/src/lib/binary-core/binary-core.worker.ts
 * @status <SEALED_PRODUCTION>
 * @version 1.0.1
 * @protocol OEDP-V8.5 Lattice
 * @hilo Deep-Pulse
 * @structure CEREBRO
 * @description
 * Gerencia o ciclo de vida operacional de binários compilados.
 * Executa lógica próxima ao metal isolada da thread principal para preservar os 60fps.
 */

import * as Comlink from 'comlink';
import { type IBinaryWorkerContract } from './binary-core.schema';

/**
 * @section ESTADO DO KERNEL (VOLÁTIL)
 * Referência privada à instância binária ativa no espaço de memória do Worker.
 */
let wasmInstance: WebAssembly.Instance | null = null;

const workerInterface: IBinaryWorkerContract = {
  /**
   * @method loadWasm
   * @description Realiza o fetch, compilação e instanciação via streaming do binário.
   * @param webAssemblyUrl Localização física do recurso .wasm.
   */
  loadWasm: async (webAssemblyUrl: string): Promise<void> => {
    const response = await fetch(webAssemblyUrl);

    /**
     * @step Otimização de Performance (ISO 25010)
     * instantiateStreaming é o método mais eficiente, pois compila enquanto baixa os bytes.
     */
    const { instance } = await WebAssembly.instantiateStreaming(response);
    wasmInstance = instance;
  },

  /**
   * @method executeFunction
   * @description Invoca um método exportado pelo núcleo Rust/C++.
   * @param functionName Nome da função no binário.
   * @param parameterCollection Coleção de parâmetros serializáveis.
   */
  executeFunction: async (
    functionName: string,
    parameterCollection: unknown[]
  ): Promise<unknown> => {
    if (!wasmInstance) {
      throw new Error('WASM_NOT_INSTANTIATED: O núcleo binário não foi inicializado.');
    }

    const binaryMethod = wasmInstance.exports[functionName];

    if (typeof binaryMethod !== 'function') {
      throw new Error(`BINARY_METHOD_${functionName}_NOT_FOUND: Função não encontrada no binário.`);
    }

    /**
     * @step Execução Segura (Deep-Pulse)
     * A lógica pesada é processada aqui, evitando o bloqueio da Interface de Usuário.
     */
    return (binaryMethod as Function)(...parameterCollection);
  }
};

/**
 * @section EXPOSIÇÃO SOBERANA
 * Disponibiliza a interface do Worker para o Thread de Superfície via Comlink.
 */
Comlink.expose(workerInterface);
