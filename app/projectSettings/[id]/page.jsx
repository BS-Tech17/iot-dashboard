
"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useProjects } from "@/context/ProjectContext";
import { useRouter } from "next/navigation";
import Link from "next/link";

const availableSensors = [
  "Temperature Sensor",
  "Humidity Sensor",
  "Motion Sensor",
  "Light Sensor",
  "Gas Sensor",
  "Sound Sensor",
  "Pressure Sensor",
  "Ultrasonic Sensor",
  "Vibration Sensor",
  "Water Level Sensor",
];

function ProjectSettingsPage({ params }) {
  const { projects, updateProject } = useProjects();
  const router = useRouter();
  const { id } = React.use(params);
  const [selectedSensors, setSelectedSensors] = useState({});
  const [project, setProject] = useState(null);
  const [lastModifiedSensor, setLastModifiedSensor] = useState(null);

  useEffect(() => {
    const foundProject = projects.find((p) => p.id === id);
    setProject(foundProject);
    if (foundProject) {
      const initialSensors = foundProject.devices[0]?.sensors.reduce(
        (acc, sensor) => ({ ...acc, [sensor.name]: sensor.count }),
        {}
      ) || {};
      setSelectedSensors(initialSensors);
    }
  }, [id, projects]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: project?.name || "",
    },
  });

  if (!project) {
    return <div className="p-8 text-center text-red-500">Project not found</div>;
  }

  const onSubmit = (data) => {
    const sensors = Object.entries(selectedSensors).map(([name, count]) => ({
      name,
      count: Math.max(1, Math.min(50, count)),
    }));

    if (sensors.length === 0) {
      alert("Please select at least one sensor.");
      return;
    }

    const updatedProject = {
      ...project,
      name: data.name,
      devices: [
        {
          ...project.devices[0],
          sensors,
        },
      ],
    };

    updateProject(id, updatedProject);
    router.push(`/project/${id}?highlight=${encodeURIComponent(lastModifiedSensor || sensors[0].name)}`);
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-900 via-white to-blue-200">
      <aside className="w-64 bg-blue-600 text-white flex flex-col p-6 gap-4 border-r border-cyan-300">
        <div className="text-2xl font-bold mb-8 text-blue-300">Project Menu</div>
        <Link href="/" className="hover:text-cyan-400">🏠 Home</Link>
        <Link href={`/project/${id}`} className="hover:text-cyan-400">📊 Project Dashboard</Link>
        <Link href="/account/settings" className="hover:text-cyan-400">👤 Account Settings</Link>
      </aside>

      <main className="flex-1 py-12 px-8">
        <h1 className="text-xl text-black font-semibold mb-6">Settings for {project.name}</h1>

        <Card className="bg-blue-200 border-blue-300 text-white">
          <CardHeader>
            <CardTitle className="text-blue-200">Project Settings</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
              <div className="space-y-2">
                <label className="text-xl font-medium leading-none text-black">Project Name</label>
                <Input
                  placeholder="e.g., My First Project"
                  {...register("name", {
                    required: true,
                    maxLength: 30,
                    pattern: /^[A-Za-z\s]+$/,
                  })}
                  className="bg-gray-950 border-blue-400 text-white"
                />
                {errors.name && (
                  <p className="text-red-500 text-xs">
                    Name is required and must contain only alphabets (max 30 chars).
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-xl font-medium leading-none text-black">
                  Select Sensors and Quantity
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {availableSensors.map((sensor) => (
                    <div key={sensor} className="flex items-center justify-between border border-cyan-300 p-2 rounded-md bg-gray-950">
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id={`sensor-${sensor}`}
                          checked={selectedSensors[sensor] !== undefined}
                          onChange={(e) => {
                            const updated = { ...selectedSensors };
                            if (e.target.checked) {
                              updated[sensor] = 1;
                              setLastModifiedSensor(sensor); // Track the last modified sensor
                            } else {
                              delete updated[sensor];
                            }
                            setSelectedSensors(updated);
                          }}
                        />
                        <label htmlFor={`sensor-${sensor}`} className="text-sm text-white">
                          {sensor}
                        </label>
                      </div>
                      {selectedSensors[sensor] !== undefined && (
                        <input
                          type="number"
                          min={1}
                          max={50}
                          value={selectedSensors[sensor]}
                          onChange={(e) => {
                            const updated = { ...selectedSensors };
                            updated[sensor] = parseInt(e.target.value) || 1;
                            setSelectedSensors(updated);
                            setLastModifiedSensor(sensor); // Track when count is modified
                          }}
                          className="w-14 border border-cyan-300 px-2 py-1 rounded bg-gray-950 text-white ml-2 text-sm"
                        />
                      )}
                    </div>
                  ))}
                </div>
                {Object.keys(selectedSensors).length === 0 && (
                  <p className="text-red-500 text-xs">At least one sensor must be selected.</p>
                )}
              </div>

              <div className="flex gap-4 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1 bg-gray-950 border-cyan-300 text-white hover:bg-gray-800"
                  onClick={() => router.push(`/project/${id}`)}
                >
                  Cancel
                </Button>
                <Button type="submit" className="flex-1 bg-blue-700 hover:bg-cyan-600 text-white">
                  Save Changes
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}

export default ProjectSettingsPage;
