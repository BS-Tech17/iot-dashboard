"use client";

export default function ProjectSettingsPage({ params }) {
  const { id } = params;
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Project Settings</h1>
      <p>Settings for project ID: {id}</p>
      {/* Add project settings form or controls here */}
    </div>
  );
}
