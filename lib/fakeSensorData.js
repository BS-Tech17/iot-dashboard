/**
 * Generates random sensor data for given sensors and quantities.
 * @param {Array} sensors - Array of sensor objects with { name, count }.
 * @param {number} dataPoints - Number of data points to generate per sensor (default 20).
 * @returns {Array} Array of sensor data objects with name, unit, and data array.
 */
export function generateFakeSensorData(sensors, dataPoints = 20) {
  const now = new Date();

  return sensors.map(sensor => {
    let min = 0, max = 100, unit = "";
    switch (sensor.name) {
      case "Temperature Sensor": min = 15; max = 40; unit = "°C"; break;
      case "Humidity Sensor": min = 30; max = 90; unit = "%"; break;
      case "Motion Sensor": min = 0; max = 1; unit = "(motion)"; break;
      case "Light Sensor": min = 0; max = 1000; unit = "lux"; break;
      case "Gas Sensor": min = 200; max = 800; unit = "ppm"; break;
      case "Sound Sensor": min = 30; max = 120; unit = "dB"; break;
      case "Pressure Sensor": min = 950; max = 1050; unit = "hPa"; break;
      case "Ultrasonic Sensor": min = 2; max = 400; unit = "cm"; break;
      case "Vibration Sensor": min = 0; max = 10; unit = "(level)"; break;
      case "Water Level Sensor": min = 0; max = 100; unit = "%"; break;
      default: min = 0; max = 100; unit = "";
    }

    const data = Array.from({ length: dataPoints }, (_, i) => ({
      time: new Date(now.getTime() - (dataPoints - 1 - i) * 60000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      value: parseFloat((Math.random() * (max - min) + min).toFixed(2)),
    }));

    return {
      name: sensor.name,
      unit,
      data,
    };
  });
}
