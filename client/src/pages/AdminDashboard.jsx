import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../store/slices/authSlice";

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [activeTab, setActiveTab] = useState("movies");

  const handleLogout = () => {
    dispatch(logout());
  };

  if (user?.role !== "admin") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">
            Access Denied
          </h1>
          <p className="text-gray-600 mb-4">
            You need admin privileges to access this page.
          </p>
          <Link
            to="/dashboard"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
          >
            Go to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Admin Dashboard
              </h1>
              <p className="text-gray-600">Welcome back, {user?.name}</p>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                to="/dashboard"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                User Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white rounded-lg shadow">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8 px-6">
              <button
                onClick={() => setActiveTab("movies")}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "movies"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Movies Management
              </button>
              <button
                onClick={() => setActiveTab("showtimes")}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "showtimes"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Showtimes Management
              </button>
              <button
                onClick={() => setActiveTab("theaters")}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "theaters"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Theaters Management
              </button>
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === "movies" && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">
                    Movies Management
                  </h2>
                  <Link
                    to="/admin/movies/create"
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
                  >
                    Add New Movie
                  </Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-medium text-gray-900 mb-2">
                      Total Movies
                    </h3>
                    <p className="text-2xl font-bold text-blue-600">-</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-medium text-gray-900 mb-2">
                      Active Movies
                    </h3>
                    <p className="text-2xl font-bold text-green-600">-</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-medium text-gray-900 mb-2">
                      Inactive Movies
                    </h3>
                    <p className="text-2xl font-bold text-red-600">-</p>
                  </div>
                </div>
                <div className="mt-6">
                  <Link
                    to="/admin/movies"
                    className="text-blue-600 hover:text-blue-800 font-medium"
                  >
                    View All Movies →
                  </Link>
                </div>
              </div>
            )}

            {activeTab === "showtimes" && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">
                    Showtimes Management
                  </h2>
                  <Link
                    to="/admin/showtimes/create"
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
                  >
                    Add New Showtime
                  </Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-medium text-gray-900 mb-2">
                      Total Showtimes
                    </h3>
                    <p className="text-2xl font-bold text-blue-600">-</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-medium text-gray-900 mb-2">
                      Today's Shows
                    </h3>
                    <p className="text-2xl font-bold text-green-600">-</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-medium text-gray-900 mb-2">
                      This Week
                    </h3>
                    <p className="text-2xl font-bold text-purple-600">-</p>
                  </div>
                </div>
                <div className="mt-6">
                  <Link
                    to="/admin/showtimes"
                    className="text-blue-600 hover:text-blue-800 font-medium"
                  >
                    View All Showtimes →
                  </Link>
                </div>
              </div>
            )}

            {activeTab === "theaters" && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">
                    Theaters Management
                  </h2>
                  <Link
                    to="/admin/theaters/create"
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
                  >
                    Add New Theater
                  </Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-medium text-gray-900 mb-2">
                      Total Theaters
                    </h3>
                    <p className="text-2xl font-bold text-blue-600">-</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-medium text-gray-900 mb-2">
                      Total Screens
                    </h3>
                    <p className="text-2xl font-bold text-green-600">-</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-medium text-gray-900 mb-2">
                      Total Seats
                    </h3>
                    <p className="text-2xl font-bold text-purple-600">-</p>
                  </div>
                </div>
                <div className="mt-6">
                  <Link
                    to="/admin/theaters"
                    className="text-blue-600 hover:text-blue-800 font-medium"
                  >
                    View All Theaters →
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
