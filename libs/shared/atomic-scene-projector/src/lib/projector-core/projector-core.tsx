/**
 * @apparatus SovereignProjector
 * @role Marioneta visual de alta fidelidad para el renderizado de la escena SDUI.
 * @location libs/shared/atomic-scene-projector/src/lib/projector-core/projector-core.tsx
 * @status <SEALED_PRODUCTION>
 * @version 9.3.0
 * @protocol OEDP-V8.5 Lattice
 * @hilo Surface-Pulse
 */

'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { ProjectorCoreLogic } from './projector-core.logic';
import { ProjectorRegistryLogic } from './projector-registry.logic';
import { type ITenantManifest, type ILayoutCell } from './projector-core.schema';

interface ISovereignProjectorProperties {
  readonly tenantManifest: ITenantManifest;
}

export const SovereignProjector: React.FC<ISovereignProjectorProperties> = ({
  tenantManifest
}) => {
  const [activeMatrix, setActiveMatrix] = useState<ILayoutCell[]>([]);
  const [isProjecting, setIsProjecting] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;

    const ignite = async () => {
      try {
        setIsProjecting(true);
        const refinedMatrix = await ProjectorCoreLogic.igniteProjectionSequence(tenantManifest);
        if (isMounted) setActiveMatrix(refinedMatrix);
      } catch {
        // Error ya transmutado en el Nexo
      } finally {
        if (isMounted) setIsProjecting(false);
      }
    };

    ignite();
    return () => { isMounted = false; };
  }, [tenantManifest]);

  const projectionStyle = {
    '--primary-brand': tenantManifest.visualTokens.primaryColor,
    '--border-radius-base': tenantManifest.visualTokens.borderRadius ?? '0.5rem',
    fontFamily: tenantManifest.visualTokens.fontFamily
  } as React.CSSProperties;

  return (
    <main
      id="zenith-projection-root"
      className={isProjecting ? 'opacity-50 transition-opacity' : 'opacity-100 transition-opacity'}
      style={projectionStyle}
    >
      <Suspense fallback={<ProjectorSkeleton />}>
        {activeMatrix.map((layoutCell, indexPosition) => {
          const ApparatusComponent = ProjectorRegistryLogic.getApparatus(layoutCell.apparatusIdentifier);

          if (!ApparatusComponent) return null;

          return (
            <section
              key={`${layoutCell.apparatusIdentifier}-${indexPosition}`}
              className="nsk-apparatus-wrapper"
              data-qos={layoutCell.priorityQoS}
            >
              <ApparatusComponent {...layoutCell.componentProperties} />
            </section>
          );
        })}
      </Suspense>
    </main>
  );
};

const ProjectorSkeleton = () => (
  <div className="w-full h-screen animate-pulse bg-slate-900/50" />
);
