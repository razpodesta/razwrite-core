/**
 * @apparatus BehavioralRefineryComponent
 * @role Punto de ignición silencioso en la interfaz.
 * @location libs/modular-units/behavioral-events/src/lib/behavioral-refinery/behavioral-refinery.tsx
 */

'use client';

import { useEffect } from 'react';
import { BehavioralRefineryLogic } from './behavioral-refinery.logic';

export function BehavioralRefinery() {
  useEffect(() => {
    BehavioralRefineryLogic.igniteRefinery();
  }, []);

  // Sensor invisible (M-021)
  return null;
}
