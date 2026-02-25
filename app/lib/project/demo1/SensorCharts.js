import { ChartContainer } from "@/components/ui/chart";
import React from "react";

export default function SensorCharts({ sensorStats, highlightedSensor, actuators = [] }) {
  return (
    <div className="bg-blue-50 rounded-lg p-4 mb-4">
      <h2 className="text-lg font-bold text-blue-700 mb-2">Sensor Charts</h2>
      {sensorStats.map((sensor, idx) => (
        <div key={idx} className="mb-4">
          <div className={sensor.name === highlightedSensor ? "font-bold text-blue-900" : "text-blue-700"}>
            {sensor.name}: {sensor.data[0].value} {sensor.unit}
          </div>
          <ChartContainer
            id={`chart-${sensor.name}`}
            config={{ type: "line", data: sensor.data.map((d) => ({ x: d.time, y: d.value })) }}
            className="bg-white rounded shadow p-2 mt-2"
          >
            {/* Chart will render here using config */}
          </ChartContainer>
        </div>
      ))}
      <div className="mt-6">
        <h3 className="text-md font-bold text-blue-700 mb-2">Actuators</h3>
        {actuators.length === 0 ? (
          <div className="text-blue-500">No actuators active.</div>
        ) : (
          <ul>
            {actuators.map((act, i) => (
              <li key={i} className="text-blue-900 font-semibold">
                {act.type}: {act.isActive ? "On" : "Off"}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
