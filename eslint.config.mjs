/**
 * @apparatus SovereignAduanaConfig
 * @role Constitución de Calidad y Guardian de la Soberanía Semántica.
 * @location /eslint.config.mjs
 * @status <SEALED_PRODUCTION>
 * @version 8.5.0
 * @protocol OEDP-V8.5 Zenith
 */

import nx from '@nx/eslint-plugin';
import js from '@eslint/js';

export default [
  // 1. FUNDAMENTO: Configuraciones Recomendadas
  js.configs.recommended,

  // 2. ADN NX: Reglas de Monorepo
  ...nx.configs['flat/base'],
  ...nx.configs['flat/typescript'],
  ...nx.configs['flat/javascript'],

  // 3. DIMENSIÓN DE EXCLUSIÓN
  {
    ignores: [
      '**/dist/**',
      '**/out-tsc/**',
      '**/.next/**',
      '**/node_modules/**',
      '**/coverage/**',
      '**/.nx/**',
      '**/public/**',
      'pnpm-lock.yaml',
    ],
  },

  // 4. LEY MAESTRA PARA LÓGICA (TypeScript/React)
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    languageOptions: {
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    rules: {
      // --- SOBERANÍA DE TIPADO (M-005) ---
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],

      // --- SOBERANÍA SEMÁNTICA (M-004) ---
      'no-restricted-syntax': [
        'error',
        { selector: "Identifier[name='req']", message: "🚫 PROHIBIDO: Usar 'requestPayload'." },
        { selector: "Identifier[name='res']", message: "🚫 PROHIBIDO: Usar 'responseSnapshot'." },
        { selector: "Identifier[name='err']", message: "🚫 PROHIBIDO: Usar 'caughtError'." },
        { selector: "Identifier[name='ctx']", message: "🚫 PROHIBIDO: Usar 'contextExecutionContext'." },
        { selector: "Identifier[name='props']", message: "🚫 PROHIBIDO: Usar 'componentProperties'." },
      ],

      // --- OBSERVABILIDAD (M-001) ---
      'no-console': ['error', { allow: ['warn', 'error'] }],

      // --- ARQUITECTURA LATTICE: FRONTERAS DE SOBERANÍA (M-032) ---
      '@nx/enforce-module-boundaries': [
        'error',
        {
          enforceBuildableLibDependency: true,
          allow: [],
          depConstraints: [
            {
              // CAPA 0: FUNDAMENTALS (SHARED)
              // Solo pueden depender de sí mismos (Lógica pura).
              sourceTag: 'layer:fundamentals',
              onlyDependOnLibsWithTags: ['layer:fundamentals'],
            },
            {
              // CAPA 1: HARDWARE REFINERIES
              // Extraen del metal, dependen de los fundamentales para cifrar/loguear.
              sourceTag: 'layer:extraction-refinery',
              onlyDependOnLibsWithTags: ['layer:fundamentals'],
            },
            {
              // CAPA 2: MODULAR UNITS (BUNKERS)
              // La inteligencia. Dependen de Hardware y Fundamentales.
              // NO pueden depender de otros Bunkers (Horizontalidad prohibida).
              sourceTag: 'layer:modular-unit',
              onlyDependOnLibsWithTags: ['layer:fundamentals', 'layer:extraction-refinery'],
            },
            {
              // CAPA 3: INFRASTRUCTURE ADAPTERS (INTEGRATIONS)
              // Puentes externos. Consumen Bunkers y Fundamentales.
              sourceTag: 'layer:adapter',
              onlyDependOnLibsWithTags: ['layer:fundamentals', 'layer:modular-unit'],
            },
            {
              // CAPA 4: APPLICATION SHELL
              // El ensamblador final. Puede consumir todo.
              sourceTag: 'type:app', 
              onlyDependOnLibsWithTags: [
                'layer:fundamentals',
                'layer:extraction-refinery',
                'layer:modular-unit',
                'layer:adapter',
                'type:util'
              ],
            },
            {
              // HERRAMIENTAS Y UTILIDADES
              sourceTag: 'type:util',
              onlyDependOnLibsWithTags: ['layer:fundamentals', 'type:util'],
            },
          ],
        },
      ],
    },
  },
  
  // 5. CONFIGURACIÓN JSON
  {
    files: ['**/*.json'],
    languageOptions: { parser: await import('jsonc-eslint-parser') },
    rules: {
      '@nx/dependency-checks': [
        'error',
        { ignoredFiles: ['{projectRoot}/eslint.config.{js,cjs,mjs,ts,cts,mts}'] },
      ],
    },
  },
];