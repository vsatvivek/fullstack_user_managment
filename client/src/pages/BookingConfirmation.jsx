import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  createBooking,
  clearError,
  clearSuccess,
} from "../store/slices/bookingSlice";

export default function BookingConfirmation() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { selectedSeats } = useSelector((state) => state.bookings);
  const { currentShowtime } = useSelector((state) => state.movies);
  const { loading, error, success, currentBooking } = useSelector(
    (state) => state.bookings
  );

  const showtimeId = location.state?.showtimeId;

  useEffect(() => {
    if (!showtimeId || selectedSeats.length === 0) {
      console.log(
        "Redirecting to movies - showtimeId:",
        showtimeId,
        "selectedSeats:",
        selectedSeats
      );
      navigate("/movies");
    }
  }, [showtimeId, selectedSeats, navigate]);

  useEffect(() => {
    return () => {
      dispatch(clearError());
      dispatch(clearSuccess());
    };
  }, [dispatch]);

  const handleConfirmBooking = () => {
    if (selectedSeats.length === 0) {
      alert("Please select seats first");
      return;
    }

    dispatch(
      createBooking({
        showtime_id: showtimeId,
        seats: selectedSeats,
      })
    );
  };

  const getTotalPrice = () => {
    return selectedSeats.reduce(
      (total, seat) => total + parseFloat(seat.price),
      0
    );
  };

  if (success && currentBooking) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <div className="mb-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-green-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h1 className="text-2xl font-bold text-gray-800 mb-2">
                Booking Confirmed!
              </h1>
              <p className="text-gray-600">
                Your movie tickets have been booked successfully.
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6 mb-6 text-left">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Booking Details
              </h2>

              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Booking Reference:</span>
                  <span className="font-medium">
                    {currentBooking.booking_reference}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Movie:</span>
                  <span className="font-medium">
                    {currentBooking.movie_title}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Theater:</span>
                  <span className="font-medium">
                    {currentBooking.theater_name}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Screen:</span>
                  <span className="font-medium">
                    {currentBooking.screen_number}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Date & Time:</span>
                  <span className="font-medium">
                    {new Date(currentBooking.show_date).toLocaleDateString(
                      "en-US",
                      {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      }
                    )}{" "}
                    at{" "}
                    {new Date(
                      `2000-01-01T${currentBooking.show_time}`
                    ).toLocaleTimeString("en-US", {
                      hour: "numeric",
                      minute: "2-digit",
                      hour12: true,
                    })}
                  </span>
                </div>
              </div>

              <div className="border-t pt-4">
                <h3 className="font-semibold text-gray-800 mb-2">Seats:</h3>
                <div className="flex flex-wrap gap-2 mb-4">
                  {currentBooking.seats.map((seat) => (
                    <span
                      key={seat.seat_number}
                      className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                    >
                      {seat.seat_number}
                    </span>
                  ))}
                </div>
                <div className="flex justify-between font-bold text-lg">
                  <span>Total Amount:</span>
                  <span>${currentBooking.total_amount}</span>
                </div>
              </div>
            </div>

            <div className="flex gap-4 justify-center">
              <button
                onClick={() => navigate("/my-bookings")}
                className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
              >
                View My Bookings
              </button>
              <button
                onClick={() => navigate("/movies")}
                className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors"
              >
                Browse More Movies
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!showtimeId || selectedSeats.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            No booking data found
          </h2>
          <button
            onClick={() => navigate("/movies")}
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Browse Movies
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">
            Confirm Your Booking
          </h1>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
              {error}
            </div>
          )}

          <div className="space-y-4 mb-6">
            <div className="flex justify-between">
              <span className="text-gray-600">Movie:</span>
              <span className="font-medium">
                {currentShowtime?.movie_title}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Theater:</span>
              <span className="font-medium">
                {currentShowtime?.theater_name}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Screen:</span>
              <span className="font-medium">
                {currentShowtime?.screen_number}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Date & Time:</span>
              <span className="font-medium">
                {currentShowtime &&
                  new Date(currentShowtime.show_date).toLocaleDateString(
                    "en-US",
                    {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    }
                  )}{" "}
                at{" "}
                {currentShowtime &&
                  new Date(
                    `2000-01-01T${currentShowtime.show_time}`
                  ).toLocaleTimeString("en-US", {
                    hour: "numeric",
                    minute: "2-digit",
                    hour12: true,
                  })}
              </span>
            </div>
          </div>

          <div className="border-t pt-4 mb-6">
            <h3 className="font-semibold text-gray-800 mb-2">
              Selected Seats:
            </h3>
            <div className="flex flex-wrap gap-2 mb-4">
              {selectedSeats.map((seat) => (
                <span
                  key={seat.seat_number}
                  className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                >
                  {seat.seat_number}
                </span>
              ))}
            </div>
            <div className="flex justify-between font-bold text-lg">
              <span>Total Amount:</span>
              <span>${getTotalPrice().toFixed(2)}</span>
            </div>
          </div>

          <div className="flex gap-4">
            <button
              onClick={() => navigate(-1)}
              className="flex-1 bg-gray-500 text-white py-3 rounded-lg hover:bg-gray-600 transition-colors"
            >
              Back to Seat Selection
            </button>
            <button
              onClick={handleConfirmBooking}
              disabled={loading}
              className="flex-1 bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? "Processing..." : "Confirm Booking"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
