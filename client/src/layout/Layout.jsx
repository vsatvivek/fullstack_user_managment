import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../store/slices/authSlice";
import { useNavigate, Link, Outlet } from "react-router-dom";

export default function Layout() {
  const dispatch = useDispatch();
  const nav = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    nav("/login");
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-purple-800 text-white flex flex-col">
        <div className="p-4 text-xl font-bold border-b border-purple-700">
          MyApp
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <Link
            to="/dashboard"
            className="block px-3 py-2 rounded hover:bg-purple-700"
          >
            Dashboard
          </Link>
          <Link
            to="/users"
            className="block px-3 py-2 rounded hover:bg-purple-700"
          >
            Users
          </Link>
        </nav>
        <button
          onClick={handleLogout}
          className="m-4 px-3 py-2 bg-purple-600 rounded hover:bg-purple-500"
        >
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <div className="flex flex-col flex-1">
        {/* Header */}
        <header className="bg-white shadow p-4 flex justify-between items-center">
          <h1 className="text-lg font-bold">Dashboard</h1>
          <div>User Menu</div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet /> {/* This renders child pages like Dashboard */}
        </main>

        {/* Footer */}
        <footer className="bg-white p-4 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} MyApp. All rights reserved.
        </footer>
      </div>
    </div>
  );
}
