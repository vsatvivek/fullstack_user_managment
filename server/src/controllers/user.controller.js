import { validationResult } from "express-validator";
import {
  findAllUsers,
  insertUser,
  modifyUser,
  removeUser,
  exportUsersToCSV,
  countUsersByStatus,
} from "../models/user.model.js";

/**
 * GET /users
 */
export const getUsers = async (req, res, next) => {
  try {
    const { q, sort = "created_at", page = 1, size = 10 } = req.query;
    const offset = (page - 1) * size;
    const users = await findAllUsers({ q, sort, offset, limit: parseInt(size) });
    res.json(users); // expect { rows, count }
  } catch (e) {
    next(e);
  }
};

/**
 * POST /users
 */
export const createUser = async (req, res, next) => {
  try {
    const { name, email, role = "user", status = "pending" } = req.body;
    const user = await insertUser({ name, email, role, status });
    res.status(201).json(user);
  } catch (e) {
    next(e);
  }
};

/**
 * PUT /users/:id
 */
export const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, email, role, status } = req.body;
    const user = await modifyUser(id, { name, email, role, status });
    res.json(user);
  } catch (e) {
    next(e);
  }
};

/**
 * DELETE /users/:id
 */
export const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    await removeUser(id);
    res.json({ message: "User deleted" });
  } catch (e) {
    next(e);
  }
};

/**
 * GET /users/export
 */
export const exportUsers = async (req, res, next) => {
  try {
    const csv = await exportUsersToCSV();
    res.header("Content-Type", "text/csv");
    res.attachment("users.csv");
    res.send(csv);
  } catch (e) {
    next(e);
  }
};


/**
 * GET /users/stats
 * Returns { active: number, pending: number }
 */
export const getUserStats = async (req, res, next) => {
  try {
    const stats = await countUsersByStatus();
    res.json(stats); 
    // Example: { "active": 10, "pending": 4, "inactive": 2 }
  } catch (e) {
    next(e);
  }
};
