/**
 * @apparatus HuggingFaceSpaceConfig
 * @role Configuración técnica y coordenadas del Proyector Shell.
 * @location .docs/027-hugging-face-fortress-config.md
 * @status <STABILIZED>
 * @protocol OEDP-V8.0 Zenith
 */

# 🏰 CONFIGURACIÓN DE LA FORTALEZA (HUGGING FACE)

## 📡 COORDENADAS DEL SPACE
- **Nombre del Space:** `razpodesta/razwrite-renderer-shell`
- **URL de Interfaz (Hub):** `https://huggingface.co/spaces/razpodesta/razwrite-renderer-shell`
- **URL de Proyección (App Direct):** `https://razpodesta-razwrite-renderer-shell.hf.space`
- **Puerto Obligatorio:** `7860` (Hardcoded en el Dockerfile)

## 🔑 CREDENCIALES DE DESPLIEGUE
- **Git Remote URL:** `https://huggingface.co/spaces/razpodesta/razwrite-renderer-shell`
- **Auth Method:** OAuth2 con `HUGGING_FACE_DEPLOYMENT_ACCESS_TOKEN`.

## 🛡️ REGLAS DE SEGURIDAD DOCKER
- **User Permission:** Hugging Face requiere que el contenedor use el usuario con ID `1000`. Nuestro Dockerfile ya contempla la creación de este usuario para evitar errores de permisos en el montaje de volúmenes.
- **Runtime:** Debian/Alpine Linux (Node 20).

## ⚠️ ADVERTENCIA TÉCNICA
Hugging Face ofrece un "Gesto de Bienvenida" sugiriendo una App en Python/FastAPI. **IGNORAR COMPLETAMENTE**. Nuestra arquitectura es Next.js 16 Standalone. Seguiremos estrictamente el Dockerfile Zenith forjado previamente.

---


