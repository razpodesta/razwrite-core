/**
 * @apparatus SilentWhispererDNA
 * @role Especificación genética para la orquestación de hilos de trasfondo y sincronización diferida.
 * @location libs/shared/nervous-system/src/lib/silent-whisperer/silent-whisperer.schema.ts
 * @status <STABILIZED>
 * @version 9.0.0
 * @protocol OEDP-V8.5 Lattice
 * @structure ADN
 */

import { z } from 'zod';

/**
 * @section DIMENSIONES NOMINALES (M-005)
 */
export const ServiceWorkerScopeSchema = z.string().startsWith('/').brand<'ServiceWorkerScope'>();
export const BackgroundSyncTagSchema = z.string().min(4).regex(/^[a-z_]+$/).brand<'BackgroundSyncTag'>();

/**
 * @section CARGAMENTO DE IGNICIÓN
 */
export const WorkerRegistrationInputSchema = z.object({
  scriptUrl: z.string().min(5),
  scope: ServiceWorkerScopeSchema.default('/' as any),
  enableBackgroundSync: z.boolean().default(true),
}).readonly();

/**
 * @section INFERENCIAS SOBERANAS
 */
export type IServiceWorkerScope = z.infer<typeof ServiceWorkerScopeSchema>;
export type IBackgroundSyncTag = z.infer<typeof BackgroundSyncTagSchema>;
export type IWorkerRegistrationInput = z.infer<typeof WorkerRegistrationInputSchema>;

/**
 * @interface IWorkerStatusSnapshot
 * @description Estado actual del hilo de trasfondo para el Neural Sentinel.
 */
export interface IWorkerStatusSnapshot {
  readonly registrationActive: boolean;
  readonly backgroundSyncSupported: boolean;
  readonly activeTagCollection: string[];
}
