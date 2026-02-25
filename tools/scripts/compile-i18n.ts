/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus ConcentricI18nCompiler
 * @version 8.0.0
 * @protocol OEDP-V8.0 - Zenith Assembly
 * @description Compila fragmentos de i18n dos búnqueres em dicionários consolidados.
 */

import {
  readFileSync,
  writeFileSync,
  readdirSync,
  existsSync,
  mkdirSync,
} from 'node:fs';
import { join, resolve } from 'node:path';

const ROOT = resolve(process.cwd());
const LOCALES = ['en-US', 'pt-BR', 'es-ES'];
const TARGET_APP = join(ROOT, 'apps/web-portal/public/locales');

function compile() {
  console.log(
    '\n[SINCRO SEMÂNTICA] Iniciando montagem dos dicionários Zenith...',
  );

  LOCALES.forEach((locale) => {
    const consolidated = {};

    // Varredura em libs e apps
    const searchPaths = [join(ROOT, 'libs'), join(ROOT, 'apps')];

    searchPaths.forEach((basePath) => {
      if (!existsSync(basePath)) return;

      const findBunkers = (dir: string) => {
        const entries = readdirSync(dir, { withFileTypes: true });

        for (const entry of entries) {
          const res = join(dir, entry.name);
          if (entry.isDirectory()) {
            if (entry.name === 'i18n') {
              const localePath = join(res, locale);
              if (existsSync(localePath)) {
                const files = readdirSync(localePath);
                files.forEach((file) => {
                  if (file.endsWith('.json')) {
                    const content = JSON.parse(
                      readFileSync(join(localePath, file), 'utf-8'),
                    );
                    Object.assign(consolidated, content);
                  }
                });
              }
            } else {
              findBunkers(res);
            }
          }
        }
      };
      findBunkers(basePath);
    });

    // Selagem do Dicionário
    const outputPath = join(TARGET_APP, locale);
    if (!existsSync(outputPath)) mkdirSync(outputPath, { recursive: true });

    writeFileSync(
      join(outputPath, 'dictionary.json'),
      JSON.stringify(consolidated, null, 2),
    );

    console.log(`|-> Alma [${locale}] selada com sucesso.`);
  });

  console.log('[FINISH] Dicionários prontos para o rastro de borda.\n');
}

compile();
