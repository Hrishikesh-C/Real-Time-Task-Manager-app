import React, { useState, useEffect } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { chartData as initialData } from "../assets/data";

export const Chart = () => {
  const [chartData, setChartData] = useState(initialData);

  // Function to update chart data dynamically
  const updateChartData = () => {
    setChartData((prevData) =>
      prevData.map((item) => ({
        ...item,
        total: Math.floor(Math.random() * 200) + 50, // Randomizing values
      }))
    );
  };

  // Update the data every 2 seconds
  useEffect(() => {
    const interval = setInterval(updateChartData, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-4 bg-[#0A192F] rounded-xl shadow-lg neon-border">
      <h2 className="text-xl font-bold text-[#00D8FF] mb-4 text-center">
        Task Progress Overview
      </h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={chartData}
          margin={{ top: 10, right: 30, left: 0, bottom: 5 }}
          style={{ background: "#0A192F", borderRadius: "8px", padding: "16px" }}
        >
          {/* Neon Gradient for the Bars */}
          <defs>
            <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#00D8FF" /> {/* Neon Blue */}
              <stop offset="100%" stopColor="#8B5CF6" /> {/* Neon Purple */}
            </linearGradient>
          </defs>

          {/* Grid and Axes */}
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis dataKey="name" stroke="#9CA3AF" />
          <YAxis stroke="#9CA3AF" />

          {/* Custom Tooltip */}
          <Tooltip
            contentStyle={{
              background: "#0F172A",
              border: "1px solid #374151",
              borderRadius: "8px",
              color: "#F3F4F6",
            }}
            cursor={{ fill: "rgba(255, 255, 255, 0.1)" }}
          />

          {/* Legend */}
          <Legend
            wrapperStyle={{
              paddingTop: "10px",
              color: "#F3F4F6",
            }}
          />

          {/* Bar with Neon Glow */}
          <Bar
            dataKey="total"
            fill="url(#barGradient)"
            barSize={40}
            radius={[6, 6, 0, 0]}
            isAnimationActive={true}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
