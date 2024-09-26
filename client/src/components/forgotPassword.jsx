import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './forgotpassword.css'; // Importing the CSS file

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:4000/auth/forgotpassword", { email });
      
      if (response.status === 200) {
        setSuccessMessage("Password reset email sent successfully!"); // Display success message
        setTimeout(() => {
          navigate("/login"); // Redirect to reset password page after a delay
        }, 2000);
      }
    } catch (err) {
      console.error(err.message);
      setErrorMessage(err.response?.data?.message || 'Failed to send reset email.'); // Display error message
    }
    
    console.log("Email submitted: ", email);
  };

  return (
    <div className="forgot-password-container">
      <form className="forgot-password-form" onSubmit={handleSubmit}>
        <h2>Forgot Password?</h2>
        <p>Enter your email address to reset your password</p>
        {errorMessage && <p className="error-message">{errorMessage}</p>} {/* Show error message */}
        {successMessage && <p className="success-message">{successMessage}</p>} {/* Show success message */}
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default ForgotPassword;
