import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchMovieById,
  fetchShowtimes,
  clearError,
  clearShowtimes,
} from "../store/slices/movieSlice";

export default function MovieDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { currentMovie, showtimes, loading, error } = useSelector(
    (state) => state.movies
  );
  const [selectedDate, setSelectedDate] = useState("");

  useEffect(() => {
    dispatch(fetchMovieById(id));
    return () => {
      dispatch(clearError());
    };
  }, [dispatch, id]);

  useEffect(() => {
    if (currentMovie && selectedDate) {
      dispatch(fetchShowtimes({ movieId: id, date: selectedDate }));
    }
    return () => {
      dispatch(clearShowtimes());
    };
  }, [dispatch, id, selectedDate]);

  const getAvailableDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dates.push(date.toISOString().split("T")[0]);
    }
    return dates;
  };

  const formatTime = (time) => {
    return new Date(`2000-01-01T${time}`).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
        <Link
          to="/movies"
          className="text-blue-500 hover:text-blue-600 mt-4 inline-block"
        >
          ← Back to Movies
        </Link>
      </div>
    );
  }

  if (!currentMovie) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Movie not found
          </h2>
          <Link to="/movies" className="text-blue-500 hover:text-blue-600">
            ← Back to Movies
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link
        to="/movies"
        className="text-blue-500 hover:text-blue-600 mb-6 inline-block"
      >
        ← Back to Movies
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Movie Info */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {currentMovie.poster_url ? (
              <img
                src={currentMovie.poster_url}
                alt={currentMovie.title}
                className="w-full h-96 object-cover"
              />
            ) : (
              <div className="w-full h-96 bg-gray-200 flex items-center justify-center">
                <span className="text-gray-500 text-lg">
                  No Image Available
                </span>
              </div>
            )}

            <div className="p-6">
              <h1 className="text-2xl font-bold text-gray-800 mb-2">
                {currentMovie.title}
              </h1>

              <div className="flex items-center gap-4 mb-4">
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                  {currentMovie.rating}
                </span>
                <span className="text-gray-600">
                  {currentMovie.duration} minutes
                </span>
                <span className="text-gray-600">{currentMovie.genre}</span>
              </div>

              <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Release Date
                </h3>
                <p className="text-gray-600">
                  {new Date(currentMovie.release_date).toLocaleDateString(
                    "en-US",
                    {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    }
                  )}
                </p>
              </div>

              {currentMovie.trailer_url && (
                <div className="mb-4">
                  <a
                    href={currentMovie.trailer_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                  >
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M8 5v10l8-5-8-5z" />
                    </svg>
                    Watch Trailer
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Showtimes */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Showtimes</h2>

            {/* Date Selection */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                Select Date
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {getAvailableDates().map((date) => (
                  <button
                    key={date}
                    onClick={() => setSelectedDate(date)}
                    className={`p-3 rounded-lg border text-center ${
                      selectedDate === date
                        ? "bg-blue-500 text-white border-blue-500"
                        : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    <div className="text-sm font-medium">
                      {new Date(date).toLocaleDateString("en-US", {
                        weekday: "short",
                      })}
                    </div>
                    <div className="text-xs">
                      {new Date(date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Showtimes List */}
            {selectedDate && (
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  {formatDate(selectedDate)}
                </h3>

                {showtimes.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {showtimes.map((showtime) => (
                      <div
                        key={showtime.id}
                        className="border border-gray-200 rounded-lg p-4"
                      >
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h4 className="font-semibold text-gray-800">
                              {showtime.theater_name}
                            </h4>
                            <p className="text-sm text-gray-600">
                              {showtime.theater_address}
                            </p>
                            <p className="text-sm text-gray-600">
                              Screen {showtime.screen_number}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-lg font-bold text-blue-600">
                              ${showtime.price}
                            </p>
                          </div>
                        </div>

                        <div className="flex justify-between items-center">
                          <span className="text-lg font-medium text-gray-800">
                            {formatTime(showtime.show_time)}
                          </span>
                          <Link
                            to={`/booking/${showtime.id}`}
                            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                          >
                            Book Now
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-500">
                      No showtimes available for this date
                    </p>
                  </div>
                )}
              </div>
            )}

            {!selectedDate && (
              <div className="text-center py-8">
                <p className="text-gray-500">
                  Please select a date to view showtimes
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
