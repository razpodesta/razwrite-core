# 🌍 MANIFIESTO 007: LA DOCTRINA DE SOBERANÍA SEMÁNTICA (i18n)
**Estatus:** VIGENTE | **Subsistema:** @razwritecore/internationalization-engine
**Objetivo:** Erradicar el "Hardcoding" y garantizar que el sistema pueda transmutar su identidad cultural en tiempo real (Edge Runtime) sin fricción.

## 1. PRINCIPIO DE AISLAMIENTO LINGÜÍSTICO (THE SOUL BUNKER)
Ningún componente visual o error de backend puede contener cadenas de texto en crudo (hardcoded). El texto pertenece al "Alma" del aparato y debe residir en silos separados: `i18n/en-US/`, `i18n/es-ES/` y `i18n/pt-BR/`.

## 2. ESTRUCTURA DEL DICCIONARIO ATÓMICO
El diccionario no es un archivo gigante por idioma. Cada aparato tiene su propio micro-diccionario. Esto permite cargar en memoria SOLO las traducciones de los componentes que se están renderizando (Performance Extrema).

**Formato estricto:**
```json
{
  "NombreDelAparato": {
    "claveSemanticaCamelCase": {
      "semanticContent": "Mensaje transmutado con soporte para variables como {nombre}.",
      "semanticVersion": "8.0.0"
    }
  }
}
3. LA ADUANA SEMÁNTICA (ZOD + i18n)
Todo componente de React o función de negocio debe recibir el dictionary (o su subconjunto ya resuelto) y el correlationIdentifier a través de su InputSchema validado por Zod.
4. TRANSLATION ENGINE (EL MOTOR)
El SovereignTranslationEngine es el único responsable de la interpolación de variables. Debe poseer seguridad anti-XSS y un sistema de fallback. Si una clave no existe, no debe romper la UI, debe devolver un rastro visible para QA: ``.
5. ACCESIBILIDAD Y SEO COMO CIUDADANOS DE PRIMERA CLASE
La internacionalización no es solo para el usuario vidente.
Todo atributo aria-label, alt de imagen, o <title> de la página DEBE provenir del diccionario.
Los diccionarios deben contener campos específicos para descripciones largas (Ej: accessibilityInstruction).

---


