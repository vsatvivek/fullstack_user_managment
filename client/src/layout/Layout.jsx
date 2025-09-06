import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/slices/authSlice";
import { useNavigate, Link, Outlet, useLocation } from "react-router-dom";

export default function Layout() {
  const dispatch = useDispatch();
  const nav = useNavigate();
  const location = useLocation();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    nav("/login");
  };

  const getPageTitle = () => {
    const path = location.pathname;
    switch (path) {
      case "/dashboard":
        return "Dashboard";
      case "/users":
        return "User Management";
      case "/movies":
        return "Movies";
      case "/my-bookings":
        return "My Bookings";
      default:
        if (path.startsWith("/movies/")) return "Movie Details";
        if (path.startsWith("/booking/")) return "Seat Selection";
        return "Movie Booking App";
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-purple-800 text-white flex flex-col">
        <div className="p-4 text-xl font-bold border-b border-purple-700">
          MovieBooking
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <Link
            to="/dashboard"
            className="block px-3 py-2 rounded hover:bg-purple-700"
          >
            Dashboard
          </Link>
          <Link
            to="/movies"
            className="block px-3 py-2 rounded hover:bg-purple-700"
          >
            Movies
          </Link>
          <Link
            to="/my-bookings"
            className="block px-3 py-2 rounded hover:bg-purple-700"
          >
            My Bookings
          </Link>
          {user?.role === "admin" && (
            <Link
              to="/users"
              className="block px-3 py-2 rounded hover:bg-purple-700"
            >
              Users
            </Link>
          )}
        </nav>
        <div className="p-4 border-t border-purple-700">
          <div className="text-sm text-purple-200 mb-2">
            Welcome, {user?.name}
          </div>
          <button
            onClick={handleLogout}
            className="w-full px-3 py-2 bg-purple-600 rounded hover:bg-purple-500"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex flex-col flex-1">
        {/* Header */}
        <header className="bg-white shadow p-4 flex justify-between items-center">
          <h1 className="text-lg font-bold">{getPageTitle()}</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">{user?.email}</span>
            <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
              {user?.name?.charAt(0).toUpperCase()}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet /> {/* This renders child pages like Dashboard */}
        </main>

        {/* Footer */}
        <footer className="bg-white p-4 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} MovieBooking App. All rights reserved.
        </footer>
      </div>
    </div>
  );
}
