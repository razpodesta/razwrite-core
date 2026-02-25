/**
 * @apparatus TailwindLatticeConfig
 * @role Configuración de purga y diseño para el ecosistema RazWrite.
 * @location apps/razwrite-renderer-shell/tailwind.config.js
 * @status <SEALED_PRODUCTION>
 */

const { createGlobPatternsForDependencies } = require('@nx/next/tailwind');
const { join } = require('path');

/** 
 * @context_prompt [LIA Legacy - AI-Audit]
 * DIRECTIVA: Expansión de Rastro de Estilos.
 * JUSTIFICACIÓN: El Shell debe detectar clases de Tailwind dentro de CUALQUIER búnker 
 * de la celosía (`libs/`) para que la proyección dinámica no pierda estilos.
 * IMPACTO: Estilos atómicos garantizados en toda la arquitectura Lego-Matrix.
 */

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    join(__dirname, '{src,pages,components,app}/**/!(*.spec|*.test).{ts,tsx,html}'),
    ...createGlobPatternsForDependencies(__dirname),
    // Escaneo explícito de búnkeres de lógica y UI
    join(__dirname, '../../libs/**/*.{ts,tsx,html}'),
  ],
  theme: {
    extend: {
      colors: {
        // Vinculación con los VisualTokens del Manifiesto de Inquilino
        brand: 'var(--primary-brand)',
        gold: '#D4AF37', // Color de autoridad Zenith
      },
    },
  },
  plugins: [],
};