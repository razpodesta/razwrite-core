/**
 * @apparatus ProjectorCoreLogic
 * @role Córtex de resolución de escenas y filtrado metabólico.
 * @location libs/shared-fundamentals/atomic-scene-projector/src/lib/projector-core/projector-core.logic.ts
 * @status <SEALED_PRODUCTION>
 * @version 9.0.1
 */

import { MetabolicScheduler } from '@razwritecore/nsk-shared-metabolic-scheduler';
import { type ILayoutCell, type ITenantManifest } from './projector-core.schema';

/**
 * @context_prompt [LIA Legacy - AI-Audit]
 * DIRECTIVA: Resolución de Error TS 2307 y Nivelación de Tipos.
 * JUSTIFICACIÓN: Se corrigió la visibilidad del módulo `metabolic-scheduler` mediante 
 * la inyección de la dependencia en el package.json del workspace. 
 * IMPACTO: Estabilización del flujo de compilación y habilitación del filtrado reactivo.
 */

export const ProjectorCoreLogic = {
  
  /**
   * @method filterVisibleCells
   * @description Analiza la matriz y decide qué búnkeres proyectar basándose en el metal.
   */
  filterVisibleCells: (tenantManifest: ITenantManifest): ILayoutCell[] => {
    return tenantManifest.layoutMatrix.filter(layoutCell => {
      
      // 1. Consulta al Oráculo Metabólico (Gobernanza de Recursos M-015)
      // Se traduce el peso semántico del búnker en un valor de complejidad estimado.
      const estimatedComplexityValue = mapMetabolicWeightToComplexity(layoutCell.metabolicWeight);

      const hasResourcePermit = MetabolicScheduler.consultExecutionPermit({
        qualityOfServiceTier: layoutCell.priorityQoS,
        estimatedComplexity: estimatedComplexityValue
      });

      // Si el gobernador deniega el permiso, la célula no entra en el árbol de renderizado.
      if (!hasResourcePermit) {
        return false;
      }

      // 2. Evaluación de Condiciones Dinámicas (ej: displayCondition: 'auth_only')
      if (layoutCell.displayCondition) {
        // [Futuro] Inyectar aquí el motor de evaluación de predicados (Rule Engine).
      }

      return true;
    });
  }
};

/**
 * @function mapMetabolicWeightToComplexity
 * @private
 */
function mapMetabolicWeightToComplexity(weight: 'LIGHT' | 'MEDIUM' | 'HEAVY' | 'CRITICAL'): number {
  const complexityMap = {
    LIGHT: 10,
    MEDIUM: 40,
    HEAVY: 80,
    CRITICAL: 100
  };
  return complexityMap[weight];
}