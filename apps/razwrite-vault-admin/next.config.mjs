/**
 * @apparatus VaultAdminConfiguration
 * @role Configuración del motor Next.js para la administración de la bóveda (Acid-Pulse).
 * @location apps/razwrite-vault-admin/next.config.mjs
 * @status <STABILIZED>
 * @version 2.0.0
 * @protocol OEDP-V8.2 Zenith
 */

import { withNx } from '@nx/next';
import { composePlugins } from '@nx/next';

/**
 * @type {import('@nx/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  // Configuración de soberanía de la bóveda
  nx: {
    // Capacidades específicas para el panel administrativo
  },
  reactStrictMode: true,
};

const plugins = [
  // Inyección de plugins de Nx para el ecosistema RazWrite Core
  withNx,
];

export default composePlugins(...plugins)(nextConfig);
