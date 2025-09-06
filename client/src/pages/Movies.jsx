import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  fetchMovies,
  fetchGenres,
  clearError,
} from "../store/slices/movieSlice";

export default function Movies() {
  const dispatch = useDispatch();
  const { movies, genres, loading, error } = useSelector(
    (state) => state.movies
  );
  const [filters, setFilters] = useState({
    genre: "",
    search: "",
    page: 1,
  });

  useEffect(() => {
    dispatch(fetchMovies(filters));
    dispatch(fetchGenres());
  }, [dispatch, filters]);

  useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  const handleSearch = (e) => {
    e.preventDefault();
    setFilters((prev) => ({ ...prev, search: e.target.search.value, page: 1 }));
  };

  const handleGenreFilter = (genre) => {
    setFilters((prev) => ({ ...prev, genre, page: 1 }));
  };

  const handlePageChange = (newPage) => {
    setFilters((prev) => ({ ...prev, page: newPage }));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Now Showing</h1>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <form onSubmit={handleSearch} className="flex-1">
            <div className="relative">
              <input
                type="text"
                name="search"
                placeholder="Search movies..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                type="submit"
                className="absolute right-2 top-2 px-4 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Search
              </button>
            </div>
          </form>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => handleGenreFilter("")}
              className={`px-4 py-2 rounded-lg ${
                filters.genre === ""
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              All
            </button>
            {genres.map((genre) => (
              <button
                key={genre}
                onClick={() => handleGenreFilter(genre)}
                className={`px-4 py-2 rounded-lg ${
                  filters.genre === genre
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {genre}
              </button>
            ))}
          </div>
        </div>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}

      {/* Movies Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div className="aspect-w-2 aspect-h-3">
              {movie.poster_url ? (
                <img
                  src={movie.poster_url}
                  alt={movie.title}
                  className="w-full h-64 object-cover"
                />
              ) : (
                <div className="w-full h-64 bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-500">No Image</span>
                </div>
              )}
            </div>

            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
                {movie.title}
              </h3>

              <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">
                  {movie.rating}
                </span>
                <span>{movie.duration} min</span>
              </div>

              <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                {movie.description}
              </p>

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">{movie.genre}</span>
                <Link
                  to={`/movies/${movie.id}`}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {movies.length === 0 && !loading && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No movies found</p>
        </div>
      )}

      {/* Pagination */}
      <div className="flex justify-center mt-8">
        <div className="flex space-x-2">
          <button
            onClick={() => handlePageChange(filters.page - 1)}
            disabled={filters.page === 1}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300"
          >
            Previous
          </button>

          <span className="px-4 py-2 bg-blue-500 text-white rounded-lg">
            {filters.page}
          </span>

          <button
            onClick={() => handlePageChange(filters.page + 1)}
            disabled={movies.length < 20}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
