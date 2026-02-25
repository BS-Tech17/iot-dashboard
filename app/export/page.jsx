"use client";
import { useEffect, useState } from "react";

export default function ExportPage() {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch the data when the page loads
    const fetchData = async () => {
      const res = await fetch("/api/simulate");
      const json = await res.json();
      setData(json);
    };
    fetchData();
  }, []);

  const downloadJSON = () => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "simulated_data.json";
    link.click();
  };

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Export Simulated Data</h1>

      <button
        onClick={downloadJSON}
        className="bg-blue-600 text-white px-3 py-1 rounded"
      >
        Download JSON
      </button>

      <div className="mt-4">
        <h2 className="text-lg font-semibold mb-2">Data Preview:</h2>
        <pre className="bg-gray-100 p-2 rounded max-h-96 overflow-auto">
          {JSON.stringify(data, null, 2)}
        </pre>
      </div>
    </main>
  );
}
