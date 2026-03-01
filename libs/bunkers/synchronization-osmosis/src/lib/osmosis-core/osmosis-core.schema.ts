/**
 * @apparatus OsmosisCoreDNA
 * @role Contratos genéticos para la clasificación, configuración y transporte de Materia Oscura.
 * @location libs/bunkers/synchronization-osmosis/src/lib/osmosis-core/osmosis-core.schema.ts
 * @status <SEALED_PRODUCTION>
 * @version 9.5.0
 * @protocol OEDP-V8.5 Lattice
 * @structure ADN
 * @compliance ISO_25010 | ISO_27001
 */

import { z } from 'zod';
import { QualityOfServiceTierSchema } from '@razwritecore/nsk-shared-nervous-system';

/**
 * @section DIMENSIONES NOMINALES (M-005)
 * Identificador único universal para el seguimiento del pulso en la red.
 */
export const OsmoticPulseIdentifierSchema = z.string().uuid().brand<'OsmoticPulseIdentifier'>();
export type IOsmoticPulseIdentifier = z.infer<typeof OsmoticPulseIdentifierSchema>;

/**
 * @section CONFIGURACIÓN DE LA MEMBRANA
 * Define los límites físicos de presión y drenaje del sistema (ISO 25010).
 */
export const OsmosisConfigurationSchema = z.object({
  drainIntervalInMilliseconds: z.number().int().min(1000).default(5000)
    .describe('Frecuencia del latido de vaciado hacia la nube.'),

  maxBackpressureLimit: z.number().int().min(10).default(500)
    .describe('Límite de saturación de la cola antes de la purga defensiva.'),

  enableForensicLogging: z.boolean().default(true)
    .describe('Activa el rastro forense en el SovereignLogger.'),
}).readonly();

export type IOsmosisConfiguration = z.infer<typeof OsmosisConfigurationSchema>;

/**
 * @section CARGAMENTO DEL PULSO (M-010)
 * Unidad de transporte soberana que cruza la membrana hacia la Bóveda Cloud.
 */
export const OsmoticPulseSchema = z.object({
  pulseIdentifier: OsmoticPulseIdentifierSchema,

  qualityOfServiceTier: QualityOfServiceTierSchema,

  targetVaultPath: z.string().min(1).startsWith('/')
    .describe('Ruta relativa soberana en la infraestructura de destino.'),

  opaquePayload: z.unknown()
    .describe('Cargamento cifrado (Materia Oscura) o binario normalizado.'),

  creationTimestampInMilliseconds: z.number().int().nonnegative()
    .describe('Marca de tiempo absoluta de la ignición del pulso.'),

  metabolicModeAtCreation: z.enum(['PEAK', 'ECO', 'EMERGENCY', 'HIBERNATE'])
    .describe('Estado energético del sistema al momento de generar el pulso.'),

  retryAttemptCount: z.number().int().nonnegative().default(0)
    .describe('Contador de fallos para lógica de reintentos exponenciales.'),
}).readonly();

export type IOsmoticPulse = z.infer<typeof OsmoticPulseSchema>;

/**
 * @context_prompt [LIA Legacy - AI-Audit]
 * DIRECTIVA: Nivelación de ADN para la Omnisciencia Telemétrica.
 * JUSTIFICACIÓN: Se unifica la nomenclatura con 'shared-crypto' y 'behavioral-refinery'.
 * Se inyecta 'metabolicModeAtCreation' para habilitar auditorías de fidelidad de datos.
 * IMPACTO: Eliminación de ambigüedades cronológicas y blindaje del contrato de transporte.
 */
