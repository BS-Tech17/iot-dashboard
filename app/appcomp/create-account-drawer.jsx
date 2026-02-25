
"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
  DrawerHeader,
  DrawerTitle,
  DrawerClose,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectItem,
  SelectContent,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { useProjects } from "@/context/ProjectContext";
import { useRouter } from "next/navigation";

export const CreateAccountDrawer = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [addressType, setAddressType] = useState("home");
  const [customLocation, setCustomLocation] = useState("");

  const { projects, addProject, deleteProject } = useProjects();
  const router = useRouter();

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

  const [selectedSensors, setSelectedSensors] = useState({});

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm({
    defaultValues: {
      name: "",
      type: "home",
      isDefault: false,
    },
  });

  const onSubmit = (data) => {
    if (addressType === "other") {
      data.type = customLocation.trim();
    }
    const sensors = Object.entries(selectedSensors).map(([name, count]) => ({
      name,
      count,
    }));

    const newProject = {
      id: Date.now().toString(),
      name: data.name,
      type: data.type,
      isDefault: data.isDefault,
      devices: [
        {
          id: Date.now().toString() + "-device",
          name: "Default Device",
          type: "CUSTOM",
          sensors,
        },
      ],
    };

    addProject(newProject);
    reset();
    setSelectedSensors({});
    setAddressType("home");
    setCustomLocation("");
    setOpen(false);
  };

  const handleDeleteProject = (project) => {
    if (window.confirm(`Are you sure you want to delete the project "${project.name}"? This action cannot be undone.`)) {
      deleteProject(project.id);
      // Uncomment to redirect to homepage after deletion
      // router.push("/");
    }
  };

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent className="bg-gray-950 border-cyan-300 text-white shadow-xl rounded-t-2xl">
        <DrawerHeader>
          <DrawerTitle className="p-4 bg-gray-950 text-blue-200 rounded-2xl">
            Create a project
          </DrawerTitle>
        </DrawerHeader>
        <div className="px-4 pb-4 max-h-[70vh] overflow-y-auto">
          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-2">
              <label className="text-sm font-medium leading-none text-white">Project Name</label>
              <Input
                placeholder="e.g., My First Project"
                {...register("name", {
                  required: true,
                  maxLength: 30,
                  pattern: /^[A-Za-z\s]+$/,
                })}
                required
                className="bg-gray-950 border-cyan-300 text-white"
              />
              {errors.name && (
                <p className="text-red-500 text-xs">
                  Name is required and must contain only alphabets (max 30 chars).
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium leading-none text-white">Organization Type</label>
              <Select
                onValueChange={(value) => {
                  setAddressType(value);
                  setValue("type", value);
                }}
                value={addressType}
              >
                <SelectTrigger className="bg-gray-950 border-cyan-300 text-white">
                  <SelectValue placeholder="Select Type" />
                </SelectTrigger>
                <SelectContent className="bg-gray-950 border-cyan-300 text-white">
                  <SelectItem value="home">Individual</SelectItem>
                  <SelectItem value="office">Educational Institution</SelectItem>
                  <SelectItem value="other">Organization</SelectItem>
                </SelectContent>
              </Select>
              {addressType === "other" && (
                <Input
                  placeholder="Enter custom location"
                  value={customLocation}
                  onChange={(e) => setCustomLocation(e.target.value)}
                  required
                  className="bg-gray-950 border-cyan-300 text-white"
                />
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium leading-none text-white">
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

            <div className="flex items-center justify-between rounded-lg border border-cyan-300 p-3 bg-gray-950">
              <div className="space-y-0.5">
                <label className="text-base font-medium cursor-pointer text-white">
                  Set as Default
                </label>
                <p className="text-sm text-gray-400">
                  This will be selected by default as your current project.
                </p>
              </div>
              <Switch
                checked={watch("isDefault")}
                onCheckedChange={(checked) => setValue("isDefault", checked)}
              />
            </div>

            <div className="flex gap-4 pt-4">
              <DrawerClose asChild>
                <Button type="button" variant="outline" className="flex-1 bg-gray-950 border-cyan-300 text-white hover:bg-gray-800">
                  Cancel
                </Button>
              </DrawerClose>
              <Button type="submit" className="flex-1 bg-cyan-700 hover:bg-cyan-600 text-white">
                Create
              </Button>
            </div>
          </form>

          {/* Projects List with Delete Buttons */}
          {projects.length > 0 && (
            <Card className="mt-6 bg-gray-950 border-cyan-300 text-white">
              <CardHeader>
                <CardTitle className="text-blue-200">Your Projects</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {projects.map((proj) => (
                    <li key={proj.id} className="flex justify-between items-center p-2 rounded bg-gray-800">
                      <span className="text-white">
                        {proj.name} ({proj.type})
                      </span>
                      <Button
                        variant="destructive"
                        className="bg-red-700 hover:bg-red-600 text-white"
                        onClick={() => handleDeleteProject(proj)}
                      >
                        Delete
                      </Button>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}
        </div>
      </DrawerContent>
    </Drawer>
  );
};
