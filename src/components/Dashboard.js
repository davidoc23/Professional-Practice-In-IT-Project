import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css'; // Import CSS file for styling

function Dashboard() {
    const handleLogout = () => {
        // Clear session storage or cookies used for authentication
        sessionStorage.removeItem('token'); // Assuming 'token' is used for authentication
        // Redirect the user to the login page
         // Clear authentication cookie
        document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'; // Assuming 'token' is used for authentication
    
        window.location.href = '/sign-in';
    };

    return (
        <div className='container'>
            <h2 className="dashboard-title">Welcome to the Dashboard</h2>
            <p className="dashboard-text">Explore your fitness journey with our exciting activities:</p>
            <div className="button-container">
                <Link to="/boxing">
                    <button className="dashboard-button boxing-button">Boxing</button>
                </Link>
                <Link to="/weights">
                    <button className="dashboard-button weights-button">Weights</button>
                </Link>
                <Link to="/cardio">
                    <button className="dashboard-button cardio-button">Cardio</button>
                </Link>
                <button onClick={handleLogout} className="dashboard-button logout-button">Logout</button>
            </div>
        </div>
    );
}

export default Dashboard;
