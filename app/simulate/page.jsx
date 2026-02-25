"use client";
import { useState } from "react";

export default function SimulatePage() {
  const [sensorType, setSensorType] = useState("temperature");
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(100);
  const [frequency, setFrequency] = useState(5);
  const [numDevices, setNumDevices] = useState(1);
  const [status, setStatus] = useState("");

  const startSimulation = async () => {
    const res = await fetch("/api/simulate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        sensorType,
        min: Number(min),
        max: Number(max),
        frequency: Number(frequency),
        numDevices: Number(numDevices),
      }),
    });
    const json = await res.json();
    setStatus(json.status);
  };

  const stopSimulation = async () => {
    const res = await fetch("/api/simulate", { method: "DELETE" });
    const json = await res.json();
    setStatus(json.status);
  };

  return (
    <main className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">IoT Data Simulation</h1>
      <div>
        <label>Sensor Type: </label>
        <select value={sensorType} onChange={(e) => setSensorType(e.target.value)}>
          <option value="temperature">Temperature</option>
          <option value="humidity">Humidity</option>
          <option value="pressure">Pressure</option>
        </select>
      </div>
      <div>
        <label>Min Value: </label>
        <input type="number" value={min} onChange={(e) => setMin(e.target.value)} />
      </div>
      <div>
        <label>Max Value: </label>
        <input type="number" value={max} onChange={(e) => setMax(e.target.value)} />
      </div>
      <div>
        <label>Frequency (seconds): </label>
        <input type="number" value={frequency} onChange={(e) => setFrequency(e.target.value)} />
      </div>
      <div>
        <label>Number of Devices: </label>
        <input type="number" value={numDevices} onChange={(e) => setNumDevices(e.target.value)} />
      </div>
      <div className="space-x-2 mt-4">
        <button onClick={startSimulation} className="bg-green-600 text-white px-3 py-1 rounded">
          Start
        </button>
        <button onClick={stopSimulation} className="bg-red-600 text-white px-3 py-1 rounded">
          Stop
        </button>
      </div>
      {status && <p className="mt-4">Status: {status}</p>}
    </main>
  );
}
