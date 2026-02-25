/**
 * @apparatus RendererShellLayout
 * @role Contenedor maestro de bioseguridad visual y punto de entrada del proyector.
 * @location apps/razwrite-renderer-shell/src/app/layout.tsx
 * @status <SEALED_PRODUCTION>
 * @version 8.7.0
 * @protocol OEDP-V8.5 Lattice
 */

import './global.css';
import { type ReactNode } from 'react';
import { SovereignIgniter } from './sovereign-igniter';

/**
 * @context_prompt [LIA Legacy - AI-Audit]
 * DIRECTIVA: Sello de Maquetación y Envoltura de Ignición.
 * JUSTIFICACIÓN: Se transmutó el layout estático de Nx en un sistema consciente del estado 
 * del cliente mediante la inyección del `SovereignIgniter`.
 * IMPACTO: Alineación con el Manifiesto 009 (SDUI). El shell está listo para que el 
 * ProjectorCore tome el control del body en la siguiente fase.
 */

export const metadata = {
  title: 'RazWrite Core | Zenith Renderer Shell',
  description: 'Proyector Universal de Escenas Bio-Sintéticas forjado por MetaShark Tech.',
};

interface IRootLayoutProperties {
  readonly children: ReactNode;
}

export default function RootLayout(componentProperties: IRootLayoutProperties) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased selection:bg-gold selection:text-black">
        <SovereignIgniter>
          {componentProperties.children}
        </SovereignIgniter>
      </body>
    </html>
  );
}