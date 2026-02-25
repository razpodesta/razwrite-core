**ROL:** Arquitecta de Sistemas Distribuidos & Investigadora de Ecosistemas Asiáticos (BAT - Baidu, Alibaba, Tencent).

**OBJETIVO:** Realizar una ingeniería inversa conceptual de las arquitecturas de "Super Apps" (WeChat/Alipay). Identificar los patrones de diseño comunes que permiten:

1.  **Observabilidad Total (Omnisciencia):** Cómo rastrean el comportamiento del usuario (Clickstream, Dwell Time, Hotspots) en tiempo real sin degradar el rendimiento.
2.  **Interoperabilidad Extrema:** Qué protocolos o "Aparatos Base" utilizan para que sus Mini-Programas se acoplen al ecosistema nativo.
3.  **Identidad Unificada:** Cómo gestionan la sesión y el reconocimiento del usuario a través de múltiples servicios.

**TAREA TÁCTICA:**
Basado en la evidencia de repositorios como _Tencent Tars_, _Alibaba Dubbo/Ice.js_ y la arquitectura de _Mini-Programs_, audita el _RazWrite Core (RWC)_.
Detecta qué "Órganos Vitales" nos faltan para lograr esa capacidad de rastreo y acoplamiento. Propón la creación de nuevos Workspaces en la capa `Foundation` o `Integration` que emulen estas capacidades (ej: Fingerprinting, Behavioral Tracking, Bridge Adapters).

**FORMATO DE SALIDA:** Análisis comparativo y lista de comandos Nx para generar los nuevos búnkeres.

---
