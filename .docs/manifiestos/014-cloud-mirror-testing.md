🧪 MANIFIESTO #014: DOCTRINA DE PRUEBAS ESPEJO Y VALIDACIÓN ZENITH (NSK EDITION)
Estatus: <SUPREME_ZENITH> | Subsistema: Global Quality (Vitest / GitHub Actions)
Objetivo: Garantizar la integridad atómica de cada búnker mediante una arquitectura de pruebas aislada, minimizando el consumo de recursos locales y optimizando el rastro forense en la nube.
1. LA DOCTRINA DEL ESPEJO V2 (PHYSICAL ISOLATION)
Se mantiene la separación física absoluta para ahorrar tokens y proteger el hardware local:
Ubicación: Raíz /tests/.
Espejo Estricto: La estructura interna de /tests debe ser un gemelo de /libs.
Origen: libs/bunkers/identity/src/lib/identity-mutant/identity-mutant.logic.ts
Espejo: tests/bunkers-tests/identity/identity-mutant.logic.spec.ts
2. GRANULARIDAD POR CAPAS DE SOBERANÍA (SUITES)
El Monorepo Nx organiza los tests en proyectos de validación específicos para optimizar el CI/CD:
Suite (Nx Project)	Ubicación	Foco de Validación
@tests/shared	tests/shared-tests	ADN, Cifrado, Bridge-Bus, Logger.
@tests/hardware	tests/hardware-tests	Refinerías de Sensores (Geo, Motion, Bio).
@tests/bunkers	tests/bunkers-tests	Lógica de Identidad, Compliance, Sync, Events.
@tests/integration	tests/int-tests	Puentes de Naturalización (WhatsApp, Stripe).
@tests/app	tests/app-tests	Renderer Shell y Proyección SDUI.
3. PROTOCOLO DE VALIDACIÓN "ZENITH"
Todo test debe cumplir con tres dimensiones de verdad:
Verdad de Contrato (DNA): Validar que el output del búnker pase el Schema.parse() de su propio ADN.
Verdad de Proceso (ACID): Validar que la lógica interna no produzca efectos secundarios no declarados.
Verdad de Performance (Latency): Si una función de refinamiento (M-021) tarda más de 5ms en el test, el CI/CD debe marcarlo como "Regresión de Performance".
4. EL KERNEL VIRTUAL (BRIDGE-BUS MOCKING)
Está prohibido importar la implementación real del Bridge-Bus en los tests de búnkeres.
Regla: Se utiliza un MockBridgeBus que permite al test:
dispatchSpy(): Verificar qué intenciones emite el búnker.
simulateReaction(): Inyectar respuestas cifradas para validar cómo el búnker reacciona a fallos de red o errores de servidor.
5. EJECUCIÓN EN LA NUBE Y CI/CD (TIER ZERO OPTIMIZATION)
La ejecución local de tests es opcional. La Verdad Final reside en GitHub Actions:
Affected Logic: pnpm nx affected -t test. Solo se validan los Legos modificados o aquellos que dependen del cambio.
Parallelization: Ejecución de suites en paralelo para reducir el tiempo de feedback a menos de 120 segundos.
Zero-Card Policy: El rastro de errores de los tests fallidos se envía al SovereignLogger en modo DEBUG para ser analizado por el Neural Sentinel.
🛠️ CASO DE USO: TEST DE INTELIGENCIA (IdentityBunker)
code
TypeScript
// tests/bunkers-tests/identity/identity-mutant.logic.spec.ts
import { IdentityMutantLogic } from '@razwritecore/nsk-bunker-identity';
import { IdentitySchema } from '@razwritecore/nsk-bunker-identity';

describe('IdentityMutantLogic (M-022)', () => {
  it('should generate a valid Mutant ID following the [GEO]-[BASE62]-[SIG] formula', async () => {
    const startTime = performance.now();
    const result = await IdentityMutantLogic.generate({ country: 'CL', city: 'SCL' });
    const latency = performance.now() - startTime;

    // 1. Validar ADN
    expect(IdentitySchema.parse(result)).toBeDefined();
    // 2. Validar Estructura
    expect(result.id).toMatch(/^[A-Z]{5}\.[a-zA-Z0-9]{10,12}\.[a-zA-Z0-9]{4}$/);
    // 3. Validar Performance
    expect(latency).toBeLessThan(10); 
  });
});

---


