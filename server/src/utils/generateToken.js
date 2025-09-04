import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
export const signToken = (user) => jwt.sign({ id: user.id, email: user.email, role: user.role }, process.env.JWT_SECRET, { expiresIn: '7d' });