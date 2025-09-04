import bcrypt from "bcryptjs";
import crypto from "crypto";
import { validationResult } from "express-validator";
import {
  findByEmail,
  insertUser,
  modifyUser,
} from "../models/user.model.js";
import { signToken } from "../utils/generateToken.js";
import { sendResetEmail } from "../utils/sendMail.js";
import dotenv from "dotenv";
dotenv.config();

/**
 * Register User (No password required at first)
 */
export const register = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ message: errors.array()[0].msg });

    const { name, email } = req.body;

    const exists = await findByEmail(email);
    if (exists) return res.status(400).json({ message: "Email already registered" });

    // Create user without password
    const user = await insertUser({ name, email, role: "user", status: "pending" });

    // Generate token for password setup
    const setToken = crypto.randomBytes(32).toString("hex");
    const expires = new Date(Date.now() + 60 * 60 * 1000);

    await modifyUser(user.id, {
      reset_token: setToken,
      reset_token_expires: expires,
    });

    const setUrl = `${process.env.CLIENT_URL}/set-password?token=${setToken}&email=${encodeURIComponent(
      email
    )}`;

    await sendResetEmail(email, setUrl, true);

    res.json({
      message: "Registration successful. Please check your email to set password.",
    });
  } catch (e) {
    next(e);
  }
};

/**
 * Login User
 */
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await findByEmail(email);
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    if (!user.password)
      return res.status(400).json({ message: "Please set your password first" });

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(400).json({ message: "Invalid credentials" });

    res.json({
      user: { id: user.id, name: user.name, email: user.email, role: user.role },
      token: signToken(user),
    });
  } catch (e) {
    next(e);
  }
};

/**
 * Current user
 */
export const me = async (req, res) => {
  res.json({ user: req.user });
};

/**
 * Forgot Password
 */
export const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await findByEmail(email);
    if (!user) return res.json({ ok: true }); // don't leak user existence

    const resetToken = crypto.randomBytes(32).toString("hex");
    const expires = new Date(Date.now() + 60 * 60 * 1000);

    await modifyUser(user.id, {
      reset_token: resetToken,
      reset_token_expires: expires,
    });

    const resetUrl = `${process.env.CLIENT_URL}/reset-password?token=${resetToken}&email=${encodeURIComponent(
      email
    )}`;

    await sendResetEmail(email, resetUrl, false);

    res.json({ ok: true });
  } catch (e) {
    next(e);
  }
};

/**
 * Reset Password (forgot password flow)
 */
export const resetPassword = async (req, res, next) => {
  try {
    const { email, token, password } = req.body;

    const user = await findByEmail(email);
    if (
      !user ||
      user.reset_token !== token ||
      new Date(user.reset_token_expires) < new Date()
    ) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    const hash = await bcrypt.hash(password, 10);
    await modifyUser(user.id, {
      password: hash,
      reset_token: null,
      reset_token_expires: null,
    });

    res.json({ ok: true });
  } catch (e) {
    next(e);
  }
};

/**
 * Set Password (for first-time registration)
 */
export const setPassword = async (req, res, next) => {
  try {
    const { email, token, password } = req.body;

    const user = await findByEmail(email);
    if (
      !user ||
      user.reset_token !== token ||
      new Date(user.reset_token_expires) < new Date()
    ) {
      return res.status(400).json({ message: "Invalid or expired link" });
    }

    const hash = await bcrypt.hash(password, 10);
    await modifyUser(user.id, {
      password: hash,
      reset_token: null,
      reset_token_expires: null,
      status: "active",
    });

    res.json({ message: "Password set successfully, you can now log in." });
  } catch (e) {
    next(e);
  }
};
