const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const sensorConfig = {
  TEMPERATURE: { min: 15, max: 40, unit: "°C" },
  HUMIDITY: { min: 30, max: 90, unit: "%" },
  MOTION: { min: 0, max: 1, unit: "motion" },
  LIGHT: { min: 0, max: 1000, unit: "lux" },
  GAS: { min: 200, max: 800, unit: "ppm" },
  SOUND: { min: 30, max: 120, unit: "dB" },
  PRESSURE: { min: 950, max: 1050, unit: "hPa" },
  ULTRASONIC: { min: 2, max: 400, unit: "cm" },
  VIBRATION: { min: 0, max: 10, unit: "level" },
  WATER_LEVEL: { min: 0, max: 100, unit: "%" },
  CUSTOM: { min: 0, max: 100, unit: "" },
};

function getRandomValue(min, max) {
  return parseFloat((Math.random() * (max - min) + min).toFixed(2));
}

async function generateData() {
  // Get the first project (you can modify to filter by isDefault: true if needed)
  const project = await prisma.project.findFirst({
    include: {
      devices: {
        include: {
          sensors: true,
        },
      },
    },
  });

  if (!project) {
    console.log("No projects found in the database.");
    return;
  }

  const allSensors = project.devices.flatMap((device) => device.sensors);

  if (allSensors.length === 0) {
    console.log(` No sensors found for project "${project.name}".`);
    return;
  }

  for (const sensor of allSensors) {
    const config = sensorConfig[sensor.type] || sensorConfig.CUSTOM;
    const value = getRandomValue(config.min, config.max);

    await prisma.sensorData.create({
      data: {
        sensorId: sensor.id,
        value,
        unit: config.unit,
      },
    });

    console.log(
      ` Inserted: ${sensor.name} (${sensor.type}) → ${value} ${config.unit}`
    );
  }

  await prisma.$disconnect();
}

generateData();
