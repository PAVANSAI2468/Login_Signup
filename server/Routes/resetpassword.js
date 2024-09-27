import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../Models/User.js";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();

router.post('/resetpassword/:token', async (req, res) => {
    const { password } = req.body;
    const { token } = req.params;
  
    if (!token || !password) {
      return res.status(400).json({ message: 'Token and password are required' });
    }
  
    try {
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      const user = await User.findOne({ email: decoded.email });
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      user.password = await bcrypt.hash(password, 10);
      await user.save();
  
      res.status(200).json({ message: 'Password reset successfully' });
    } catch (error) {
      res.status(400).json({ message: 'Invalid or expired token' });
    }
});

export default router;
