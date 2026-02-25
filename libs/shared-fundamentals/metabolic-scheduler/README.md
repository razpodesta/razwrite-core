/**
 * @apparatus MetabolicScheduler (NSK-METABOLIC)
 * @role Gobernador de Recursos, Sensor de Hardware y Regulador de QoS.
 * @location libs/shared-fundamentals/metabolic-scheduler/README.md
 * @status <SEALED_PRODUCTION>
 * @version 8.5.0 Zenith Edition
 * @protocol OEDP-V8.5 Lattice
 * @iso 25010 (Resource Utilization)
 */

# 🔋 METABOLIC SCHEDULER

## 📜 DECLARACIÓN DE MISIÓN
El `MetabolicScheduler` es el órgano encargado de la **Eficiencia Energética** del ecosistema RazWrite Core. Su misión es monitorear los signos vitales del dispositivo anfitrión (Batería, Red, Visibilidad, Memoria) y dictar el **Modo Metabólico** en el que debe operar la aplicación.

Bajo la doctrina Zenith, la aplicación no es estática; es un organismo vivo que se adapta. Si la batería es baja, el sistema entra en `ECO` y degrada las animaciones. Si la red es crítica, detiene la sincronización de fondo.

## 🧠 LÓGICA DE ÉLITE (ZENITH V8.5)

### 1. Modos Metabólicos (State Machine)
*   **PEAK:** (Cargando + WiFi + Visible) -> Máxima fidelidad, pre-fetching, 60fps.
*   **BALANCED:** (Batería normal + 4G) -> Comportamiento estándar.
*   **ECO:** (Batería < 30% O Data Saver) -> Suspensión de telemetría QoS 3, reducción de efectos visuales.
*   **HIBERNATE:** (Tab oculto) -> Cese total de polling y renderizado. Volcado a L2.
*   **EMERGENCY:** (Batería < 15% desconectado) -> Solo operaciones financieras y de identidad permitidas.

### 2. Biosensores de Hardware
Implementa adaptadores defensivos (`SovereignNavigator`) para `Navigator.getBattery()`, `Navigator.connection` y `Page Visibility API`. Detecta cambios en tiempo real y emite eventos `METABOLIC_MODE_SHIFT` al Logger.

### 3. Regulación de Tráfico (Throttling)
Expone el método `consultExecutionPermit(qosTier)`. El **Sovereign Nervous System** consulta este oráculo antes de despachar una intención. Si el modo es `ECO`, las intenciones `BEHAVIORAL (3)` son rechazadas en el origen para ahorrar ciclos de CPU.

## 🛠️ PROTOCOLO DE CONSUMO (M-010)

```typescript
import { MetabolicScheduler } from '@razwritecore/nsk-shared-metabolic-scheduler';

// 1. Ignición (En el arranque de la App)
await MetabolicScheduler.igniteBiosensors();

// 2. Suscripción a cambios
MetabolicScheduler.observeMetabolicState().subscribe(mode => {
  console.log(`El sistema ha entrado en modo: ${mode}`);
  // Ajustar configuración de UI (ej: apagar videos autoplay)
});

// 3. Consulta de Permiso (Usado por el SNS)
const canExecute = MetabolicScheduler.consultExecutionPermit({
  qualityOfServiceTier: 3, // BEHAVIORAL
  estimatedComplexity: 50
});

if (!canExecute) {
  console.warn('Operación pospuesta por ahorro de energía.');
}
🛡️ REGLAS DE SOBERANÍA IA
Fallo Silencioso de Sensores: Si el navegador no soporta getBattery, el scheduler debe asumir un estado BALANCED por defecto, nunca lanzar una excepción.
Reactividad: El estado debe ser gestionado vía BehaviorSubject de RxJS para garantizar que los nuevos suscriptores reciban el valor actual inmediatamente.
Zero-Any: El acceso a propiedades experimentales (navigator.connection) debe hacerse mediante interfaces extendidas, nunca con as any.
Firma de Autoridad:
Raz Podestá - Arquitecto Jefe

---

