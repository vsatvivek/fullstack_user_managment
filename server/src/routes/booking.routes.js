import { Router } from "express";
import { body } from "express-validator";
import {
  createBooking,
  getUserBookings,
  getBookingById,
  getBookingByReference,
  cancelBooking,
  getAllBookings,
} from "../controllers/booking.controller.js";
import { requireAuth } from "../middlewares/auth.js";

const r = Router();

// All booking routes require authentication
r.use(requireAuth);

// User booking routes
r.post(
  "/",
  [
    body("showtime_id")
      .isInt({ min: 1 })
      .withMessage("Valid showtime ID is required"),
    body("seats")
      .isArray({ min: 1 })
      .withMessage("At least one seat is required"),
    body("seats.*.seat_number")
      .notEmpty()
      .withMessage("Seat number is required"),
    body("seats.*.price")
      .isFloat({ min: 0 })
      .withMessage("Seat price must be a positive number"),
  ],
  createBooking
);

r.get("/my-bookings", getUserBookings);
r.get("/:id", getBookingById);
r.get("/reference/:reference", getBookingByReference);
r.put("/:id/cancel", cancelBooking);

// Admin routes
r.get("/admin/all", getAllBookings);

export default r;
