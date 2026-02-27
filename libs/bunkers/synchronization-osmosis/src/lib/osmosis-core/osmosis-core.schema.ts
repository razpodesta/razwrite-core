/**
 * @apparatus SyncOsmosisDNA
 * @role Contratos genéticos para la clasificación, configuración y transporte de materia oscura.
 * @location libs/modular-units/sync-osmosis/src/lib/osmosis-core/osmosis-core.schema.ts
 * @status <SEALED_PRODUCTION>
 * @version 8.6.1
 * @protocol OEDP-V8.5 Lattice
 */

import { z } from 'zod';
import { QualityOfServiceTierSchema } from '@razwritecore/nsk-shared-nervous-system';

/**
 * @context_prompt [LIA Legacy - AI-Audit]
 * DIRECTIVA: Inyección de Contador de Reintentos y Validación de Configuración.
 * JUSTIFICACIÓN: 
 * 1. Se añade `retryAttemptCount` al pulso para habilitar lógica de "Exponential Backoff" en el futuro.
 * 2. Se convierte la interfaz de configuración en un Schema Zod (`OsmosisConfigurationSchema`) 
 *    para garantizar que el motor no sea inicializado con intervalos negativos o tamaños de lote inválidos.
 * IMPACTO: Mayor robustez en condiciones de red inestables y prevención de errores de configuración en tiempo de ejecución.
 */

// Branding Nominal para Identificadores
export const OsmoticPayloadIdSchema = z.string().uuid().brand<'OsmoticPayloadId'>();

/**
 * Contrato de Configuración del Motor (Runtime Validation).
 * Define los límites físicos de la membrana.
 */
export const OsmosisConfigurationSchema = z.object({
  drainIntervalInMilliseconds: z.number().int().min(1000).default(5000)
    .describe('Frecuencia del latido de vaciado (mínimo 1s).'),
  
  maxBackpressureLimit: z.number().int().min(10).default(500)
    .describe('Límite de elementos por cola antes de aplicar Drop-Tail.'),
  
  enableForensicLogging: z.boolean().default(true)
    .describe('Activa la emisión de logs de ignición y drenaje.'),
}).readonly();

export type IOsmosisConfiguration = z.infer<typeof OsmosisConfigurationSchema>;

/**
 * Contrato del Pulso Osmótico (Unidad de Transporte).
 */
export const OsmoticPulseSchema = z.object({
  pulseIdentifier: OsmoticPayloadIdSchema,
  
  qualityOfServiceTier: QualityOfServiceTierSchema,
  
  targetVaultEndpoint: z.string().url()
    .describe('Destino absoluto en la Bóveda Cloud (Server).'),
  
  opaquePayload: z.unknown()
    .describe('Datos encriptados (JWE), Blobs binarios o JSON serializable.'),
  
  creationTimestampUnix: z.number().int().nonnegative(),
  
  retryAttemptCount: z.number().int().nonnegative().default(0)
    .describe('Contador de fallos de entrega para gestión de reintentos.'),
}).readonly();

export type IOsmoticPulse = z.infer<typeof OsmoticPulseSchema>;