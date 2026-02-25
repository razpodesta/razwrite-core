ok pnpm nx g @nx/next:app apps/razwrite-renderer-shell --directory=apps/razwrite-renderer-shell --style=tailwind --linter=eslint --unitTestRunner=none --e2eTestRunner=none --appDir=true --src=true --tags=type:app,scope:core-renderer

ok pnpm nx g @nx/js:lib libs/foundation/logger --directory=libs/foundation/logger --tags=type:foundation,scope:foundation --bundler=tsc --linter=eslint --unitTestRunner=none --importPath=@razwritecore/logger

ok pnpm nx g @nx/js:lib libs/foundation/error-engine --directory=libs/foundation/error-engine --tags=type:foundation,scope:foundation --bundler=tsc --linter=eslint --unitTestRunner=none --importPath=@razwritecore/error-engine

ok pnpm nx g @nx/js:lib libs/foundation/sdui-engine --directory=libs/foundation/sdui-engine --tags=type:foundation,scope:foundation --bundler=tsc --linter=eslint --unitTestRunner=none --importPath=@razwritecore/sdui-engine

ok pnpm nx g @nx/js:lib libs/foundation/telemetry-matrix --tags=type:foundation,scope:foundation,role:telemetry-dict --bundler=tsc --importPath=@razwritecore/telemetry-matrix

ok pnpm nx g @nx/js:lib libs/foundation/bridge-bus --tags=type:foundation,scope:foundation,role:event-bridge --bundler=tsc --importPath=@razwritecore/bridge-bus

ok pnpm nx g @nx/js:lib libs/orchestration/mini-runtime --tags=type:orchestration,scope:orchestration,role:app-lifecycle --bundler=tsc --importPath=@razwritecore/mini-runtime

ok pnpm nx g @nx/js:lib libs/foundation/federated-identity --tags=type:foundation,scope:foundation,role:identity-core --bundler=tsc --importPath=@razwritecore/federated-identity

pnpm nx g @nx/js:lib libs/foundation/behavioral-engine --tags=type:foundation,scope:foundation,role:analytics --bundler=tsc --importPath=@razwritecore/behavioral-engine

pnpm nx g @nx/js:lib libs/foundation/device-fingerprint --tags=type:foundation,scope:foundation,role:identity --bundler=tsc --importPath=@razwritecore/device-fingerprint

pnpm nx g @nx/js:lib libs/integrations/china-bridge --tags=type:integration,scope:integration,role:adapter --bundler=tsc --importPath=@razwritecore/china-bridge

---

pnpm nx g @nx/react:lib libs/foundation/design-tokens --tags=type:foundation,scope:foundation --bundler=tsc

pnpm nx g @nx/js:lib libs/foundation/i18n-engine --tags=type:util,scope:foundation --bundler=tsc

pnpm nx g @nx/js:lib libs/foundation/types-common --tags=type:foundation,scope:foundation --bundler=tsc

pnpm nx g @nx/react:lib libs/foundation/ui-kit-atoms --tags=type:ui,scope:foundation --bundler=vite

pnpm nx g @nx/react:lib libs/foundation/ui-kit-molecules --tags=type:ui,scope:foundation --bundler=vite

pnpm nx g @nx/react:lib libs/realms/marketing-ui --tags=type:ui,scope:marketing --bundler=vite

pnpm nx g @nx/react:lib libs/realms/communication-ui --tags=type:ui,scope:communication --bundler=vite

pnpm nx g @nx/js:lib libs/realms/identity-domain --tags=type:domain,scope:identity --bundler=tsc

pnpm nx g @nx/js:lib libs/realms/education-domain --tags=type:domain,scope:education --bundler=tsc

pnpm nx g @nx/js:lib libs/integrations/email-dispatcher --tags=type:infrastructure,scope:integrations --bundler=tsc

pnpm nx g @nx/js:lib libs/integrations/ai-translation-bridge --tags=type:infrastructure,scope:integrations --bundler=tsc

pnpm nx g @nx/js:lib libs/integrations/calendar-bridge --tags=type:infrastructure,scope:integrations --bundler=tsc

pnpm nx g @nx/js:lib libs/integrations/whatsapp-bridge --tags=type:infrastructure,scope:integrations --bundler=tsc

pnpm nx g @nx/js:lib libs/orchestration/form-handler --tags=type:util,scope:orchestration --bundler=tsc

pnpm nx g @nx/js:lib libs/orchestration/content-forge --tags=type:util,scope:orchestration --bundler=tsc

pnpm nx g @nx/js:lib libs/orchestration/ai-model-orchestrator --tags=type:util,scope:orchestration --bundler=tsc

pnpm nx g @nx/js:lib libs/orchestration/seo-metadata-factory --tags=type:util,scope:orchestration --bundler=tsc

pnpm nx g @nx/js:lib libs/orchestration/viral-orchestrator --tags=type:util,scope:orchestration --bundler=tsc

pnpm nx g @nx/js:lib tools/internal-utilities --tags=type:util,scope:tools --bundler=tsc
pnpm nx g @nx/js:lib tests/testing-hub --tags=type:util,scope:test --bundler=tsc
