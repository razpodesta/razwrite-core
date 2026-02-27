/**
 * @apparatus SovereignAduanaConfig
 * @role Constitución de Calidad, Control de Fronteras y Guardián de la Soberanía Semántica.
 * @location /eslint.config.mjs
 * @status <SEALED_PRODUCTION>
 * @version 8.12.0
 * @protocol OEDP-V8.5 Lattice
 * @iso 25010 (Mantenibilidad), ISO 27001 (Seguridad)
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

  // 3. DIMENSIÓN DE EXCLUSIÓN Y OPTIMIZACIÓN DE RECURSOS
  {
    ignores: [
      '**/dist/**',
      '**/out-tsc/**',
      '**/.next/**',
      '**/.swc/**',
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

      // --- SOBERANÍA SEMÁNTICA E IDENTIDAD ABSOLUTA (M-004, M-030 & Adéndum C) ---
      'no-restricted-syntax': [
        'error',
        // Prohibiciones de Flujo (Legacy shorthands)
        { selector: "Identifier[name='req']", message: "🚫 PROHIBIDO (M-004): Usar 'requestPayload'." },
        { selector: "Identifier[name='res']", message: "🚫 PROHIBIDO (M-004): Usar 'responseSnapshot'." },
        { selector: "Identifier[name='err']", message: "🚫 PROHIBIDO (M-004): Usar 'caughtError'." },
        { selector: "Identifier[name='ctx']", message: "🚫 PROHIBIDO (M-004): Usar 'contextExecutionContext'." },
        { selector: "Identifier[name='props']", message: "🚫 PROHIBIDO (M-004): Usar 'componentProperties'." },
        { selector: "Identifier[name='data']", message: "🚫 PROHIBIDO (M-004): Usar 'informationPayload'." },
        { selector: "Identifier[name='params']", message: "🚫 PROHIBIDO (M-004): Usar 'parameterCollection'." },
        { selector: "Identifier[name='val']", message: "🚫 PROHIBIDO (M-004): Usar 'calculatedValue'." },
        { selector: "Identifier[name='msg']", message: "🚫 PROHIBIDO (M-004): Usar 'semanticMessage'." },

        // Prohibiciones de Dominio (Adéndum C - Sinécdoque Técnica)
        { selector: "Identifier[name='id']", message: "🚫 PROHIBIDO (M-004): Usar 'identifier' o sufijo descriptivo (ej: mutantIdentifier)." },
        { selector: "Identifier[name='idx']", message: "🚫 PROHIBIDO (M-004): Usar 'indexPosition'." },
        { selector: "Identifier[name='geo']", message: "🚫 PROHIBIDO (V8.11): Usar 'geographic' (Prohibición de Sinécdoque)." },
        { selector: "Identifier[name='bio']", message: "🚫 PROHIBIDO (V8.11): Usar 'biometric' (Prohibición de Sinécdoque)." },
        { selector: "Identifier[name='sync']", message: "🚫 PROHIBIDO (V8.11): Usar 'synchronization' (Prohibición de Sinécdoque)." },
        { selector: "Identifier[name='auth']", message: "🚫 PROHIBIDO (V8.11): Usar 'authenticationProtocol'." },
        { selector: "Identifier[name='pld']", message: "🚫 PROHIBIDO (V8.11): Usar 'payload' o 'informationPayload'." },

        // Prohibiciones de Interfaz
        { selector: "Identifier[name='btn']", message: "🚫 PROHIBIDO (M-004): Usar 'buttonElement'." },
        { selector: "Identifier[name='nav']", message: "🚫 PROHIBIDO (M-004): Usar 'navigationContainer'." },
        { selector: "Identifier[name='sns']", message: "🚫 PROHIBIDO (M-004): Usar 'sovereignNervousSystem'." },
      ],

      // --- OBSERVABILIDAD FORENSE (M-001) ---
      'no-console': ['error', { allow: ['warn', 'error'] }],

      // --- ARQUITECTURA LATTICE: FRONTERAS DE SOBERANÍA (M-032 & M-006) ---
      '@nx/enforce-module-boundaries': [
        'error',
        {
          enforceBuildableLibDependency: true,
          allow: [],
          depConstraints: [
            {
              // CAPA 0: SHARED (Fundamentals)
              sourceTag: 'layer:fundamentals',
              onlyDependOnLibsWithTags: ['layer:fundamentals'],
            },
            {
              // CAPA 1: HARDWARE (Extraction Refineries)
              sourceTag: 'layer:extraction-refinery',
              onlyDependOnLibsWithTags: ['layer:fundamentals'],
            },
            {
              // CAPA 2: MODULAR UNITS (Bunkers)
              // Importante: No se permite dependencia horizontal entre búnkeres (Silencio Horizontal)
              sourceTag: 'layer:modular-unit',
              onlyDependOnLibsWithTags: [
                'layer:fundamentals',
                'layer:extraction-refinery',
              ],
            },
            {
              // CAPA 3: INTEGRATIONS (Infrastructure Adapters)
              sourceTag: 'layer:adapter',
              onlyDependOnLibsWithTags: [
                'layer:fundamentals',
                'layer:modular-unit',
              ],
            },
            {
              // CAPA 4: APPLICATION SHELL (Superficie)
              sourceTag: 'layer:application-shell',
              onlyDependOnLibsWithTags: [
                'layer:fundamentals',
                'layer:extraction-refinery',
                'layer:modular-unit',
                'layer:adapter',
                'type:util',
              ],
            },
            {
              // UTILIDADES Y HERRAMIENTAS
              sourceTag: 'type:util',
              onlyDependOnLibsWithTags: ['layer:fundamentals', 'type:util'],
            },
          ],
        },
      ],
    },
  },

  // 5. CONFIGURACIÓN E INTEGRIDAD DE METADATOS JSON (M-011)
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
