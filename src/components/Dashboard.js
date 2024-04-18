import React from 'react';
import '../App.css'; // Import CSS file for styling

function Dashboard() {
    return (
        <div className='container'>
            <h2 className="dashboard-title">Welcome to the Dashboard</h2>
            <p className="dashboard-text">Explore your fitness journey with our exciting activities:</p>
            <div className="button-container">
                <button className="dashboard-button boxing-button">Boxing</button>
                <button className="dashboard-button weights-button">Weights</button>
                <button className="dashboard-button cardio-button">Cardio</button>
            </div>
        </div>
    );
}

export default Dashboard;