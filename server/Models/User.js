import mongoose  from "mongoose";
const Schema = mongoose.Schema;

// Define the User schema
const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true, // Ensures no two users can have the same email
    match: [/\S+@\S+\.\S+/, 'is invalid'], // Basic email validation
  },
  username: {
    type: String,
    required: true,
    unique: true, // Ensures no two users can have the same username
    minlength: 3, // Username should be at least 3 characters
  },
  password: {
    type: String,
    required: true,
    minlength: 6, // Password should be at least 6 characters
  },
}, { timestamps: true });

// Create the User model
const User = mongoose.model('User', userSchema,"usersdata");

export default User
