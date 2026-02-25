import { saveDevice } from '../lib/saveToFirebase.js';

async function testSave() {
  try {
    const deviceId = await saveDevice({
      name: "Test Device",
      type: "RASPBERRY_PI",
      projectId: "your-project-id",
      x: 10,
      y: 20,
    });
    console.log("Saved device with ID:", deviceId);
  } catch (error) {
    console.error("Error saving device:", error);
  }
}

testSave();
