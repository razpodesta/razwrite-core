# 🛠️ TOOLS-ORCHESTRATOR (EL MAESTRO DE LA FORJA)

> **CLASIFICACIÓN:** APARATO DE UTILIDAD (TOOLS LAYER)
> **PROTOCOLO:** OEDP-V8.2 ZENITH
> **ESTATUS:** <IGNITION_READY>

## 📜 DECLARACIÓN DE MISIÓN

Este aparato es el **Arquitecto de Automatización** del RazWrite Core. Su misión es proveer las herramientas necesarias para el mantenimiento del ecosistema, incluyendo la compilación de diccionarios lingüísticos (i18n), la generación de búnkeres mediante plantillas soberanas y la auditoría estática de metadatos. Es el encargado de asegurar que el flujo de trabajo del desarrollador (IA o Humano) sea veloz, determinístico y libre de errores manuales.

## 🧠 LÓGICA DEL BÚNKER (M-012)

Bajo la doctrina de **Gobernanza de Infraestructura**, este búnker orquesta:

1.  **Sincronización Semántica:** Compila los fragmentos dispersos de `i18n` en los búnkeres hacia los diccionarios consolidados del Renderer Shell.
2.  **Validación de ADN de Proyecto:** Ejecuta scripts que verifican que cada nuevo búnker cumpla con la tríada atómica (M-008) y los pasaportes técnicos (M-003).
3.  **Generación Soberana:** Provee esquemas de Nx personalizados para "forjar" nuevos aparatos con todo el boilerplate Zenith ya inyectado.

## 🏗️ ANATOMÍA ATÓMICA (M-008)

Este búnker sigue la estructura de **Lego-Core** estricta.

```text
tools/nsk-tools-orchestrator/src/
├── index.ts                        # LA PUERTA SELLADA (Fachada Opaca)
└── lib/
    └── forge-master/               # EL BÚNKER ATÓMICO
        ├── forge-master.logic.ts   # EL CEREBRO: Lógica de automatización
        ├── forge-master.schema.ts  # EL ADN: Contratos de scripts y tareas
        └── i18n/                   # EL ALMA: Logs de sistema de herramientas
🛡️ REGLAS PARA LA IA
Cero Abreviaciones (M-004): No usar sh, cmd, exec. Usar shellCommandExecution, commandLineInterface y orchestrationExecution.
Aislamiento de Entorno: Los scripts aquí contenidos no deben depender de variables de entorno globales no documentadas. Toda configuración debe pasar por el ADN del aparato.
Rastro Forense: Todo script de larga duración debe emitir pulsos al SovereignLogger indicando el inicio, progreso y sellado de la tarea.
code
Code
---

Firma de Autoridad:
Raz Podestá - Arquitecto Jefe