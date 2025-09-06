import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUserBookings,
  cancelBooking,
  clearError,
  clearSuccess,
} from "../store/slices/bookingSlice";

export default function MyBookings() {
  const dispatch = useDispatch();
  const { bookings, loading, error, success } = useSelector(
    (state) => state.bookings
  );
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(fetchUserBookings({ page: currentPage }));
    return () => {
      dispatch(clearError());
      dispatch(clearSuccess());
    };
  }, [dispatch, currentPage]);

  const handleCancelBooking = (bookingId) => {
    if (window.confirm("Are you sure you want to cancel this booking?")) {
      dispatch(cancelBooking(bookingId));
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatTime = (time) => {
    return new Date(`2000-01-01T${time}`).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      case "completed":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const canCancelBooking = (booking) => {
    const showDate = new Date(booking.show_date);
    const showTime = new Date(`2000-01-01T${booking.show_time}`);
    const now = new Date();
    const showDateTime = new Date(showDate);
    showDateTime.setHours(showTime.getHours(), showTime.getMinutes());

    return booking.booking_status === "confirmed" && showDateTime > now;
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
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">My Bookings</h1>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
            {success}
          </div>
        )}

        {bookings.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-12 h-12 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 6v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-6V7a2 2 0 00-2-2H5z"
                />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              No bookings found
            </h2>
            <p className="text-gray-600 mb-6">
              You haven't made any movie bookings yet.
            </p>
            <a
              href="/movies"
              className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
            >
              Browse Movies
            </a>
          </div>
        ) : (
          <div className="space-y-6">
            {bookings.map((booking) => (
              <div
                key={booking.id}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex flex-col lg:flex-row gap-6">
                    {/* Movie Poster */}
                    <div className="lg:w-1/4">
                      {booking.poster_url ? (
                        <img
                          src={booking.poster_url}
                          alt={booking.movie_title}
                          className="w-full h-48 object-cover rounded-lg"
                        />
                      ) : (
                        <div className="w-full h-48 bg-gray-200 rounded-lg flex items-center justify-center">
                          <span className="text-gray-500">No Image</span>
                        </div>
                      )}
                    </div>

                    {/* Booking Details */}
                    <div className="lg:w-3/4">
                      <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                        <div>
                          <h2 className="text-xl font-bold text-gray-800 mb-2">
                            {booking.movie_title}
                          </h2>
                          <p className="text-gray-600 mb-2">
                            {booking.theater_name}
                          </p>
                          <p className="text-gray-600 text-sm">
                            {booking.theater_address}
                          </p>
                        </div>

                        <div className="mt-4 md:mt-0">
                          <span
                            className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                              booking.booking_status
                            )}`}
                          >
                            {booking.booking_status.charAt(0).toUpperCase() +
                              booking.booking_status.slice(1)}
                          </span>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <h3 className="font-semibold text-gray-800 mb-2">
                            Show Details
                          </h3>
                          <div className="space-y-1 text-sm text-gray-600">
                            <p>Screen: {booking.screen_number}</p>
                            <p>Date: {formatDate(booking.show_date)}</p>
                            <p>Time: {formatTime(booking.show_time)}</p>
                          </div>
                        </div>

                        <div>
                          <h3 className="font-semibold text-gray-800 mb-2">
                            Booking Info
                          </h3>
                          <div className="space-y-1 text-sm text-gray-600">
                            <p>Reference: {booking.booking_reference}</p>
                            <p>
                              Booked on:{" "}
                              {new Date(
                                booking.booking_date
                              ).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                                hour: "numeric",
                                minute: "2-digit",
                              })}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="border-t pt-4">
                        <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                          <div className="mb-4 md:mb-0">
                            <h3 className="font-semibold text-gray-800 mb-2">
                              Seats:
                            </h3>
                            <div className="flex flex-wrap gap-2">
                              {booking.seats.map((seat) => (
                                <span
                                  key={seat.seat_number}
                                  className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                                >
                                  {seat.seat_number}
                                </span>
                              ))}
                            </div>
                          </div>

                          <div className="flex items-center gap-4">
                            <div className="text-right">
                              <p className="text-sm text-gray-600">
                                Total Amount
                              </p>
                              <p className="text-xl font-bold text-gray-800">
                                ${booking.total_amount}
                              </p>
                            </div>

                            {canCancelBooking(booking) && (
                              <button
                                onClick={() => handleCancelBooking(booking.id)}
                                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
                              >
                                Cancel Booking
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {bookings.length > 0 && (
          <div className="flex justify-center mt-8">
            <div className="flex space-x-2">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300"
              >
                Previous
              </button>

              <span className="px-4 py-2 bg-blue-500 text-white rounded-lg">
                {currentPage}
              </span>

              <button
                onClick={() => setCurrentPage((prev) => prev + 1)}
                disabled={bookings.length < 20}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
