# ====================================================================
# 🏗️ ETAPA 1: FORJA DE ARTEFACTOS (ARTIFACT_FORGING_STAGE)
# @apparatus ProductionArtifactBuilder
# @description Compilación estricta y refinamiento de binarios.
# ====================================================================
FROM node:22.14.0-alpine3.21 AS artifact_forging_stage

# 🛡️ PROTOCOLO DE BIOSEGURIDAD DIGITAL
# 'libc6-compat' es innegociable para la ejecución de binarios SWC/Nx en Alpine.
RUN apk update && \
    apk upgrade --no-cache && \
    apk add --no-cache libc6-compat

# Calibración de la autoridad de paquetes (pnpm) según package.json raíz
RUN corepack enable && corepack prepare pnpm@10.26.1 --activate

WORKDIR /application_container_root

# Inyección del ADN de dependencias para optimizar la caché de capas.
# Se añade pnpm-workspace.yaml para que pnpm entienda la topología del monorepo.
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

# Instalación de dependencias en modo congelado e ignorando scripts de desarrollo (Husky).
RUN pnpm install --frozen-lockfile --ignore-scripts

# Inyección del rastro completo del proyecto
COPY . .

# Ignición del motor de compilación Nx para el proyector visual (Renderer Shell)
# El flag --prod asegura el sellado de performance Zenith.
RUN pnpm nx build razwrite-renderer-shell --prod

# ====================================================================
# 🚀 ETAPA 2: MOTOR DE EJECUCIÓN SOBERANO (PRODUCTION_EXECUTION_STAGE)
# @apparatus ProductionRuntimeEngine
# @description Entorno de ejecución blindado y de latencia cero.
# ====================================================================
FROM node:22.14.0-alpine3.21 AS production_execution_stage

RUN apk update && apk upgrade --no-cache

WORKDIR /application_container_root

# 🐳 CONFIGURACIÓN DE IDENTIDAD SOBERANA (HUGGING FACE COMPLIANCE - M-027)
RUN addgroup --system --gid 1000 razwrite_group && \
    adduser --system --uid 1000 razwrite_user

# TRASPASO DE ARTEFACTOS REFINADOS (Next.js Standalone Mode)
COPY --from=artifact_forging_stage --chown=razwrite_user:razwrite_group /application_container_root/dist/apps/razwrite-renderer-shell/.next/standalone ./
COPY --from=artifact_forging_stage --chown=razwrite_user:razwrite_group /application_container_root/dist/apps/razwrite-renderer-shell/.next/static ./dist/apps/razwrite-renderer-shell/.next/static
COPY --from=artifact_forging_stage --chown=razwrite_user:razwrite_group /application_container_root/apps/razwrite-renderer-shell/public ./apps/razwrite-renderer-shell/public

# CONFIGURACIÓN DEL KERNEL DE EJECUCIÓN
ENV NODE_ENV=production
ENV PORT=7860
ENV HOSTNAME="0.0.0.0"

# Activación de privilegios mínimos para la Proyección de Realidad.
USER razwrite_user
EXPOSE 7860

# IGNICIÓN FINAL
CMD ["node", "apps/razwrite-renderer-shell/server.js"]