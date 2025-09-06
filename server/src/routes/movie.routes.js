import { Router } from "express";
import { body } from "express-validator";
import {
  getMovies,
  getMovieById,
  getGenres,
  createMovie,
  updateMovie,
  deleteMovie,
  getAllMovies,
} from "../controllers/movie.controller.js";
import { requireAuth, requireAdmin } from "../middlewares/auth.js";

const r = Router();

// Public routes
r.get("/", getMovies);
r.get("/genres", getGenres);
r.get("/:id", getMovieById);

// Admin routes
r.get("/admin/all", requireAuth, requireAdmin, getAllMovies);

// Protected routes (admin only for CRUD operations)
r.post(
  "/",
  requireAuth,
  requireAdmin,
  [
    body("title").notEmpty().withMessage("Title is required"),
    body("description").notEmpty().withMessage("Description is required"),
    body("duration")
      .isInt({ min: 1 })
      .withMessage("Duration must be a positive integer"),
    body("genre").notEmpty().withMessage("Genre is required"),
    body("rating").notEmpty().withMessage("Rating is required"),
    body("release_date")
      .isISO8601()
      .withMessage("Valid release date is required"),
  ],
  createMovie
);

r.put(
  "/:id",
  requireAuth,
  requireAdmin,
  [
    body("title").optional().notEmpty().withMessage("Title cannot be empty"),
    body("description")
      .optional()
      .notEmpty()
      .withMessage("Description cannot be empty"),
    body("duration")
      .optional()
      .isInt({ min: 1 })
      .withMessage("Duration must be a positive integer"),
    body("genre").optional().notEmpty().withMessage("Genre cannot be empty"),
    body("rating").optional().notEmpty().withMessage("Rating cannot be empty"),
    body("release_date")
      .optional()
      .isISO8601()
      .withMessage("Valid release date is required"),
  ],
  updateMovie
);

r.delete("/:id", requireAuth, requireAdmin, deleteMovie);

export default r;
