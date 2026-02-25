# 🏛️ MANIFIESTO 010: LA DOCTRINA DE LA FACHADA Y EL CARGAMENTO ÚNICO
**Estatus:** VIGENTE | **Subsistema:** Global (API Design / AI Guidelines)
**Objetivo de este documento:** Erradicar la fragilidad estructural al actualizar búnkeres. Garantizar el Principio de Abierto/Cerrado (Open/Closed Principle) para que el código sea expansible sin romper las importaciones existentes.

## 1. LA LEY DE LA FACHADA OPACA (FACADE PATTERN)
Está estrictamente prohibido exportar Clases en crudo (Raw Classes) o múltiples funciones sueltas desde el archivo `index.ts` de un búnker fundacional o de orquestación.
*   **Motivo:** Si un búnker exporta una Clase, el consumidor la instanciará con `new Clase()`. Si en el futuro cambiamos la arquitectura interna, se romperán todos los consumidores.
*   **Ejecución:** Todo búnker debe exportar un **Único Objeto Orquestador Constante** (Ej: `SovereignErrorEngine`, `SovereignLogger`, `PaymentGateway`). Las funciones y clases reales deben ser privadas y consumidas a través de los métodos de este objeto maestro.

## 2. LA LEY DEL CARGAMENTO ÚNICO (SINGLE ARGUMENT PAYLOAD)
Está estrictamente prohibido que las funciones públicas de un búnker acepten múltiples parámetros posicionales.
*   🚫 **Ilegal:** `function executePayment(amount: number, currency: string, user: string)` -> Si mañana necesitamos agregar `discountCode`, romperemos la firma de la función.
*   ✅ **Soberano:** `function executePayment(context: IPaymentInput)` -> El parámetro es un único objeto validado por el Esquema Zod de Entrada (`InputSchema`). Si el futuro exige un nuevo dato, se agrega como propiedad opcional en Zod y ningún consumidor antiguo colapsa.

## 3. AISLAMIENTO DE LA MUTACIÓN (IMMUTABILITY)
Toda inteligencia artificial desarrolladora que altere un búnker existente para agregar nuevas capacidades tiene prohibido modificar los nombres de las funciones exportadas o eliminar propiedades de los contratos Zod de entrada. La evolución debe ser puramente aditiva.

## 4. INYECCIÓN DEL CONTEXTO SDUI
Todo búnker que registre eventos, métricas o errores debe extraer silenciosamente el `tenantIdentifier` (Identificador de Inquilino) desde el `SovereignContextStorage` (AsyncLocalStorage). Ninguna función debe pedir el identificador de inquilino por parámetro. Esto garantiza la limpieza de la Interfaz de Programación (API).

---


