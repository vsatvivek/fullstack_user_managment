import { Router } from "express";
import { body } from "express-validator";
import {
  getTheaters,
  getTheaterById,
  createTheater,
  updateTheater,
  deleteTheater,
} from "../controllers/theater.controller.js";
import { requireAuth, requireAdmin } from "../middlewares/auth.js";

const r = Router();

// Public routes
r.get("/", getTheaters);
r.get("/:id", getTheaterById);

// Protected routes (admin only for CRUD operations)
r.post(
  "/",
  requireAuth,
  requireAdmin,
  [
    body("name").notEmpty().withMessage("Theater name is required"),
    body("address").notEmpty().withMessage("Address is required"),
    body("city").notEmpty().withMessage("City is required"),
    body("total_screens")
      .isInt({ min: 1 })
      .withMessage("Total screens must be a positive integer"),
  ],
  createTheater
);

r.put(
  "/:id",
  requireAuth,
  requireAdmin,
  [
    body("name")
      .optional()
      .notEmpty()
      .withMessage("Theater name cannot be empty"),
    body("address")
      .optional()
      .notEmpty()
      .withMessage("Address cannot be empty"),
    body("city").optional().notEmpty().withMessage("City cannot be empty"),
    body("total_screens")
      .optional()
      .isInt({ min: 1 })
      .withMessage("Total screens must be a positive integer"),
  ],
  updateTheater
);

r.delete("/:id", requireAuth, requireAdmin, deleteTheater);

export default r;
