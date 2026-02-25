import React from "react";
import DashboardPage from "./page";
import { ProjectProvider } from "@/context/ProjectContext";

const DashboardLayout = () => {
  console.log("Rendering DashboardLayout"); // Debug render
  return (
    <ProjectProvider>
      <div className="px-5">
        <h1 className="gradient-title"></h1>
        <DashboardPage />
      </div>
    </ProjectProvider>
  );
};

export default DashboardLayout;