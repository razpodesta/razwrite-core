/**
 * @apparatus BehavioralRefineryDNA
 * @role Contratos genéticos para la captura de micro-gestos y estados psicológicos.
 * @location libs/modular-units/behavioral-events/src/lib/behavioral-refinery/behavioral-refinery.schema.ts
 * @status <STABILIZED>
 * @version 1.0.0
 * @protocol OEDP-V8.5 Lattice
 */

import { z } from 'zod';

export const InteractionOpCodeSchema = z.number().int().brand<'InteractionOpCode'>();
export type IInteractionOpCode = z.infer<typeof InteractionOpCodeSchema>;

export const PsychologicalStateSchema = z.enum(['URGENCY', 'HESITATION', 'IDLE', 'ENGAGED', 'FRUSTRATED']);
export type IPsychologicalState = z.infer<typeof PsychologicalStateSchema>;

export const RawInteractionPointSchema = z.object({
  coordinateX: z.number(),
  coordinateY: z.number(),
  timestampUnix: z.number(),
}).readonly();

export type IRawInteractionPoint = z.infer<typeof RawInteractionPointSchema>;

export const RefinedBehavioralPulseSchema = z.object({
  interactionOpCode: InteractionOpCodeSchema,
  intentionScore: z.number().min(0).max(1),
  psychologicalState: PsychologicalStateSchema,
  interactionMetadata: z.record(z.string(), z.unknown()),
}).readonly();

export type IRefinedBehavioralPulse = z.infer<typeof RefinedBehavioralPulseSchema>;
