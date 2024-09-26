import express from 'express';
import bcrypt from 'bcrypt';
import User from '../Models/User.js'; // Adjust the path as necessary

const router = express.Router();

router.post('/signup', async (req, res) => {
    const { email, password, username } = req.body;

    // Validate input
    if (!email || !password || !username) {
        console.log('Input validation failed');
        return res.status(400).send('All fields are required');
    }

    try {
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            console.log('User with this email already exists');
            return res.status(400).send('User with this email already exist');
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create the user
        const newUser = new User({
            email,
            password: hashedPassword,
            username,
        });

        // Save the user to the database
        await newUser.save();
        console.log('User created successfully:', newUser);
        return res.status(201).send('User registered successfully');
    } catch (error) {
        console.error('Error in user registration:', error);
        return res.status(500).send('Internal Server Error');
    }
});


export default router;
