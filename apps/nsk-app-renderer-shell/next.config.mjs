/**
 * @apparatus RendererShellConfiguration
 * @role Configuración del motor Next.js para el proyector universal.
 * @location apps/razwrite-renderer-shell/next.config.mjs
 * @status <STABILIZED>
 * @version 2.0.0
 * @protocol OEDP-V8.2 Zenith
 */

import { withNx } from '@nx/next';
import { composePlugins } from '@nx/next';

/**
 * @type {import('@nx/next/plugins/with-nx').WithNxOptions}
 **/
const rendererShellConfiguration = {
  // Configuración de soberanía del proyector
  nx: {
    // Activación de capacidades de optimización para el shell
  },
  // Aseguramos que el servidor Standalone sea generado para la Fortaleza Hugging Face
  output: 'standalone',
  reactStrictMode: true,
};

const configurationPlugins = [
  // Inyección de plugins de Nx para el ecosistema RazWrite Core
  withNx,
];

export default composePlugins(...configurationPlugins)(rendererShellConfiguration);