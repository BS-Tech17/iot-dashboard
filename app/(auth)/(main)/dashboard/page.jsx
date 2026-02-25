"use client";

import React from "react";
import { CreateAccountDrawer } from "@/app/appcomp/create-account-drawer";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Plus } from "lucide-react";
import { howItWorksData } from "@/data/landing";
import { useProjects } from "@/context/ProjectContext";
import { useRouter } from "next/navigation";

function DashboardPage() {
  console.log("Rendering DashboardPage"); // Debug render
  const { projects } = useProjects();
  const router = useRouter();

  const openProject = (id) => {
    router.push(`/project/${id}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-100 to-blue-300">
      <div className="flex justify-center mt-2 mb-2">
        <CreateAccountDrawer>
          <Card
            className="shadow-md hover:shadow-2xl hover:scale-105 transition-transform duration-300 cursor-pointer border bg-gradient-to-br from-blue-600 to-blue-400 text-white"
          >
            <CardContent className="flex flex-col mt-2 items-center justify-center p-2 position-absolute">
              <Plus className="h-6 w-10" />
              <p className="text-sm font-medium">Add a project</p>
            </CardContent>
          </Card>
        </CreateAccountDrawer>
      </div>

      <div className="flex flex-col items-center mb-8">
        <h2 className="text-3xl font-bold text-blue-700 mb-2">Already Created Projects</h2>
        <div className="flex flex-wrap justify-center gap-6 w-full">
          {(projects.length > 0 ? projects : [
            {
              id: 'demo1',
              name: 'Smart Home Automation',
              type: 'IoT',
              devices: [
                { id: 'd1', name: 'Thermostat', type: 'Sensor', sensors: [{ id: 's1', name: 'Temperature', count: 2 }] },
                { id: 'd2', name: 'Light Controller', type: 'Actuator', sensors: [] },
              ],
            },
            {
              id: 'demo2',
              name: 'Industrial Monitoring',
              type: 'IoT',
              devices: [
                { id: 'd3', name: 'Pressure Sensor', type: 'Sensor', sensors: [{ id: 's2', name: 'Pressure', count: 1 }] },
              ],
            },
          ]).map((project) => (
            <Card
              key={project.id}
              className="w-[400px] bg-white text-blue-900 shadow-lg border border-blue-300 cursor-pointer hover:scale-105 transition-transform duration-300"
              onClick={() => openProject(project.id)}
            >
              <CardHeader className="pb-2">
                <CardTitle className="text-blue-700 font-extrabold text-2xl">
                  {project.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-blue-900 font-bold font-mono divide-y divide-blue-200 px-6 py-2 space-y-2">
                <div className="flex justify-between gap-4">
                  <p>Project Type: {project.type}</p>
                </div>
                <div className="pt-2">
                  <p className="font-semibold">Devices & Sensors:</p>
                  {project.devices && project.devices.length > 0 ? (
                    <ul className="list-disc pl-5">
                      {project.devices.map((device) => (
                        <li key={device.id}>
                          {device.name} ({device.type})
                          {device.sensors && device.sensors.length > 0 && (
                            <ul className="pl-4">
                              {device.sensors.map((sensor) => (
                                <li key={sensor.id}>
                                  {sensor.name} × {sensor.count}
                                </li>
                              ))}
                            </ul>
                          )}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-blue-400">No devices/sensors.</p>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <section className="py-10 pt-0">
        <div className="container mx-auto px-4">
          <h1
            className="text-5xl font-semibold text-center mb-8 mt-20 text-blue-900"
            style={{
              textShadow:
                "2px 1px 0 white, -1px -1px 0 #3b82f6, 2px -1px 0 white, -2px 1px 0 #3b82f6",
            }}
          >
            Understand how it works:
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {howItWorksData.map((step, index) => (
              <Card
                key={step.id || `step-${index}`}
                className="bg-gradient-to-br from-blue-400 via-white to-blue-200 text-blue-900 border border-blue-300 rounded-xl shadow-xl hover:shadow-2xl hover:scale-105 transition-transform duration-300"
              >
                <CardHeader className="flex flex-col items-center">
                  <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-4 shadow-md">
                    {step.icon}
                  </div>
                  <CardTitle className="text-xl text-center font-bold text-blue-900">
                    {step.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-lg text-center text-blue-900">
                    {step.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default DashboardPage;