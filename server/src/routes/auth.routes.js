import { Router } from 'express';
import { body } from 'express-validator';
import {
  register,
  login,
  me,
  forgotPassword,
  resetPassword,
  setPassword,
} from '../controllers/auth.controller.js';
import { requireAuth } from '../middlewares/auth.js';

const r = Router();

// Registration now only needs name + email
r.post('/register', body('name').notEmpty(), body('email').isEmail(), register);

r.post('/login', login);
r.get('/me', requireAuth, me);
r.post('/forgot', body('email').isEmail(), forgotPassword);
r.post('/reset', body('email').isEmail(), body('password').isLength({ min: 6 }), resetPassword);

// New route for initial password setup
r.post('/set-password', body('token').notEmpty(), body('password').isLength({ min: 6 }), setPassword);

export default r;
