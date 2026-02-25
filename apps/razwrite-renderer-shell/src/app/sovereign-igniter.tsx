/**
 * @apparatus SovereignIgniter
 * @role Orquestador de ignición secuencial de búnkeres en el Plano de Superficie.
 * @location apps/razwrite-renderer-shell/src/app/sovereign-igniter.tsx
 * @status <SEALED_PRODUCTION>
 * @version 8.7.0
 * @protocol OEDP-V8.5 Lattice
 * @hilo Surface-Pulse
 * @structure NEXO
 */

'use client';

import { useEffect, type ReactNode } from 'react';
import { SovereignLogger } from '@razwritecore/nsk-shared-logger';
import { MetabolicScheduler } from '@razwritecore/nsk-shared-metabolic-scheduler';
import { IdentityMutantEngine } from '@razwritecore/nsk-unit-identity-mutant';
import { PersistenceBunker } from '@razwritecore/unit-persistence';

/**
 * @context_prompt [LIA Legacy - AI-Audit]
 * DIRECTIVA: Implementación de Ignición Secuencial e Isomórfica.
 * JUSTIFICACIÓN: Los búnkeres de Capa 2 (Identidad y Persistencia) dependen de APIs del 
 * navegador (IndexedDB, Web Crypto, Workers) que no existen durante el SSR (Server Side Rendering). 
 * IMPACTO: Este aparato garantiza que la maquinaria lógica se despierte únicamente 
 * en el cliente, evitando colapsos de hidratación en Next.js.
 */

interface ISovereignIgniterProperties {
  readonly children: ReactNode;
}

export function SovereignIgniter(componentProperties: ISovereignIgniterProperties) {
  useEffect(() => {
    const executeSystemIgnition = async () => {
      const executionStartTime = performance.now();

      try {
        // 1. Ignición del Gobernador Metabólico (Sensores de Hardware)
        await MetabolicScheduler.igniteBiosensors();

        // 2. Ignición de Identidad Mutante (Generación de Pasaporte)
        const mutantPassport = await IdentityMutantEngine.igniteSovereignIdentity();

        // 3. Ignición de Persistencia Cifrada (Usa el Pasaporte como semilla de entropía)
        await PersistenceBunker.igniteVault(mutantPassport);

        // 4. Rastro Forense de Éxito
        SovereignLogger.emit({
          severity: 'INFO',
          apparatusIdentifier: 'SovereignIgniter',
          operationCode: 'SYSTEM_READY',
          semanticKey: 'SharedFundamentals.System.bootSuccess',
          executionLatencyInMilliseconds: performance.now() - executionStartTime,
          forensicMetadata: { 
            activeIdentity: mutantPassport,
            metabolicState: MetabolicScheduler.getCurrentMode()
          }
        });

      } catch (caughtError) {
        // Los errores críticos en el arranque se gestionan mediante el rastro forense nativo
        console.error('RWC-BOOT-FAILURE: La maquinaria lógica no pudo despertar.', caughtError);
      }
    };

    executeSystemIgnition();
  }, []);

  return <>{componentProperties.children}</>;
}