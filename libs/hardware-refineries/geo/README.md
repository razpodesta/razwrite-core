/**
 * @apparatus GeoContextRefinery (NSK-HW-GEO)
 * @role Refinería de Hardware para Extracción de Contexto Geográfico y Geofencing Ético.
 * @location libs/hardware-refineries/geo/README.md
 * @status <STABILIZED>
 * @version 1.0.0
 * @protocol OEDP-V8.5 Lattice
 * @iso 27701 (Privacy Information Management)
 * @iso 25010 (Performance Efficiency)
 */

# 🗺️ GEO-CONTEXT REFINERY

## 📜 DECLARACIÓN DE MISIÓN
La `GeoContextRefinery` es el órgano sensorial encargado de dotar al RazWrite Core de conciencia sobre su ubicación física. Su misión no es el rastreo, sino la **Contextualización Soberana**. Provee los fragmentos geográficos necesarios para la forja de la identidad mutante y asegura que la aplicación se comporte según las leyes de privacidad de la jurisdicción actual.

## 🧠 LÓGICA DE ÉLITE (ZENITH V8.5)

### 1. Doctrina de "Ubicación como Contexto"
Bajo el estándar Lattice, la latitud y longitud son datos radioactivos. Esta refinería transmuta esos datos en códigos **IATA/ISO** (ej: `CLSCL`), eliminando la necesidad de persistir coordenadas exactas en la nube.

### 2. Blindaje de Privacidad (Truncation Logic)
El búnker aplica un algoritmo de truncamiento matemático en el `Deep-Pulse` (Web Worker). Las coordenadas son redondeadas para asegurar que el rastro forense solo identifique una zona general, cumpliendo con la **ISO 27701** y el **Derecho a la Privacidad Atómica**.

### 3. Homeostasis Metabólica
El sensor ajusta su fidelidad según la presión energética dictada por el `MetabolicScheduler`:
- **Modo PEAK:** Alta precisión activada para servicios de última milla.
- **Modo ECO/EMERGENCY:** Uso de posicionamiento por red (menos preciso) para salvar ciclos de radio y batería.

## 🏗️ ANATOMÍA LEGO (M-008)
- **ADN (.schema):** Contratos para códigos ISO 3166 y IATA.
- **NEXO (.logic):** Adaptador pasivo de la Geolocation API.
- **CEREBRO (.worker):** Motor de truncamiento y búsqueda de ciudad O(1).

## 🛠️ PROTOCOLO DE CONSUMO (M-010)
```typescript
import { GeoRefineryLogic } from '@razwritecore/nsk-hw-geo';

const geoContext = await GeoRefineryLogic.extractGeographicContext();
console.log(geoContext.passportPrefix); // Output: "CLSCL"
