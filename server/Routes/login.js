import express from "express"
import bcrypt from "bcrypt"
import dotenv from "dotenv"
dotenv.config()
import User from '../Models/User.js'
import jwt from "jsonwebtoken"
const router=express.Router();

const jwt_secret=process.env.SECRET_KEY

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).send('Email and password are required');
    }

    try {
        // Find user by email
        const user = await User.findOne({ email });
        
        // Log the user object to see what is being retrieved
        console.log('User found:', user);

        // If user doesn't exist, return error
        if (!user) {
            return res.status(400).send('Invalid email or password');
        }

        // Compare the provided password with the stored hashed password
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).send('Invalid email or password');
        }

        const token = jwt.sign({ id: user._id, email: user.email },process.env.SECRET_KEY, {
            expiresIn: '1h',  // Token expiration time
          });
      
          // Send the token to the client
         return res.status(200).send({
            message: 'Login successful',
            token,  // Return the JWT token
            user: { email: user.email },  // Optionally return some user details
          });
    } catch (error) {
        console.error('Error during login:', error);
        return res.status(500).send('Internal Server Error');
    }
});


export default router