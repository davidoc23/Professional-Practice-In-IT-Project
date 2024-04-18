import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css'; // Import CSS file for styling

function Dashboard() {
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
            </div>
        </div>
    );
}

export default Dashboard;
