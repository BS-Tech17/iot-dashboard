
"use client";

import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import Link from "next/link";
import SensorCharts from "./SensorCharts";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useProjects } from "@/context/ProjectContext";
import { useRouter, useSearchParams } from "next/navigation";

// Actuator options
const actuators = [
  { type: "Water Sprinkler Motor", use: "Controls water sprinklers for humidity/temperature regulation", examples: "Irrigation systems, greenhouse control" },
  { type: "Servo Motor", use: "Precise control of angular or linear position", examples: "Smart locks, robotic arms, camera positioning" },
  { type: "DC Motor", use: "Continuous rotation for fans, wheels, etc.", examples: "Smart fans, small vehicle systems" },
  { type: "Stepper Motor", use: "Precise incremental motion", examples: "3D printers, CNC machines, valve control" },
  { type: "Solenoid", use: "Push-pull linear motion", examples: "Smart door latches, vending machines" },
  { type: "Relay (Electromechanical Switch)", use: "Turns devices on/off remotely", examples: "Smart lighting, appliances, HVAC systems" },
  { type: "Pneumatic Cylinder", use: "Powered by compressed air for linear movement", examples: "Industrial automation, smart manufacturing" },
  { type: "Hydraulic Actuator", use: "High-force movement via fluid pressure", examples: "Heavy IoT-integrated machinery, agricultural systems" },
  { type: "Thermoelectric Actuator (Peltier Device)", use: "Heating/cooling based on electric current", examples: "Smart coolers, temperature control systems" },
  { type: "Electrochromic Glass Actuator", use: "Changes window tint with voltage", examples: "Smart windows in buildings/vehicles" },
  { type: "Piezoelectric Actuator", use: "Very fine movement using vibration", examples: "Precision valves, medical IoT device" },
];

function getSensorMetadata(name) {
  const sensorMetadata = {
    "Temperature Sensor": { unit: "°C", min: 0, max: 50 },
    "Humidity Sensor": { unit: "%", min: 0, max: 100 },
    "Motion Sensor": { unit: "movement", min: 0, max: 1 },
    "Light Sensor": { unit: "lux", min: 0, max: 1000 },
    "Gas Sensor": { unit: "ppm", min: 0, max: 500 },
    "Sound Sensor": { unit: "dB", min: 0, max: 120 },
    "Pressure Sensor": { unit: "Pa", min: 90000, max: 110000 },
    "Ultrasonic Sensor": { unit: "cm", min: 2, max: 400 },
    "Vibration Sensor": { unit: "Hz", min: 0, max: 100 },
    "Water Level Sensor": { unit: "cm", min: 0, max: 100 },
  };
  return sensorMetadata[name] || { unit: "unit", min: 0, max: 100 };
}

function generatePlausibleSensorData(sensorName, count = 20) {
  const { unit, min, max } = getSensorMetadata(sensorName);
  const data = Array.from({ length: count }, (_, i) => ({
    time: `${i + 1} min ago`,
    value: sensorName === "Motion Sensor"
      ? Math.round(Math.random())
      : Math.round(Math.random() * (max - min) + min),
  }));
  return { name: sensorName, unit, data };
}

function ProjectPage({ params }) {
  const { projects, deleteProject } = useProjects();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { id } = React.use(params);
  const [selectedActuator, setSelectedActuator] = useState("");
  const [startThreshold, setStartThreshold] = useState("");
  const [stopThreshold, setStopThreshold] = useState("");
  const [activeActuators, setActiveActuators] = useState([]);
  const [showSetup, setShowSetup] = useState(false);

  const project = projects.find((p) => p.id === id);

  const allSensors = project?.devices.flatMap((device) => device.sensors || []) || [];
  const sensorStats = allSensors.map((sensor) => generatePlausibleSensorData(sensor.name));
  const highlightedSensor = searchParams.get("highlight") ? decodeURIComponent(searchParams.get("highlight")) : sensorStats[0]?.name;

  useEffect(() => {
    let interval;
    if (project) {
      interval = setInterval(() => {
        activeActuators.forEach((actuator, index) => {
          const relevantSensor = sensorStats.find((s) => s.name.includes("Temperature") || s.name.includes("Humidity"));
          if (relevantSensor) {
            const latestValue = relevantSensor.data[0].value;
            if (!actuator.isActive && latestValue > actuator.startThreshold) {
              setActiveActuators((prev) => {
                const newActuators = [...prev];
                newActuators[index] = { ...actuator, isActive: true, cooldown: Date.now() + 600000 };
                return newActuators;
              });
            } else if (actuator.isActive) {
              if (latestValue <= actuator.stopThreshold || (actuator.cooldown && Date.now() > actuator.cooldown)) {
                setActiveActuators((prev) => {
                  const newActuators = [...prev];
                  newActuators[index] = { ...actuator, isActive: false, cooldown: null };
                  return newActuators;
                });
              }
            }
          }
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [activeActuators, sensorStats, project]);

  if (!project) {
    return <div className="p-8 text-center text-red-500">Project not found</div>;
  }

  const handleCreateActuator = () => {
    if (selectedActuator && startThreshold && stopThreshold) {
      const actuator = actuators.find((a) => a.type === selectedActuator);
      setActiveActuators([
        ...activeActuators,
        {
          type: actuator.type,
          use: actuator.use,
          examples: actuator.examples,
          startThreshold: Number(startThreshold),
          stopThreshold: Number(stopThreshold),
          isActive: false,
          cooldown: null,
        },
      ]);
      setSelectedActuator("");
      setStartThreshold("");
      setStopThreshold("");
      setShowSetup(false);
    }
  };

  const getSensorStatus = (sensor) => {
    const latestValue = sensor.data[0].value;
    const { min, max } = getSensorMetadata(sensor.name);
    return latestValue < min || latestValue > max ? "Alert" : "Normal";
  };

  const handleDeleteProject = () => {
    if (window.confirm(`Are you sure you want to delete the project "${project.name}"? This action cannot be undone.`)) {
      deleteProject(id);
      router.push("/");
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-400 via-white to-blue-400">
      <aside className="w-64 bg-blue-600 text-white flex flex-col p-6 gap-4 border-r border-cyan-300">
        <div className="text-2xl font-bold mb-8 text-cyan-300">Project Menu</div>
        <Link href="/" className="hover:text-cyan-400">🏠 Home</Link>
        <Link href={`/projectSettings/${id}`} className="hover:text-blue-400">⚙️ Project Settings</Link>
        <Link href="/account/settings" className="hover:text-cyan-400">👤 Account Settings</Link>
      </aside>

      <main className="flex-1 py-12 px-8 flex">
        {/* Chart Section */}
        <div className="flex-1 pr-8">
          <h1 className="text-xl text-white font-semibold mb-6">{project.name}</h1>
          <SensorCharts sensorStats={sensorStats} highlightedSensor={highlightedSensor} />
          <div className="mt-6">
            <Button
              variant="outline"
              className="bg-red-700 hover:bg-red-600 text-white"
              onClick={handleDeleteProject}
            >
              Delete Project
            </Button>
          </div>
        </div>

        {/* Combined Sensor Status and Actuators Section */}
        <aside className="w-96 flex flex-col gap-4">
          <Card className="bg-blue-600 border-blue-600 p-6 mt-10 py-10 text-white">
            <CardHeader>
              <CardTitle className="text-2xl text-white">Sensor Status</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {sensorStats
                  .sort((a) => (a.name === highlightedSensor ? -1 : 1)) // Prioritize highlighted sensor
                  .map((sensor, index) => (
                    <li key={index} className={`p-2 rounded ${getSensorStatus(sensor) === "Alert" ? "bg-red-700" : "bg-green-700"}`}>
                      {sensor.name}: {sensor.data[0].value} {sensor.unit} ({getSensorStatus(sensor)})
                    </li>
                  ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-blue-400 border-blue-300 p-6 text-center">
            <CardHeader>
              <CardTitle className="text-2xl text-black">Actuators</CardTitle>
            </CardHeader>
            <CardContent>
              {activeActuators.length === 0 && !showSetup ? (
                <Button onClick={() => setShowSetup(true)} className="bg-white hover:bg-blue-600 text-black">
                  Set Up the Actuators
                </Button>
              ) : showSetup ? (
                <div className="space-y-4 text-white">
                  <Select value={selectedActuator} onValueChange={setSelectedActuator}>
                    <SelectTrigger className="w-full bg-gray-800 text-white border-blue-300">
                      <SelectValue placeholder="Select Actuator" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 text-white border-cyan-300">
                      {actuators.map((actuator) => (
                        <SelectItem key={actuator.type} value={actuator.type} className="text-white hover:bg-cyan-700">
                          {actuator.type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Input type="number" placeholder="Start Threshold" value={startThreshold} onChange={(e) => setStartThreshold(e.target.value)} className="w-full bg-gray-800 text-white border-cyan-300" />
                  <Input type="number" placeholder="Stop Threshold" value={stopThreshold} onChange={(e) => setStopThreshold(e.target.value)} className="w-full bg-gray-800 text-white border-cyan-300" />
                  <Button onClick={handleCreateActuator} className="w-full bg-blue-700 hover:bg-cyan-600 text-white">
                    Create
                  </Button>
                </div>
              ) : (
                <p className="text-2xl text-white font-bold">
                  Actuator State: {activeActuators[0]?.isActive ? "On" : "Off"}
                </p>
              )}
            </CardContent>
          </Card>
        </aside>
      </main>
    </div>
  );
}

export default ProjectPage;
