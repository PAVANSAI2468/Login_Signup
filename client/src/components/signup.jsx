import React, { useState } from "react";
import {Link} from "react-router-dom"
import './SignUp.css'; // Importing CSS
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Importing useHistory

const SignUp = () => {
  const history = useNavigate(); // Initialize history
  const [ErrMsg, setErrMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [showSuccessMsg, setShowSuccessMsg] = useState(false);
  const [showErrMsg, setShowErrMsg] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    username: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://login-signup-u9xi.onrender.com/auth/signup", formData);

      // Check for response status
      if (response.status === 201) {
        setSuccessMsg(response.data); // Assuming success message is returned
        setShowSuccessMsg(true);
        setShowErrMsg(false); // Hide error message if successful

        // Redirect to login page after a short delay (optional)
        setTimeout(() => {
          history('/login'); // Redirect to the login page
        }, 2000); // Adjust delay as needed
      }
      if (response.status===401){
        setErrMsg(response.json().data);
        setShowSuccessMsg(false);
      }
    } catch (error) {
      console.error("Signup failed:", error.response.data);
      setErrMsg(error.response.data); // Set error message from response
      setShowErrMsg(true);
      setShowSuccessMsg(false); // Hide success message if there's an error
    }
  };

  return (
    <div className="form-container">
      <form className="sign-up-form" onSubmit={handleSubmit}>
        <h2>Sign Up</h2>
        <div className="input-container">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-container">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-container">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Sign Up</button>
        {showErrMsg && <p className="error-message">{ErrMsg}</p>}
        {showSuccessMsg && <p className="success-message">{successMsg}</p>} {/* Corrected */}
        <p>If you have an account please <Link to="/login">login</Link> here</p>
      </form>
    </div>
  );
};

export default SignUp;
