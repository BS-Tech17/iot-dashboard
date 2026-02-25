'use client';

import { useEffect, useState } from 'react';

export default function ProjectList() {
  const [projects, setProjects] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    fetch('/api/projects')
      .then((res) => res.json())
      .then(setProjects);
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    const res = await fetch('/api/projects', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, description }),
    });

    const newProject = await res.json();
    setProjects([newProject, ...projects]);
    setTitle('');
    setDescription('');
  }

  return (
    <div className="p-6 space-y-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Project title"
          className="border p-2 w-full rounded"
          required
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Project description"
          className="border p-2 w-full rounded"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Add Project
        </button>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {projects.map((project) => (
          <div key={project.id} className="p-4 border rounded shadow bg-white">
            <h3 className="text-lg font-bold">{project.title}</h3>
            <p className="text-gray-600">{project.description}</p>
            <span className="text-xs text-gray-400">
              {new Date(project.createdAt).toLocaleString()}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
