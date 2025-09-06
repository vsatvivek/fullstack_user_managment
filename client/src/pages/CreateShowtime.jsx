import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CreateShowtime = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, token } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    movie_id: "",
    screen_id: "",
    show_date: "",
    show_time: "",
    price: "",
  });

  const [movies, setMovies] = useState([]);
  const [theaters, setTheaters] = useState([]);
  const [screens, setScreens] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dataLoading, setDataLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchInitialData();
  }, []);

  useEffect(() => {
    if (formData.theater_id) {
      fetchScreens(formData.theater_id);
    }
  }, [formData.theater_id]);

  const fetchInitialData = async () => {
    try {
      setDataLoading(true);
      const [moviesRes, theatersRes] = await Promise.all([
        axios.get("http://localhost:5000/api/movies"),
        axios.get("http://localhost:5000/api/theaters"),
      ]);

      setMovies(moviesRes.data.movies);
      setTheaters(theatersRes.data.theaters);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch data");
    } finally {
      setDataLoading(false);
    }
  };

  const fetchScreens = async (theaterId) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/screens/theater/${theaterId}`
      );
      setScreens(response.data.screens);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch screens");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await axios.post("http://localhost:5000/api/showtimes", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      navigate("/admin/showtimes");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create showtime");
    } finally {
      setLoading(false);
    }
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
        </div>
      </div>
    );
  }

  if (dataLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading data...</p>
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
                Create New Showtime
              </h1>
              <p className="text-gray-600">Add a new showtime to the system</p>
            </div>
            <button
              onClick={() => navigate("/admin/showtimes")}
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              ← Back to Showtimes
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white rounded-lg shadow">
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Error Message */}
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                {error}
              </div>
            )}

            {/* Movie Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Movie *
              </label>
              <select
                name="movie_id"
                value={formData.movie_id}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Movie</option>
                {movies.map((movie) => (
                  <option key={movie.id} value={movie.id}>
                    {movie.title} ({movie.genre}, {movie.duration}min)
                  </option>
                ))}
              </select>
            </div>

            {/* Theater Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Theater *
              </label>
              <select
                name="theater_id"
                value={formData.theater_id}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Theater</option>
                {theaters.map((theater) => (
                  <option key={theater.id} value={theater.id}>
                    {theater.name} - {theater.city}
                  </option>
                ))}
              </select>
            </div>

            {/* Screen Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Screen *
              </label>
              <select
                name="screen_id"
                value={formData.screen_id}
                onChange={handleChange}
                required
                disabled={!formData.theater_id}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
              >
                <option value="">Select Screen</option>
                {screens.map((screen) => (
                  <option key={screen.id} value={screen.id}>
                    {screen.screen_name || `Screen ${screen.screen_number}`} (
                    {screen.total_seats} seats)
                  </option>
                ))}
              </select>
              {!formData.theater_id && (
                <p className="mt-1 text-sm text-gray-500">
                  Please select a theater first
                </p>
              )}
            </div>

            {/* Show Date and Time */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Show Date *
                </label>
                <input
                  type="date"
                  name="show_date"
                  value={formData.show_date}
                  onChange={handleChange}
                  required
                  min={new Date().toISOString().split("T")[0]}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Show Time *
                </label>
                <input
                  type="time"
                  name="show_time"
                  value={formData.show_time}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Price */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Ticket Price ($) *
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
                min="0"
                step="0.01"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="15.00"
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => navigate("/admin/showtimes")}
                className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Creating..." : "Create Showtime"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateShowtime;
