// app/project/[id]/SensorCharts.jsx
"use client";

import React from "react";
import {
  Card,
  CardHeader,
  CardContent,
} from "@/components/ui/card";
import {
  ChartContainer,
} from "@/components/ui/chart";
import {
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend as RechartsLegend,
  Line,
} from "recharts";

function ChartTooltipContent({ active, payload, label }) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-gray-800 text-white p-2 rounded shadow">
        <p className="text-sm">{label}</p>
        <p className="text-xs">{payload[0].name}: {payload[0].value}</p>
      </div>
    );
  }
  return null;
}

export default function SensorCharts({ sensorStats = [] }) {
  const stats = sensorStats || [];
  const allData = stats.flatMap(sensor => 
    sensor.data.map(d => ({
      time: d.time,
      [sensor.name]: d.value,
    }))
  );

  return (
    <section className="w-full max-w-4xl bg-white rounded-xl p-6 mb-8 shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-blue-900">📊 Sensor Data (last 24 hours, hourly)</h2>
      {stats.length === 0 ? (
        <div className="text-gray-400">No sensor data available.</div>
      ) : (
        <div className="flex-1 bg-gray-950 rounded-lg p-4 shadow">
          <h4 className="font-bold mb-2 text-blue-400">Combined Line Chart</h4>
          <ChartContainer config={{}} className="h-64">
            <LineChart data={allData} margin={{ top: 10, right: 30, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="time" tick={{ fill: "#94a3b8", fontSize: 10 }} angle={-45} textAnchor="end" height={70} />
              <YAxis tick={{ fill: "#94a3b8", fontSize: 12 }} />
              <RechartsTooltip content={<ChartTooltipContent />} />
              <RechartsLegend />
              {stats.map(sensor => (
                <Line
                  key={sensor.name}
                  dataKey={sensor.name}
                  stroke={`#${Math.floor(Math.random()*16777215).toString(16)}`} // Random color per sensor
                  strokeWidth={2}
                  dot={false}
                  name={sensor.name}
                />
              ))}
            </LineChart>
          </ChartContainer>
        </div>
      )}
    </section>
  );
}