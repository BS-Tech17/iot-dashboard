"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import Link from "next/link";
import SensorCharts from "./SensorCharts";
import { Button } from "@/components/ui/button";

const actuators = [
  { type: "Light Controller", use: "Controls lights", examples: "Smart home lighting" },
  { type: "Thermostat", use: "Controls temperature", examples: "Smart thermostat" },
];

function generatePlausibleSensorData(sensorName, count = 20) {
  const sensorMetadata = {
    "Temperature": { unit: "°C", min: 0, max: 50 },
    "Light": { unit: "lux", min: 0, max: 1000 },
  };
  const { unit, min, max } = sensorMetadata[sensorName] || { unit: "unit", min: 0, max: 100 };
  const data = Array.from({ length: count }, (_, i) => ({
    time: `${i + 1} min ago`,
    value: Math.round(Math.random() * (max - min) + min),
  }));
  return { name: sensorName, unit, data };
}

export default function Demo1ProjectPage() {
  const [activeActuators, setActiveActuators] = useState([]);
  const sensorStats = [
    generatePlausibleSensorData("Temperature"),
    generatePlausibleSensorData("Light"),
  ];
  const highlightedSensor = sensorStats[0].name;

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-white via-blue-100 to-blue-300">
      <aside className="w-64 bg-gradient-to-br from-blue-700 via-blue-400 to-blue-200 text-white flex flex-col p-6 gap-4 border-r border-blue-300">
        <div className="text-2xl font-bold mb-8 text-blue-100">Project Menu</div>
        <Link href="/" className="hover:text-blue-400">🏠 Home</Link>
      </aside>
      <main className="flex-1 py-12 px-8 flex">
        <div className="flex-1 pr-8">
          <h1 className="text-xl text-blue-900 font-semibold mb-6">Smart Home Automation</h1>
          <SensorCharts sensorStats={sensorStats} highlightedSensor={highlightedSensor} actuators={activeActuators} />
        </div>
        <aside className="w-96 flex flex-col gap-4">
          <Card className="bg-white border-blue-300 p-6 text-blue-900">
            <CardHeader>
              <CardTitle className="text-2xl text-blue-700">Sensor Status</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {sensorStats.map((sensor, index) => (
                  <li key={index} className="p-2 rounded bg-blue-100">
                    {sensor.name}: {sensor.data[0].value} {sensor.unit}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
          <Card className="bg-white border-blue-300 p-6 text-center">
            <CardHeader>
              <CardTitle className="text-2xl text-blue-700">Actuators</CardTitle>
            </CardHeader>
            <CardContent>
              {activeActuators.length === 0 ? (
                <Button onClick={() => setActiveActuators(actuators)} className="bg-blue-700 hover:bg-blue-600 text-white">
                  Activate Actuators
                </Button>
              ) : (
                <p className="text-2xl text-blue-900 font-bold">
                  Actuator State: On
                </p>
              )}
            </CardContent>
          </Card>
        </aside>
      </main>
    </div>
  );
}
