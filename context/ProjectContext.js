"use client";

import React, { createContext, useState, useContext, useEffect } from "react";
import { useUser } from "@clerk/nextjs";

const ProjectContext = createContext();

const STORAGE_KEY_PREFIX = "projects_";

export const ProjectProvider = ({ children }) => {
  const { user } = useUser();
  const [projects, setProjects] = useState([]);

  // Load projects on user login or page mount
  useEffect(() => {
    if (user?.emailAddresses?.[0]?.emailAddress) {
      const email = user.emailAddresses[0].emailAddress;
      const stored = localStorage.getItem(STORAGE_KEY_PREFIX + email);
      if (stored) {
        try {
          setProjects(JSON.parse(stored));
        } catch (err) {
          console.error("Error parsing projects from localStorage", err);
          setProjects([]);
        }
      } else {
        setProjects([]);
      }
    } else {
      setProjects([]);
    }
  }, [user]);

  // Save projects to localStorage whenever changed
  useEffect(() => {
    if (user?.emailAddresses?.[0]?.emailAddress) {
      const email = user.emailAddresses[0].emailAddress;
      localStorage.setItem(STORAGE_KEY_PREFIX + email, JSON.stringify(projects));
    }
  }, [projects, user]);

  const addProject = (project) => {
    setProjects((prev) => [...prev, project]);
  };

  const updateProject = (index, updatedProject) => {
    setProjects((prev) => {
      const updated = [...prev];
      updated[index] = updatedProject;
      return updated;
    });
  };

  const deleteProject = (index) => {
    setProjects((prev) => prev.filter((_, i) => i !== index));
  };

  const setDefaultProject = (index) => {
    setProjects((prev) =>
      prev.map((project, i) => ({
        ...project,
        isDefault: i === index,
      }))
    );
  };

  return (
    <ProjectContext.Provider
      value={{
        projects,
        setProjects,
        addProject,
        updateProject,
        deleteProject,
        setDefaultProject,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

export const useProjects = () => useContext(ProjectContext);
