/**
 * @apparatus FinancialTransactionAdapter
 * @role Constitución de Diplomacia Financiera, Naturalización de Pasarelas y Sellado Transaccional.
 * @location libs/infrastructure-adapters/financial-transaction-adapter/README.md
 * @status <FORGING_LOGIC>
 * @version 1.0.0
 * @protocol OEDP-V8.5 Lattice
 * @compliance ISO-27001 | PCI-DSS-Ready
 */

# 🏦 ADAPTADOR DE INFRAESTRUCTURA: FINANCIAL GATEWAY

## 1. VISIÓN HOLÍSTICA (THE DIPLOMACY)
El `FinancialTransactionAdapter` actúa como el **Ministerio de Finanzas** del RazWrite Core. Su misión es la naturalización de ecosistemas financieros externos (Stripe, WhatsApp Pay, WeChat Pay, Gateway Bancario) dentro de la Celosía (Lattice). Este aparato no procesa dinero; procesa **Intenciones de Intercambio de Valor** cifradas.

## 2. ARQUITECTURA DE NATURALIZACIÓN (M-024)
Bajo la Doctrina de Diplomacia, este adaptador garantiza que el núcleo del sistema nunca se contamine con SDKs de terceros de forma directa:
- **Opacidad de Secreto:** Las claves de API residen en la Bóveda Cloud (Acid-Pulse). El cliente solo maneja `transactionIntentTokens`.
- **Traducción de Señales:** Transmuta los `webhooks` y `callbacks` crudos de las pasarelas en `ReactionOpCodes` estandarizados por el `MatrixNeuralBridge`.

## 3. FLUJO DE EJECUCIÓN ZENITH (TRIPLE-STAGE SEAL)
1. **Intention Capture:** El `SovereignNervousSystem` despacha un `INTENT_COMMIT_FINANCIAL_TRANSACTION`.
2. **Relay Ciego:** El adaptador envuelve el cargamento en **Materia Oscura (JWE)** y lo envía al proveedor externo mediante un túnel seguro.
3. **Cripto-Sellado:** Tras la respuesta del proveedor, el adaptador solicita al `shared-crypto` una firma HMAC para sellar el rastro forense de la transacción en el `SovereignLogger`.

## 4. ESPECIFICACIONES DE PRÓXIMA GENERACIÓN (PROYECTADAS)
- **Sovereign Ledger Ready:** Preparado para integrarse con sistemas de contabilidad de partida doble interna para el manejo de créditos virtuales de inquilinos.
- **Crypto-Bridge:** Arquitectura diseñada para soportar capas de pago en Web3/Blockchain mediante la inyección de adaptadores de billetera cifrados.
- **Biometric Handshake:** Integración obligatoria con `hardware/biometric` para autorizar transacciones de QoS 0 mediante WebAuthn.

## 5. RESTRICCIONES DE BIOSEGURIDAD (POLÍTICA ZERO-ANY)
- Prohibido el almacenamiento de números de tarjeta en texto plano.
- Prohibido el bypass de la aduana Zod en las respuestas de la API.
- Todo error financiero debe ser transmutado por el `SovereignErrorEngine` con severidad `FATAL` si compromete la integridad del saldo.

---
Firma de Autoridad:
Raz Podestá - Arquitecto Jefe
