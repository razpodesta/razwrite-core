/**
 * @apparatus IotProximityRefinery (NSK-HW-IOT)
 * @role Refinería de Proximidad, Interacción NFC y Bluetooth Low Energy (BLE).
 * @location libs/hardware-refineries/iot-proximity/README.md
 * @status <STABILIZED>
 * @version 1.1.0
 * @protocol OEDP-V8.5 Lattice
 * @iso 27001 (Control de Acceso Físico)
 * @iso 25010 (Eficiencia Energética)
 */

# 🗼 IOT PROXIMITY REFINERY

## 📜 DECLARACIÓN DE MISIÓN
La `IotProximityRefinery` es la frontera táctica entre el RazWrite Core y el espacio físico tangible. Su misión es permitir la extracción de datos desde periféricos inteligentes y etiquetas de campo cercano, habilitando casos de uso de **Super-App** como pagos sin contacto, validación de identidad física y emparejamiento con hardware propietario.

## 🧠 LÓGICA DE ÉLITE (ZENITH V8.5)

### 1. Diplomacia de Corto Alcance (NFC/BLE)
Utiliza las APIs experimentales del navegador para interactuar con el metal. La refinería abstrae la complejidad de los buffers `NDEF` y `GATT`, entregando al sistema nervioso objetos de intención validados y listos para su procesamiento.

### 2. Sello de Bioseguridad Atómica
Cumpliendo con la **ISO 27001**, los identificadores físicos capturados no se transmiten en crudo. La refinería coordina con el `Shared-Crypto` para generar una firma HMAC local, asegurando que el dispositivo físico es auténtico antes de procesar cualquier transacción.

### 3. Conciencia de Inanición (Energy Guard)
El escaneo de radio es el proceso más costoso del hardware móvil. Esta refinería monitoriza al `MetabolicScheduler`; si la batería cae por debajo del 15% o el dispositivo se calienta, el búnker sella los puertos de radio automáticamente para proteger el dispositivo.

## 🏗️ ANATOMÍA LEGO (M-008)
- **ADN (.schema):** Tipado nominal para `IotDeviceIdentifier` y payloads `NDEF`.
- **NEXO (.logic):** Orquestador de sesiones de lectura y solicitud de permisos al SO.
- **CEREBRO (.worker):** [Futuro] Decodificación de protocolos propietarios BLE en segundo plano.

## 🛠️ PROTOCOLO DE CONSUMO (M-010)
```typescript
import { IotProximityLogic } from '@razwritecore/nsk-hw-iot-proximity';

await IotProximityLogic.igniteNfcReader((payload) => {
  console.log(`Dispositivo físico detectado: ${payload.deviceIdentifier}`);
});
