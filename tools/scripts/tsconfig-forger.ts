/**
 * @apparatus ConcentricTsConfigForger
 * @role Script de mantenimiento para el saneamiento masivo de codificación y estandarización de tipos.
 * @location tools/scripts/tsconfig-forger.ts
 * @status <SEALED_PRODUCTION>
 * @version 1.1.0
 * @protocol OEDP-V8.5 Lattice
 * @description Erradica caracteres inválidos (BOM) y unifica la celosía de tipos.
 */

/// <reference types="node" />

import { writeFileSync, readdirSync, lstatSync } from 'node:fs';
import { join, relative, sep } from 'node:path';

const PROJECT_ROOT_PATH: string = process.cwd();
const LIBRARIES_DIRECTORY_PATH: string = join(PROJECT_ROOT_PATH, 'libs');

/**
 * @section PLANTILLAS SOBERANAS
 */

const generateTsConfigTemplate = (relativePathToRoot: string) => ({
  extends: `${relativePathToRoot}/tsconfig.base.json`,
  compilerOptions: {
    module: "esnext",
    moduleResolution: "bundler",
    forceConsistentCasingInFileNames: true,
    strict: true,
    noPropertyAccessFromIndexSignature: true,
    esModuleInterop: true,
    allowSyntheticDefaultImports: true
  },
  files: [],
  include: [],
  references: [{ path: "./tsconfig.lib.json" }]
});

const generateTsConfigLibTemplate = () => ({
  extends: "./tsconfig.json",
  compilerOptions: {
    outDir: "../../../dist/out-tsc",
    declaration: true,
    types: ["node"]
  },
  include: ["src/**/*.ts", "src/**/*.json"],
  exclude: ["src/**/*.spec.ts", "src/**/*.test.ts", "jest.config.ts"]
});

/**
 * @section LÓGICA DE EJECUCIÓN SOBERANA
 */

function executeSovereignPurification(): void {
  console.warn('\n[IGNITION] Iniciando Saneamiento Atómico de TsConfigs...');

  const layers: string[] = readdirSync(LIBRARIES_DIRECTORY_PATH).filter((fileIdentifier: string) =>
    lstatSync(join(LIBRARIES_DIRECTORY_PATH, fileIdentifier)).isDirectory()
  );

  layers.forEach((layerIdentifier: string) => {
    const layerPath: string = join(LIBRARIES_DIRECTORY_PATH, layerIdentifier);
    const bunkers: string[] = readdirSync(layerPath).filter((fileIdentifier: string) =>
      lstatSync(join(layerPath, fileIdentifier)).isDirectory()
    );

    bunkers.forEach((bunkerIdentifier: string) => {
      const bunkerPath: string = join(layerPath, bunkerIdentifier);
      const relativeFromRoot: string = relative(bunkerPath, PROJECT_ROOT_PATH).replace(/\\/g, '/');

      // 1. Forja de tsconfig.json
      const tsConfigInformationPayload = generateTsConfigTemplate(relativeFromRoot);
      writeFileSync(
        join(bunkerPath, 'tsconfig.json'),
        JSON.stringify(tsConfigInformationPayload, null, 2),
        { encoding: 'utf8' }
      );

      // 2. Forja de tsconfig.lib.json con cálculo de profundidad dinámica
      const tsConfigLibInformationPayload = generateTsConfigLibTemplate();
      const pathSegments: string[] = bunkerPath.replace(PROJECT_ROOT_PATH, '').split(sep).filter(Boolean);
      const depthLevel: number = pathSegments.length;
      const distributionPath: string = Array(depthLevel).fill('..').join('/') + '/dist/out-tsc';

      tsConfigLibInformationPayload.compilerOptions.outDir = distributionPath;

      writeFileSync(
        join(bunkerPath, 'tsconfig.lib.json'),
        JSON.stringify(tsConfigLibInformationPayload, null, 2),
        { encoding: 'utf8' }
      );


      console.warn(`|-> Búnker [${layerIdentifier}/${bunkerIdentifier}] purificado con éxito.`);
    });
  });

  console.warn('[FINISH] Celosía de tipos saneada y sellada en UTF-8.\n');
}

executeSovereignPurification();
