import * as bookingModel from "../models/booking.model.js";

export const createBooking = async (req, res, next) => {
  try {
    const { showtime_id, seats } = req.body;
    const user_id = req.user.id;

    if (!showtime_id || !seats || !Array.isArray(seats) || seats.length === 0) {
      return res
        .status(400)
        .json({ message: "Showtime ID and seats are required" });
    }

    const booking = await bookingModel.create({
      user_id,
      showtime_id,
      seats,
    });

    res.status(201).json({ booking });
  } catch (error) {
    next(error);
  }
};

export const getUserBookings = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { page = 1, limit = 20 } = req.query;
    const offset = (page - 1) * limit;

    const bookings = await bookingModel.findByUserId(
      userId,
      parseInt(limit),
      parseInt(offset)
    );
    res.json({ bookings });
  } catch (error) {
    next(error);
  }
};

export const getBookingById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const booking = await bookingModel.findById(id);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    // Check if user owns this booking or is admin
    if (booking.user_id !== req.user.id && req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }

    res.json({ booking });
  } catch (error) {
    next(error);
  }
};

export const getBookingByReference = async (req, res, next) => {
  try {
    const { reference } = req.params;
    const booking = await bookingModel.findByReference(reference);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    // Check if user owns this booking or is admin
    if (booking.user_id !== req.user.id && req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }

    res.json({ booking });
  } catch (error) {
    next(error);
  }
};

export const cancelBooking = async (req, res, next) => {
  try {
    const { id } = req.params;
    const booking = await bookingModel.findById(id);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    // Check if user owns this booking or is admin
    if (booking.user_id !== req.user.id && req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }

    // Check if booking can be cancelled (not already cancelled or completed)
    if (booking.booking_status === "cancelled") {
      return res.status(400).json({ message: "Booking is already cancelled" });
    }

    if (booking.booking_status === "completed") {
      return res
        .status(400)
        .json({ message: "Cannot cancel completed booking" });
    }

    const cancelledBooking = await bookingModel.cancel(id);
    res.json({
      booking: cancelledBooking,
      message: "Booking cancelled successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const getAllBookings = async (req, res, next) => {
  try {
    // Only admin can access all bookings
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }

    const { page = 1, limit = 20, status } = req.query;
    const offset = (page - 1) * limit;

    // This would need to be implemented in the model
    // For now, return empty array
    res.json({ bookings: [] });
  } catch (error) {
    next(error);
  }
};
