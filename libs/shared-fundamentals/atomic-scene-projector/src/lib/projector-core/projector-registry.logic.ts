/**
 * @apparatus BunkerRegistry
 * @role Catálogo de búnkeres disponibles para el proyector.
 * @location libs/shared-fundamentals/atomic-scene-projector/src/lib/projector-core/projector-registry.logic.ts
 * @status <FORGING_LOGIC>
 */

import React from 'react';
import { type IBunkerIdentifier } from './projector-core.schema';

/**
 * @context_prompt [LIA Legacy - AI-Audit]
 * DIRECTIVA: Registro dinámico de búnkeres.
 * JUSTIFICACIÓN: Evita el acoplamiento circular. El proyector no importa los búnkeres; 
 * el registro provee las referencias.
 * IMPACTO: Mantenibilidad total. Agregar un búnker nuevo no requiere tocar el ProjectorCore.
 */

// Diccionario de referencias (Inyectado durante la ignición de la App)
const internalRegistry = new Map<string, React.ComponentType<any>>();

export const BunkerRegistry = {
  
  /**
   * @method register
   * @description Registra un componente visual en la malha del proyector.
   */
  register: (identifier: IBunkerIdentifier, component: React.ComponentType<any>): void => {
    internalRegistry.set(identifier as unknown as string, component);
  },

  /**
   * @method resolve
   * @description Devuelve la referencia del componente para su proyección.
   */
  resolve: (identifier: IBunkerIdentifier): React.ComponentType<any> | undefined => {
    return internalRegistry.get(identifier as unknown as string);
  }
};