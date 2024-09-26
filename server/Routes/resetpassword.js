import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import User from "../Models/User.js";

dotenv.config();
const router = express.Router();

router.post('/resetpassword', async (req, res) => {
    const { token, password } = req.body;
  
    if (!token || !password) {
      return res.status(400).json({ message: 'Token and password are required' });
    }
  
    try {
      // Verify token
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      const user = await User.findOne({ email: decoded.email });
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Hash the new password (using bcrypt)
      user.password = await bcrypt.hash(password, 10);
      await user.save();
  
      res.status(200).json({ message: 'Password reset successfully' });
    } catch (error) {
      console.error('Invalid or expired token:', error);
      return res.status(400).json({ message: 'Invalid or expired token' });
    }
  });
  
export default router;
