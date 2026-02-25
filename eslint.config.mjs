/**
 * @apparatus SovereignAduanaConfig
 * @role Constitución de Calidad, Control de Fronteras y Guardián de la Soberanía Semántica.
 * @location /eslint.config.mjs
 * @status <SEALED_PRODUCTION>
 * @version 8.6.0
 * @protocol OEDP-V8.5 Lattice
 * @iso 25010 (Mantenibilidad y Calidad Estática)
 */

import nx from '@nx/eslint-plugin';
import js from '@eslint/js';

export default[
  // 1. FUNDAMENTO: Configuraciones Recomendadas
  js.configs.recommended,

  // 2. ADN NX: Reglas de Monorepo
  ...nx.configs['flat/base'],
  ...nx.configs['flat/typescript'],
  ...nx.configs['flat/javascript'],

  // 3. DIMENSIÓN DE EXCLUSIÓN Y OPTIMIZACIÓN DE RECURSOS
  {
    ignores:[
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
      '@typescript-eslint/no-unused-vars':[
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],

      // --- SOBERANÍA SEMÁNTICA (M-004 y M-030) ---
      'no-restricted-syntax': [
        'error',
        { selector: "Identifier[name='req']", message: "🚫 PROHIBIDO (M-004): Usar 'requestPayload'." },
        { selector: "Identifier[name='res']", message: "🚫 PROHIBIDO (M-004): Usar 'responseSnapshot'." },
        { selector: "Identifier[name='err']", message: "🚫 PROHIBIDO (M-004): Usar 'caughtError'." },
        { selector: "Identifier[name='ctx']", message: "🚫 PROHIBIDO (M-004): Usar 'contextExecutionContext'." },
        { selector: "Identifier[name='props']", message: "🚫 PROHIBIDO (M-004): Usar 'componentProperties'." },
        { selector: "Identifier[name='id']", message: "🚫 PROHIBIDO (M-004): Usar 'identifier' o sufijo específico." },
        { selector: "Identifier[name='idx']", message: "🚫 PROHIBIDO (M-004): Usar 'indexPosition'." },
        { selector: "Identifier[name='data']", message: "🚫 PROHIBIDO (M-004): Usar 'informationPayload'." },
        { selector: "Identifier[name='params']", message: "🚫 PROHIBIDO (M-004): Usar 'parameterCollection'." },
        { selector: "Identifier[name='val']", message: "🚫 PROHIBIDO (M-004): Usar 'calculatedValue'." },
        { selector: "Identifier[name='msg']", message: "🚫 PROHIBIDO (M-004): Usar 'semanticMessage'." },
        { selector: "Identifier[name='btn']", message: "🚫 PROHIBIDO (M-004): Usar 'buttonElement'." },
        { selector: "Identifier[name='nav']", message: "🚫 PROHIBIDO (M-004): Usar 'navigationContainer'." },
        { selector: "Identifier[name='sns']", message: "🚫 PROHIBIDO (M-004): Usar 'sovereignNervousSystem'." },
        { selector: "Identifier[name='auth']", message: "🚫 PROHIBIDO (M-004): Usar 'authenticationProtocol'." },
        { selector: "Identifier[name='pld']", message: "🚫 PROHIBIDO (M-004): Usar 'informationPayload' o 'payload'." },
      ],

      // --- OBSERVABILIDAD FORENSE (M-001) ---
      // Bloqueo de consolas nativas a favor del SovereignLogger
      'no-console':['error', { allow: ['warn', 'error'] }],

      // --- ARQUITECTURA LATTICE: FRONTERAS DE SOBERANÍA (M-032) ---
      '@nx/enforce-module-boundaries':[
        'error',
        {
          enforceBuildableLibDependency: true,
          allow: [],
          depConstraints:[
            {
              // CAPA 0: FUNDAMENTALS (SHARED)
              // Núcleos base del sistema. Silencio absoluto de dependencias ascendentes.
              sourceTag: 'layer:fundamentals',
              onlyDependOnLibsWithTags: ['layer:fundamentals'],
            },
            {
              // CAPA 1: EXTRACTION REFINERIES (HARDWARE)
              // Extraen del metal, dependen de los fundamentales para cifrar/loguear.
              sourceTag: 'layer:extraction-refinery',
              onlyDependOnLibsWithTags: ['layer:fundamentals'],
            },
            {
              // CAPA 2: MODULAR UNITS (BUNKERS)
              // La inteligencia asíncrona.
              // NO pueden depender de otras unidades modulares (Silencio Horizontal).
              sourceTag: 'layer:modular-unit',
              onlyDependOnLibsWithTags:[
                'layer:fundamentals',
                'layer:extraction-refinery'
              ],
            },
            {
              // CAPA 3: INFRASTRUCTURE ADAPTERS (INTEGRATIONS)
              // Puentes externos y diplomacia.
              sourceTag: 'layer:adapter',
              onlyDependOnLibsWithTags:[
                'layer:fundamentals',
                'layer:modular-unit'
              ],
            },
            {
              // CAPA 4: APPLICATION SHELL
              // Ensambladores finales y puntos de entrada visual. Consumen todo.
              sourceTag: 'layer:application-shell',
              onlyDependOnLibsWithTags:[
                'layer:fundamentals',
                'layer:extraction-refinery',
                'layer:modular-unit',
                'layer:adapter',
                'type:util'
              ],
            },
            {
              // HERRAMIENTAS Y UTILIDADES INTERNAS
              sourceTag: 'type:util',
              onlyDependOnLibsWithTags:['layer:fundamentals', 'type:util'],
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
      '@nx/dependency-checks':[
        'error',
        { ignoredFiles: ['{projectRoot}/eslint.config.{js,cjs,mjs,ts,cts,mts}'] },
      ],
    },
  },
];
