import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchShowtimeById,
  fetchAvailableSeats,
  clearError,
  clearAvailableSeats,
} from "../store/slices/movieSlice";
import {
  setSelectedSeats,
  addSelectedSeat,
  removeSelectedSeat,
} from "../store/slices/bookingSlice";

export default function SeatSelection() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentShowtime, availableSeats, loading, error } = useSelector(
    (state) => state.movies
  );
  const { selectedSeats } = useSelector((state) => state.bookings);
  const [seatLayout, setSeatLayout] = useState(null);

  useEffect(() => {
    dispatch(fetchShowtimeById(id));
    dispatch(fetchAvailableSeats(id));
    return () => {
      dispatch(clearError());
      dispatch(clearAvailableSeats());
      // Don't clear selected seats here - they should persist for booking confirmation
    };
  }, [dispatch, id]);

  useEffect(() => {
    if (availableSeats) {
      setSeatLayout(availableSeats.seatLayout);
    }
  }, [availableSeats]);

  const handleSeatClick = (seatNumber) => {
    const isBooked = availableSeats.bookedSeats.some(
      (seat) => seat.seat_number === seatNumber
    );
    const isSelected = selectedSeats.some(
      (seat) => seat.seat_number === seatNumber
    );

    if (isBooked) return;

    if (isSelected) {
      dispatch(removeSelectedSeat(seatNumber));
    } else {
      dispatch(
        addSelectedSeat({
          seat_number: seatNumber,
          price: currentShowtime?.price || 0,
        })
      );
    }
  };

  const getSeatStatus = (seatNumber) => {
    const isBooked = availableSeats?.bookedSeats.some(
      (seat) => seat.seat_number === seatNumber
    );
    const isSelected = selectedSeats.some(
      (seat) => seat.seat_number === seatNumber
    );

    if (isBooked) return "booked";
    if (isSelected) return "selected";
    return "available";
  };

  const getTotalPrice = () => {
    return selectedSeats.reduce(
      (total, seat) => total + parseFloat(seat.price),
      0
    );
  };

  const handleProceedToPayment = () => {
    if (selectedSeats.length === 0) {
      alert("Please select at least one seat");
      return;
    }
    navigate("/booking/confirmation", { state: { showtimeId: id } });
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
      </div>
    );
  }

  if (!currentShowtime || !seatLayout) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Showtime not found
          </h2>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Movie Info */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-1/3">
              <h1 className="text-2xl font-bold text-gray-800 mb-2">
                {currentShowtime.movie_title}
              </h1>
              <p className="text-gray-600 mb-4">
                {currentShowtime.duration} minutes
              </p>
            </div>

            <div className="md:w-1/3">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Theater
              </h3>
              <p className="text-gray-600">{currentShowtime.theater_name}</p>
              <p className="text-gray-600 text-sm">
                {currentShowtime.theater_address}
              </p>
            </div>

            <div className="md:w-1/3">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Show Details
              </h3>
              <p className="text-gray-600">
                Screen {currentShowtime.screen_number}
              </p>
              <p className="text-gray-600">
                {new Date(currentShowtime.show_date).toLocaleDateString(
                  "en-US",
                  {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  }
                )}
              </p>
              <p className="text-gray-600">
                {new Date(
                  `2000-01-01T${currentShowtime.show_time}`
                ).toLocaleTimeString("en-US", {
                  hour: "numeric",
                  minute: "2-digit",
                  hour12: true,
                })}
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Seat Layout */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-6">
                Select Seats
              </h2>

              {/* Screen */}
              <div className="text-center mb-8">
                <div className="bg-gray-800 text-white py-2 px-8 rounded-lg inline-block">
                  SCREEN
                </div>
              </div>

              {/* Seat Legend */}
              <div className="flex justify-center gap-6 mb-6">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-gray-200 border border-gray-400 rounded"></div>
                  <span className="text-sm text-gray-600">Available</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-blue-500 border border-blue-500 rounded"></div>
                  <span className="text-sm text-gray-600">Selected</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-red-500 border border-red-500 rounded"></div>
                  <span className="text-sm text-gray-600">Booked</span>
                </div>
              </div>

              {/* Seats Grid */}
              <div className="flex justify-center">
                <div className="grid grid-cols-10 gap-2">
                  {seatLayout.rows?.map((row, rowIndex) =>
                    row.seats?.map((seat, seatIndex) => (
                      <button
                        key={`${rowIndex}-${seatIndex}`}
                        onClick={() => handleSeatClick(seat.seat_number)}
                        disabled={getSeatStatus(seat.seat_number) === "booked"}
                        className={`w-8 h-8 rounded border text-xs font-medium ${
                          getSeatStatus(seat.seat_number) === "booked"
                            ? "bg-red-500 border-red-500 text-white cursor-not-allowed"
                            : getSeatStatus(seat.seat_number) === "selected"
                            ? "bg-blue-500 border-blue-500 text-white"
                            : "bg-gray-200 border-gray-400 text-gray-700 hover:bg-gray-300"
                        }`}
                      >
                        {seat.seat_number}
                      </button>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Booking Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
              <h3 className="text-lg font-bold text-gray-800 mb-4">
                Booking Summary
              </h3>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Movie:</span>
                  <span className="font-medium">
                    {currentShowtime.movie_title}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Theater:</span>
                  <span className="font-medium">
                    {currentShowtime.theater_name}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Date & Time:</span>
                  <span className="font-medium text-sm">
                    {new Date(currentShowtime.show_date).toLocaleDateString(
                      "en-US",
                      {
                        month: "short",
                        day: "numeric",
                      }
                    )}{" "}
                    at{" "}
                    {new Date(
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
                <h4 className="font-semibold text-gray-800 mb-2">
                  Selected Seats:
                </h4>
                {selectedSeats.length > 0 ? (
                  <div className="space-y-1">
                    {selectedSeats.map((seat) => (
                      <div
                        key={seat.seat_number}
                        className="flex justify-between text-sm"
                      >
                        <span>Seat {seat.seat_number}</span>
                        <span>${seat.price}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-sm">No seats selected</p>
                )}
              </div>

              <div className="border-t pt-4 mb-6">
                <div className="flex justify-between font-bold text-lg">
                  <span>Total:</span>
                  <span>${getTotalPrice().toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={handleProceedToPayment}
                disabled={selectedSeats.length === 0}
                className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
              >
                Proceed to Payment
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
