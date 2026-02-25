/**
 * @apparatus RendererShellEslint
 * @role Configuración de policía de código para el Shell.
 * @location apps/razwrite-renderer-shell/eslint.config.mjs
 * @status <SEALED_PRODUCTION>
 */

import nextEslintPluginNext from '@next/eslint-plugin-next';
import nx from '@nx/eslint-plugin';
import baseConfig from '../../eslint.config.mjs';

export default [
  { plugins: { '@next/next': nextEslintPluginNext } },
  ...baseConfig,
  ...nx.configs['flat/react-typescript'],
  {
    ignores: ['.next/**/*'],
  },
  {
    files: ['package.json'],
    rules: {
      '@nx/dependency-checks': [
        'error',
        {
          // Ignoramos falsos positivos de paquetes que Next.js usa internamente 
          // pero que Nx no siempre detecta en el escaneo de la carpeta /app
          ignoredDependencies: [
            'next', 
            'react', 
            'react-dom', 
            'framer-motion', 
            'clsx', 
            'tailwind-merge', 
            'tslib'
          ],
        },
      ],
    },
  },
];