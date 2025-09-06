import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";

const ShowtimeManagement = () => {
  const dispatch = useDispatch();
  const { user, token } = useSelector((state) => state.auth);
  const [showtimes, setShowtimes] = useState([]);
  const [movies, setMovies] = useState([]);
  const [theaters, setTheaters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterMovie, setFilterMovie] = useState("");
  const [filterTheater, setFilterTheater] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [moviesRes, theatersRes] = await Promise.all([
        axios.get("http://localhost:5000/api/movies"),
        axios.get("http://localhost:5000/api/theaters"),
      ]);

      setMovies(moviesRes.data.movies);
      setTheaters(theatersRes.data.theaters);

      // Fetch showtimes for each movie
      const showtimePromises = moviesRes.data.movies.map((movie) =>
        axios.get(`http://localhost:5000/api/showtimes/movie/${movie.id}`)
      );

      const showtimeResponses = await Promise.all(showtimePromises);
      const allShowtimes = showtimeResponses.flatMap(
        (res) => res.data.showtimes
      );
      setShowtimes(allShowtimes);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteShowtime = async (showtimeId) => {
    if (!window.confirm("Are you sure you want to delete this showtime?")) {
      return;
    }

    try {
      await axios.delete(`http://localhost:5000/api/showtimes/${showtimeId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setShowtimes(showtimes.filter((showtime) => showtime.id !== showtimeId));
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete showtime");
    }
  };

  const getMovieTitle = (movieId) => {
    const movie = movies.find((m) => m.id === movieId);
    return movie ? movie.title : "Unknown Movie";
  };

  const getTheaterName = (theaterId) => {
    const theater = theaters.find((t) => t.id === theaterId);
    return theater ? theater.name : "Unknown Theater";
  };

  const filteredShowtimes = showtimes.filter((showtime) => {
    const matchesMovie =
      !filterMovie || showtime.movie_id === parseInt(filterMovie);
    const matchesTheater =
      !filterTheater || showtime.theater_id === parseInt(filterTheater);
    return matchesMovie && matchesTheater;
  });

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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading showtimes...</p>
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
                Showtimes Management
              </h1>
              <p className="text-gray-600">
                Manage all showtimes in the system
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                to="/admin"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                Admin Dashboard
              </Link>
              <Link
                to="/admin/showtimes/create"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
              >
                Add New Showtime
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Filters */}
        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Filter by Movie
              </label>
              <select
                value={filterMovie}
                onChange={(e) => setFilterMovie(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Movies</option>
                {movies.map((movie) => (
                  <option key={movie.id} value={movie.id}>
                    {movie.title}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Filter by Theater
              </label>
              <select
                value={filterTheater}
                onChange={(e) => setFilterTheater(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Theaters</option>
                {theaters.map((theater) => (
                  <option key={theater.id} value={theater.id}>
                    {theater.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        {/* Showtimes Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Movie
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Theater
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Screen
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Time
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredShowtimes.map((showtime) => (
                <tr key={showtime.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {getMovieTitle(showtime.movie_id)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {getTheaterName(showtime.theater_id)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {showtime.screen_name || `Screen ${showtime.screen_number}`}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(showtime.show_date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {showtime.show_time}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    ${showtime.price}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        showtime.is_active
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {showtime.is_active ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <Link
                        to={`/admin/showtimes/${showtime.id}/edit`}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDeleteShowtime(showtime.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredShowtimes.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No showtimes found</p>
              <Link
                to="/admin/showtimes/create"
                className="mt-4 inline-block bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition-colors"
              >
                Add Your First Showtime
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShowtimeManagement;
