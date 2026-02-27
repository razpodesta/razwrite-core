/**
 * @apparatus KineticMotionRefinery (NSK-HW-MOTION)
 * @role Refinería de Movimiento y Orientación para Detección de Intenciones Físicas.
 * @status <SEALED_PRODUCTION>
 * @version 1.1.0
 * @protocol OEDP-V8.5 Lattice
 * @iso 25010 (Eficiencia de Desempeño)
 */

# ⚖️ KINETIC MOTION REFINERY

## 📜 DECLARACIÓN DE MISIÓN
La `KineticMotionRefinery` dota al RazWrite Core de sentido inercial. Su misión es capturar y procesar las fuerzas gravitacionales del dispositivo para enriquecer el perfil conductual del usuario. Es el órgano clave para detectar **Frustración Física** (Shake) y estados de uso (Vertical vs Horizontal).

## 🧠 LÓGICA DE ÉLITE
1. **Detección de Shake (M-021):** Identifica ráfagas de aceleración > 15m/s², permitiendo disparar búnkeres de ayuda contextual ante la frustración detectada.
2. **Aislamiento Metabólico:** Si la batería es baja, el sensor reduce su tasa de refresco automáticamente para extender la vida del dispositivo.
3. **Privacidad Kinética (ISO 27701):** Se aplica un truncamiento matemático de los decimales de aceleración para evitar que el sensor sea utilizado como micrófono de canal lateral.

## 🛠️ PROTOCOLO DE CONSUMO
```typescript
import { KineticMotionLogic } from '@razwritecore/nsk-hw-motion';

KineticMotionLogic.igniteRefinery((snapshot) => {
  if (snapshot.detectedGesture === 'SHAKING') {
    // Reaccionar a la frustración
  }
});
