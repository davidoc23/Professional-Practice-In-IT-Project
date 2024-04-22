import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css'; // Import CSS file for styling

function Dashboard() {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Clear session storage or cookies used for authentication
        sessionStorage.removeItem('token'); // Assuming 'token' is used for authentication
        // Clear authentication cookie
        document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'; // Assuming 'token' is used for authentication
        navigate('/sign-in');
    };

    return (
        <div className='container'>
            <h2 className="dashboard-title">Welcome to the Dashboard</h2>
            <p className="dashboard-text">Explore your fitness journey with our exciting activities:</p>
            <div className="button-container">
                <button className="dashboard-button boxing-button" onClick={() => navigate('/boxing')}>Boxing</button>
                <button className="dashboard-button weights-button" onClick={() => navigate('/weights')}>Weights</button>
                <button className="dashboard-button cardio-button" onClick={() => navigate('/cardio')}>Cardio</button>
                <button className="dashboard-button logout-button" onClick={handleLogout}>Logout</button>
            </div>
        </div>
    );
}

export default Dashboard;
