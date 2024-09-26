import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import User from "../Models/User.js";

dotenv.config();
const router = express.Router();

router.post("/resetpassword", async (req, res) => {
    const { password, token } = req.body;

    try {
        // Verify the token
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        console.log(decoded);

        // Extract user ID from the decoded token
        const email = decoded.email;

        // Hash the new password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Update the user password in the database
        await User.findOneAndUpdate(
            { email: email },
            { password: hashedPassword },
            { new: true } // Return the updated document
        );

        res.status(200).send("Reset password successfully");
    } catch (err) {
        console.error(err); // Log error for debugging
        return res.status(401).send("Invalid token");
    }
});

export default router;
