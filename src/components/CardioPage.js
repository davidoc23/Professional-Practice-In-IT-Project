import React, { useState, useEffect } from 'react';
import axios from 'axios';

function CardioPage() {
  const [category, setCategory] = useState('');
  const [time, setTime] = useState('');
  const [distance, setDistance] = useState('');
  const [workouts, setWorkouts] = useState([]);

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleTimeChange = (e) => {
    setTime(e.target.value);
  };

  const handleDistanceChange = (e) => {
    setDistance(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4001/api/cardio-workouts', { category, time, distance });
      console.log(response.data); // Handle the response as needed
      // Fetch the updated list of workouts after submission
      fetchWorkouts();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    // Fetch the list of workouts from the backend when the component mounts
    fetchWorkouts();
  }, []);

  const fetchWorkouts = async () => {
    try {
      const response = await axios.get('http://localhost:4001/api/cardio-workouts');
      setWorkouts(response.data);
    } catch (error) {
      console.error('Error fetching workouts:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      // Send a DELETE request to the server to delete the workout with the specified ID
      await axios.delete(`http://localhost:4001/api/cardio-workouts/${id}`);
      // Remove the deleted workout from the local state
      setWorkouts(workouts.filter((workout) => workout._id !== id));
    } catch (error) {
      console.error('Error deleting cardio workout:', error);
    }
  };

  return (
    <div className="cardio-page">
      <h2>Cardio Workouts</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="category">Category:</label>
          <select id="category" value={category} onChange={handleCategoryChange}>
            <option value="">Select Category</option>
            <option value="Walk">Walk</option>
            <option value="Jog">Jog</option>
            <option value="Sprint">Sprint</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="time">Time (minutes):</label>
          <input type="text" id="time" value={time} onChange={handleTimeChange} />
        </div>
        <div className="form-group">
          <label htmlFor="distance">Distance (miles):</label>
          <input type="text" id="distance" value={distance} onChange={handleDistanceChange} />
        </div>
        <button type="submit">Submit</button>
      </form>

      {/* Display list of workouts */}
      <div>
        <h3>List of Cardio Workouts</h3>
        <ul>
            {workouts.map((workout) => (
            <li key={workout._id}>
                Category: {workout.category}, Time: {workout.time} minutes, Distance: {workout.distance} km
                <button onClick={() => handleDelete(workout._id)}>Delete</button>
            </li>
            ))}
        </ul>
        </div>
    </div>
  );
}

export default CardioPage;
