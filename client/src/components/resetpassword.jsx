import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import './resetpassword.css'; // Optional: Create CSS for styling

const ResetPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get('token');

  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false); // To handle loading state

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading

    try {
      const response = await axios.post('https://login-signup-u9xi.onrender.com/auth/resetpassword', {
        token,
        password,
      });
      
      setSuccessMessage(response.data); // Adjust based on your backend response structure
      // Optionally navigate to the login page after a successful reset
      setTimeout(() => navigate('/login'), 2000);
    } catch (error) {
      setErrorMessage(error.response?.data?.message || 'Failed to reset password');
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="reset-password-container">
      <h2>Reset Password</h2>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}
      <form onSubmit={handleResetPassword}>
        <div className="input-container">
          <label htmlFor="password">New Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>
        <button type="submit" disabled={loading}>Reset Password</button> {/* Disable button while loading */}
      </form>
    </div>
  );
};

export default ResetPassword;
