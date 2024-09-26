import React, { useState } from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie"
import './Login.css'; // Import CSS for styling
import axios from "axios";
import { useNavigate } from "react-router-dom"; // For navigation after login

const Login = () => {
  const navigate = useNavigate(); // Initialize navigate
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

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
      const response = await axios.post("https://login-signup-u9xi.onrender.com/auth/login", formData);
      
      // Extract the token from the response
      const { token } = response.data;
  
      // Store the token in a cookie
      Cookies.set('token', token, { expires: 7 });  // Expires in 7 days
  
      // Navigate to dashboard on successful login
      if (response.status === 200) {
        navigate('/dashboard');
      }
    } catch (error) {
      console.error("Login failed:", error.response?.data || error.message);
      setErrorMessage("Invalid email or password.");
    }
  };
  
  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
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
        <button type="submit">Login</button>
        <p>If you not login yet now please <Link to="/signup">Sign up</Link></p>
        <Link to="/forgot_password">Forgot password</Link>
      </form>
    </div>
  );
};

export default Login;
