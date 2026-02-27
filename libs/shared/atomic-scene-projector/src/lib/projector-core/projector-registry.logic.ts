/**
 * @apparatus ProjectorRegistryLogic
 * @role Catálogo centralizado de Modular Apparatus registrados en la Celosía.
 * @location libs/shared/atomic-scene-projector/src/lib/projector-core/projector-registry.logic.ts
 * @status <SEALED_PRODUCTION>
 * @version 9.3.0
 * @protocol OEDP-V8.5 Lattice
 * @structure NEXO
 */

import { type IApparatusIdentifier, ApparatusIdentifierSchema } from './projector-core.schema';

type ApparatusComponentImplementation = React.ComponentType<any>;

/**
 * @section MEMORIA DE REALIDAD
 * Uso de IApparatusIdentifier como llave única para garantizar integridad nominal.
 */
const globalApparatusRegistry = new Map<IApparatusIdentifier, ApparatusComponentImplementation>();

export const ProjectorRegistryLogic = {
  /**
   * @method registerApparatus
   * @description Inscribe un componente validando su identidad nominal (M-005).
   */
  registerApparatus: (
    apparatusIdentifier: string,
    componentImplementation: ApparatusComponentImplementation
  ): void => {
    const brandedIdentifier = ApparatusIdentifierSchema.parse(apparatusIdentifier);
    globalApparatusRegistry.set(brandedIdentifier, componentImplementation);
  },

  /**
   * @method getApparatus
   * @description Recupera la implementación física de un aparato modular.
   */
  getApparatus: (brandedIdentifier: IApparatusIdentifier): ApparatusComponentImplementation | undefined => {
    return globalApparatusRegistry.get(brandedIdentifier);
  }
} as const;
