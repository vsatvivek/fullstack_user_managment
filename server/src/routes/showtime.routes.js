import { Router } from "express";
import { body } from "express-validator";
import {
  getShowtimesByMovie,
  getShowtimeById,
  getAvailableSeats,
  createShowtime,
  updateShowtime,
  deleteShowtime,
} from "../controllers/showtime.controller.js";
import { requireAuth } from "../middlewares/auth.js";

const r = Router();

// Public routes
r.get("/movie/:movieId", getShowtimesByMovie);
r.get("/:id", getShowtimeById);
r.get("/:id/seats", getAvailableSeats);

// Protected routes (admin only for CRUD operations)
r.post(
  "/",
  requireAuth,
  [
    body("movie_id")
      .isInt({ min: 1 })
      .withMessage("Valid movie ID is required"),
    body("screen_id")
      .isInt({ min: 1 })
      .withMessage("Valid screen ID is required"),
    body("show_date").isISO8601().withMessage("Valid show date is required"),
    body("show_time")
      .matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)
      .withMessage("Valid show time is required"),
    body("price")
      .isFloat({ min: 0 })
      .withMessage("Price must be a positive number"),
  ],
  createShowtime
);

r.put(
  "/:id",
  requireAuth,
  [
    body("movie_id")
      .optional()
      .isInt({ min: 1 })
      .withMessage("Valid movie ID is required"),
    body("screen_id")
      .optional()
      .isInt({ min: 1 })
      .withMessage("Valid screen ID is required"),
    body("show_date")
      .optional()
      .isISO8601()
      .withMessage("Valid show date is required"),
    body("show_time")
      .optional()
      .matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)
      .withMessage("Valid show time is required"),
    body("price")
      .optional()
      .isFloat({ min: 0 })
      .withMessage("Price must be a positive number"),
  ],
  updateShowtime
);

r.delete("/:id", requireAuth, deleteShowtime);

export default r;
