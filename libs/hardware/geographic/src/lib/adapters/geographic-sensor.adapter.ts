/**
 * @apparatus GeographicSensorAdapter
 * @role Extracción cruda de señales de hardware del Localizador de Recursos (GPS).
 * @location libs/hardware/geographic/src/lib/geographic-refinery/adapters/geographic-sensor.adapter.ts
 * @status <STABILIZED>
 * @version 1.0.0
 * @protocol OEDP-V8.5 Lattice
 * @hilo Surface-Pulse
 */

export const GeographicSensorAdapter = {
  /**
   * @method captureRawPosition
   * @description Captura la posición cruda desde el sensor físico.
   * @policy No realiza transformaciones; entrega el "Petróleo Crudo" de hardware.
   */
  async captureRawPosition(
    sensorOptions: PositionOptions
  ): Promise<GeolocationPosition> {

    // 1. Isomorfía y Blindaje de Entorno (M-015)
    const isClientContext = typeof window !== 'undefined' && !!navigator?.geolocation;

    return new Promise((resolve, reject) => {
      if (!isClientContext) {
        // Error semántico alineado con el ALMA de la unidad
        return reject(new Error('GeographicRefinery.Errors.UnsupportedEnvironment'));
      }

      /**
       * @step EXTRACCIÓN DIRECTA (METAL-ACCESS)
       * Se utiliza el API nativo de geolocalización del navegador.
       */
      navigator.geolocation.getCurrentPosition(
        (hardwareSuccessPayload: GeolocationPosition) => {
          resolve(hardwareSuccessPayload);
        },
        (hardwareErrorPayload: GeolocationPositionError) => {
          // Mapeo determinístico de errores de hardware
          const errorMapping: Record<number, string> = {
            [hardwareErrorPayload.PERMISSION_DENIED]: 'GeographicRefinery.Errors.PermissionDenied',
            [hardwareErrorPayload.POSITION_UNAVAILABLE]: 'GeographicRefinery.Errors.PositionUnavailable',
            [hardwareErrorPayload.TIMEOUT]: 'GeographicRefinery.Errors.Timeout',
          };

          const semanticKey = errorMapping[hardwareErrorPayload.code] || 'GeographicRefinery.Errors.PositionUnavailable';
          reject(new Error(semanticKey));
        },
        sensorOptions
      );
    });
  }
};
