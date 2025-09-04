// client/src/pages/Dashboard.jsx
import React, { useEffect, useState } from "react";
import api from "../api";
import {
  PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer,
} from "recharts";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const [stats, setStats] = useState({});



  const [latestUsers, setLatestUsers] = useState([]);

  const fetchStats = async () => {
    const res = await api.get("/users/stats");
    setStats(res.data);
  };


  const fetchLatestUsers = async () => {
    const res = await api.get("/users", { params: { limit: 5, sort: "created_at:desc" } });
    setLatestUsers(res.data.rows);
  };

  useEffect(() => {
    fetchStats();
    fetchLatestUsers();
  }, []);

  const data = Object.entries(stats).map(([status, value]) => ({
    name: status.charAt(0).toUpperCase() + status.slice(1),
    value,
  }));

  const COLORS = ["#4CAF50", "#FFC107", "#F44336", "#2196F3"];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>

      {/* Chart Section */}
      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-lg font-semibold mb-4">User Status</h2>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie data={data} cx="50%" cy="50%" labelLine={false} outerRadius={100} fill="#8884d8" dataKey="value">
              {data.map((entry, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Latest Users */}
      <div className="bg-white p-6 rounded shadow">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Latest 5 Users</h2>
          <Link to="/users" className="text-purple-600 hover:underline">View All</Link>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-gray-500">
              <th className="p-2">Name</th>
              <th>Email</th>
              <th>Status</th>
              <th>Created</th>
            </tr>
          </thead>
          <tbody>
            {latestUsers.map((u) => (
              <tr key={u.id} className="border-t">
                <td className="p-2">{u.name}</td>
                <td>{u.email}</td>
                <td>{u.status}</td>
                <td>{new Date(u.created_at).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
