import { Router } from "express";
import { body } from "express-validator";
import {
  getScreensByTheater,
  getScreenById,
  createScreen,
  updateScreen,
  deleteScreen,
} from "../controllers/screen.controller.js";
import { requireAuth, requireAdmin } from "../middlewares/auth.js";

const r = Router();

// Public routes
r.get("/theater/:theaterId", getScreensByTheater);
r.get("/:id", getScreenById);

// Protected routes (admin only for CRUD operations)
r.post(
  "/",
  requireAuth,
  requireAdmin,
  [
    body("theater_id")
      .isInt({ min: 1 })
      .withMessage("Valid theater ID is required"),
    body("screen_number")
      .isInt({ min: 1 })
      .withMessage("Screen number must be a positive integer"),
    body("screen_name").notEmpty().withMessage("Screen name is required"),
    body("total_seats")
      .isInt({ min: 1 })
      .withMessage("Total seats must be a positive integer"),
    body("seat_layout")
      .isObject()
      .withMessage("Seat layout must be a valid object"),
  ],
  createScreen
);

r.put(
  "/:id",
  requireAuth,
  requireAdmin,
  [
    body("screen_number")
      .optional()
      .isInt({ min: 1 })
      .withMessage("Screen number must be a positive integer"),
    body("screen_name")
      .optional()
      .notEmpty()
      .withMessage("Screen name cannot be empty"),
    body("total_seats")
      .optional()
      .isInt({ min: 1 })
      .withMessage("Total seats must be a positive integer"),
    body("seat_layout")
      .optional()
      .isObject()
      .withMessage("Seat layout must be a valid object"),
  ],
  updateScreen
);

r.delete("/:id", requireAuth, requireAdmin, deleteScreen);

export default r;
