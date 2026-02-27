/**
 * @apparatus SovereignErrorWorker
 * @role Motor de sanitización profunda (Scrubbing) y neutralización de fugas de identidad.
 * @location libs/shared/error-engine/src/lib/error-refinery/error-refinery.worker.ts
 * @status <SEALED_PRODUCTION>
 * @version 9.3.0
 * @protocol OEDP-V8.5 Lattice
 * @hilo Deep-Pulse
 * @metabolism PEAK
 * @structure CEREBRO
 * @compliance PII_SENSITIVE | ISO_27701
 */

/**
 * @section MATRIZ DE PURGA PII (M-004)
 * Reglas de inmutabilidad para la neutralización de datos sensibles en el rastro forense.
 */
const PII_SANITIZATION_RULES = [
  { pattern: /([a-zA-Z0-9_-]+\.[a-zA-Z0-9_-]+\.[a-zA-Z0-9_-]+)/g, token: '[REDACTED_JWT]' },
  { pattern: /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g, token: '[REDACTED_EMAIL]' },
  { pattern: /(?:\d[ -]*?){13,16}/g, token: '[REDACTED_CC]' },
  { pattern: /\b(?:\d{1,3}\.){3}\d{1,3}\b/g, token: '[REDACTED_IP]' },
  { pattern: /Bearer\s+[a-zA-Z0-9._~+/-]+=*/gi, token: 'Bearer [REDACTED_AUTH]' }
] as const;

/**
 * @function executeForensicScrubbing
 * @description Purifica el rastro de error eliminando rutas físicas y datos de usuario.
 */
export function executeForensicScrubbing(rawTrace: string): string {
  let sanitizedTrace = rawTrace;

  // 1. Scrubbing de Patrones PII
  for (const rule of PII_SANITIZATION_RULES) {
    sanitizedTrace = sanitizedTrace.replace(rule.pattern, rule.token);
  }

  // 2. Ofuscación de Topología y Reducción de Masa Atómica
  return sanitizedTrace
    .split('\n')
    .slice(0, 10) // Limitación de profundidad para optimización de bus
    .map((line) => line.trim())
    .join(' | ')
    .replace(/\\/g, '/')
    .replace(/.*\/libs\//g, 'libs/')
    .replace(/.*\/apps\//g, 'apps/')
    .replace(/\(.*\)/g, '(REDACTED_CONTEXT)');
}
