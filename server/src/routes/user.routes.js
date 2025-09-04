import { Router } from "express";
import { requireAuth } from "../middlewares/auth.js";
import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  exportUsers,
  getUserStats,
} from "../controllers/user.controller.js";

const r = Router();

r.get("/", requireAuth, getUsers);
r.post("/", requireAuth, createUser);
r.put("/:id", requireAuth, updateUser);
r.delete("/:id", requireAuth, deleteUser);
r.get("/export", requireAuth, exportUsers);

// ✅ New stats endpoint
r.get("/stats", requireAuth, getUserStats);

export default r;
