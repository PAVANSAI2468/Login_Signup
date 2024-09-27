import express from 'express';
import nodemailer from 'nodemailer';
import jwt from "jsonwebtoken";
import User from "../Models/User.js";
import dotenv from 'dotenv';
dotenv.config();

const router = express.Router();

router.post('/forgotpassword', async (req, res) => {
  const { email } = req.body;
  
  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }
  
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  const resettoken = jwt.sign({ email }, process.env.SECRET_KEY, { expiresIn: '1h' });

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Reset Password",
    text: `https://login-signup-frontend-i0ta.onrender.com/resetpassword/${resettoken}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Reset password email sent' });
  } catch (error) {
    res.status(500).json({ message: 'Error sending reset email', error });
  }
});

export default router;
