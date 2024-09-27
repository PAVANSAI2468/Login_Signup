import express from 'express';
import mongoose from 'mongoose';
import signupRoute from './Routes/signup.js'; // Use .js extension
import loginRoute from "./Routes/login.js"
import ForgotPasswordRoute from './Routes/forgotpassword.js';
import ResetPasswordRoute from './Routes/resetpassword.js';

import dotenv from "dotenv";
import cors from "cors";
dotenv.config()

const app = express();
app.use(cors({
  origin: 'https://login-signup-frontend-i0ta.onrender.com',  // Your frontend's URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,  // If using credentials like cookies or authorization headers
}));
// Middleware to parse JSON request bodies
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('MongoDB connected'))
.catch((err) => console.error('MongoDB connection error:', err));

// Use the signup route
app.use('/auth', signupRoute);
app.use("/auth",loginRoute);
app.use("/auth",ForgotPasswordRoute);
app.use("/auth",ResetPasswordRoute);

// This should be placed after all your API routes
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'path/to/your/build/index.html'));
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
