/**
 * @apparatus ErrorRefineryWorker
 * @role Motor de sanitización profunda (Scrubbing) y evasión de fugas PII (ISO 27701).
 * @location libs/shared-fundamentals/error-engine/src/lib/error-refinery.worker.ts
 * @status <SEALED_PRODUCTION>
 * @version 8.5.0
 * @hilo Deep-Pulse
 */

const PII_SCRUBBING_MATRIX = [
  { pattern: /([a-zA-Z0-9_-]+\.[a-zA-Z0-9_-]+\.[a-zA-Z0-9_-]+)/g, replacement: '[REDACTED_JWT]' },
  { pattern: /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g, replacement: '[REDACTED_EMAIL]' },
  { pattern: /(?:\d[ -]*?){13,16}/g, replacement: '[REDACTED_CREDIT_CARD]' },
  { pattern: /\b(?:\d{1,3}\.){3}\d{1,3}\b/g, replacement: '[REDACTED_IP_ADDRESS]' },
];

/**
 * @function executeForensicScrubbing
 * @description Transmuta el rastro crudo eliminando datos sensibles y rutas de sistema local.
 */
export function executeForensicScrubbing(rawStackTrace: string): string {
  let sanitizedTrace = rawStackTrace;

  // 1. Purga de Identidad e Información Sensible (PII)
  for (const scrubber of PII_SCRUBBING_MATRIX) {
    sanitizedTrace = sanitizedTrace.replace(scrubber.pattern, scrubber.replacement);
  }

  // 2. Ofuscación de Topología de Servidor (Security by Obscurity)
  return sanitizedTrace
    .split('\n')
    .slice(0, 10) // Retiene solo los últimos 10 saltos de memoria
    .map(line => line.trim())
    .join(' | ')
    .replace(/\\/g, '/')
    .replace(/.*\/libs\//g, 'libs/')
    .replace(/.*\/apps\//g, 'apps/');
}