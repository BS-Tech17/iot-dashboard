const express = require('express');
const { PrismaClient } = require('@prisma/client');
const { v4: uuidv4 } = require('uuid');
const app = express();
const PORT = 3001;

const prisma = new PrismaClient();

app.use(express.json());

// Root endpoint to show backend server is running
app.get('/', (req, res) => {
  res.send('<h2>IoT Simulator Backend is running on port 3001</h2><p>API Endpoints available:</p><ul><li>POST /api/projects</li><li>GET /api/users/:userId/projects</li><li>GET /api/devices</li><li>GET /api/projects</li></ul>');
});

// Get all projects (with devices and sensors)
app.get('/api/projects', async (req, res) => {
  try {
    const projects = await prisma.project.findMany({
      include: {
        devices: {
          include: { sensors: true }
        }
      }
    });
    res.json(projects);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get a single project by id (with devices and sensors)
app.get('/api/projects/:id', async (req, res) => {
  try {
    const project = await prisma.project.findUnique({
      where: { id: req.params.id },
      include: {
        devices: {
          include: { sensors: true }
        }
      }
    });
    if (!project) return res.status(404).json({ error: 'Project not found' });
    res.json(project);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all projects (with devices and sensors) for a user
app.get('/api/users/:userId/projects', async (req, res) => {
  try {
    const projects = await prisma.project.findMany({
      where: { userId: req.params.userId },
      include: {
        devices: {
          include: { sensors: true }
        }
      }
    });
    res.json(projects);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all devices
app.get('/api/devices', async (req, res) => {
  try {
    const devices = await prisma.device.findMany({ include: { sensors: true, project: true } });
    res.json(devices);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Create a new project with devices and sensors
app.post('/api/projects', async (req, res) => {
  let { name, type, userId, isDefault, devices } = req.body;
  try {
    console.log('Received project creation request:', req.body);
    // If no userId, create a new user and use its id
    if (!userId) {
      const newUser = await prisma.user.create({
        data: {
          id: uuidv4(),
          email: `${Date.now()}@example.com`,
          name: "Auto User"
        }
      });
      userId = newUser.id;
    }
    // Unset previous default if needed
    if (isDefault) {
      await prisma.project.updateMany({
        where: { userId, isDefault: true },
        data: { isDefault: false }
      });
    }
    const newProject = await prisma.project.create({
      data: {
        name,
        type,
        userId,
        isDefault: !!isDefault,
        devices: devices && devices.length > 0 ? {
          create: devices.map(device => ({
            name: device.name,
            type: device.type,
            x: device.x || 0,
            y: device.y || 0,
            sensors: device.sensors && Object.keys(device.sensors).length > 0 ? {
              create: Object.entries(device.sensors).map(([sensorType, count]) => ({
                name: sensorType,
                type: sensorType,
                aiEnabled: false,
                data: [],
                count: count
              }))
            } : undefined
          }))
        } : undefined
      },
      include: {
        devices: { include: { sensors: true } }
      }
    });
    console.log('Project created:', newProject);
    res.status(201).json(newProject);
  } catch (error) {
    console.error('Error creating project:', error);
    res.status(400).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
