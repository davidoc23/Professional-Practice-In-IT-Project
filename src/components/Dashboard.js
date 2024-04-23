import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../App.css'; // Import CSS file for styling

function Dashboard({ username }) {
    const navigate = useNavigate();
    const [workouts, setWorkouts] = useState([]);
    const [selectedWorkout, setSelectedWorkout] = useState(null);

    useEffect(() => {
        fetchWorkouts();
    }, []);

    const handleLogout = () => {
        // Clear session storage or cookies used for authentication
        sessionStorage.removeItem('token'); // Assuming 'token' is used for authentication
        // Clear authentication cookie
        document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'; // Assuming 'token' is used for authentication
        navigate('/sign-in');
    };

    const fetchWorkouts = async () => {
        try {
            const boxingResponse = await axios.get('http://localhost:4001/api/boxing-workouts');
            const cardioResponse = await axios.get('http://localhost:4001/api/cardio-workouts');
            const weightsResponse = await axios.get('http://localhost:4001/api/weights-workouts');

            // Combine all workouts into a single array
            const allWorkouts = [...boxingResponse.data, ...cardioResponse.data, ...weightsResponse.data];
            setWorkouts(allWorkouts);
        } catch (error) {
            console.error('Error fetching workouts:', error);
        }
    };
    
    const openPopup = (workout) => {
        // Toggle selectedWorkout state
        setSelectedWorkout(selectedWorkout ? null : workout);
    };

    const closePopup = () => {
        setSelectedWorkout(null);
    };

    return (
        <div className='container'>
            <h2 className="dashboard-title">Welcome to the Dashboard</h2>
            <p className="dashboard-text">Explore your fitness journey with our exciting activities:</p>
            <div className="button-container">
                <button className="dashboard-button boxing-button" onClick={() => navigate(`/boxing?username=${username}`)}>Boxing</button>
                <button className="dashboard-button weights-button" onClick={() => navigate('/weights')}>Weights</button>
                <button className="dashboard-button cardio-button" onClick={() => navigate('/cardio')}>Cardio</button>
                <button className="dashboard-button logout-button" onClick={handleLogout}>Logout</button>
            </div>
            <div className="dashboard-title">
                <h3>Click here to see all Workouts in database currently!</h3>
                <div>
                    <button className="dashboard-button show-workout-button" onClick={() => openPopup(workouts)}>Show All Workouts</button>
                </div>

                {selectedWorkout && (
                    <div className="popup">
                        <div className="popup-content">
                            <span className="close" onClick={closePopup}>&times;</span>
                            <h3>All Workouts</h3>
                            {selectedWorkout.length > 0 ? (
                                <ul>
                                    {selectedWorkout.map((workout, index) => (
                                        <li key={index}>
                                            <p><strong>Category:</strong> {workout.category}</p>
                                            <div style={{ marginLeft: '20px' }}>
                                                <p><strong>Duration:</strong> {workout.duration}</p>
                                                <p><strong>Intensity:</strong> {workout.intensity}</p>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p>No workouts currently in database</p>
                            )}
                        </div>
                    </div>
                )}
            </div>

        </div>
    );
}

export default Dashboard;
