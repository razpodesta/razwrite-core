/**
 * @apparatus GeoSensorAdapter
 * @role Extracción cruda de señales de hardware del Localizador de Recursos (GPS).
 * @location libs/hardware/geo/src/lib/adapters/geo-sensor.adapter.ts
 * @status <FORGING_LOGIC>
 * @protocol OEDP-V8.5 Lattice
 * @hilo Surface-Pulse
 */

export const GeoSensorAdapter = {
  /**
   * @description Captura la posición cruda del metal. No procesa, solo entrega.
   */
  async captureRawPosition(options: PositionOptions): Promise<GeolocationPosition> {
    return new Promise((resolve, reject) => {
      if (typeof window === 'undefined' || !navigator.geolocation) {
        reject(new Error('RWC-SENSOR-MISSING: Geolocation API no disponible.'));
        return;
      }
      navigator.geolocation.getCurrentPosition(resolve, reject, options);
    });
  }
};
