import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [searchParams] = useSearchParams();  // To capture the query parameters

  const token = searchParams.get('token');  // Extract the token from the URL

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) {
      setErrorMessage('Invalid or expired token');
      return;
    }
    
    try {
      const response = await axios.post('https://login-signup-u9xi.onrender.com/auth/resetpassword', {
        password,
        token,  // Send token to backend for validation
      });
      
      if (response.status === 200) {
        setSuccessMessage("Password reset successfully!");
      }
    } catch (err) {
      console.error(err.message);
      setErrorMessage(err.response?.data?.message || 'Failed to reset password.');
    }
  };

  return (
    <div>
      <h2>Reset Password</h2>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="Enter new password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Reset Password</button>
      </form>
    </div>
  );
};

export default ResetPassword;
