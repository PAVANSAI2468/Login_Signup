import React from "react";
import { useNavigate, Link } from "react-router-dom";
import Cookies from "js-cookie"; // Make sure to install js-cookie

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear the cookie using the correct cookie name
    Cookies.remove("token"); // Replace 'token' with the actual name of your cookie
    navigate("/login");
  };

  return (
    <div className="dashboard-container">
      <nav className="navbar">
        <h1>Dashboard</h1>
        <Link to="/login">
          <h1>Login</h1>
        </Link>
        <Link to="/signup">
          <h1>Signup</h1>
        </Link>
        <button onClick={handleLogout} className="logout-button">
          Logout
        </button>
      </nav>
      <div className="dashboard-content">
        <h2>Welcome to Your Dashboard!</h2>
      </div>
    </div>
  );
};

export default Dashboard;
