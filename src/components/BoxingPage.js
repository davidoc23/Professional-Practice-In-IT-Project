import React, { useState, useEffect } from 'react';
import axios from 'axios';

function BoxingPage() {
  const [category, setCategory] = useState('');
  const [time, setTime] = useState('');
  const [rounds, setRounds] = useState('');
  const [tempo, setTempo] = useState('');
  const [workouts, setWorkouts] = useState([]);

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleTimeChange = (e) => {
    setTime(e.target.value);
  };

  const handleRoundsChange = (e) => {
    setRounds(e.target.value);
  };

  const handleTempoChange = (e) => {
    setTempo(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4001/api/workouts', { category, time, rounds, tempo });
      console.log(response.data); // Handle the response as needed
      fetchWorkouts(); // Fetch updated list of workouts after submitting
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
      const response = await axios.get('http://localhost:4001/api/workouts');
      setWorkouts(response.data);
    } catch (error) {
      console.error('Error fetching workouts:', error);
    }
  };

  return (
    <div className="boxing-page">
      <h2>Boxing Workouts</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="category">Category:</label>
          <select id="category" value={category} onChange={handleCategoryChange}>
            <option value="">Select Category</option>
            <option value="Shadow boxing">Shadow boxing</option>
            <option value="Boxing on the bag">Boxing on the bag</option>
            <option value="Pads">Pads</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="time">Time per Round:</label>
          <select id="time" value={time} onChange={handleTimeChange}>
            <option value="">Select Time</option>
            <option value="1">1:00 minute</option>
            <option value="2">2:00 minutes</option>
            <option value="3">3:00 minutes</option>
            <option value="4">4:00 minutes</option>
            <option value="5">5:00 minutes</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="rounds">Number of Rounds:</label>
          <select id="rounds" value={rounds} onChange={handleRoundsChange}>
            <option value="">Select Rounds</option>
            {[...Array(20)].map((_, index) => (
              <option key={index} value={index + 1}>{index + 1}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="tempo">Tempo (1-10):</label>
          <select id="tempo" value={tempo} onChange={handleTempoChange}>
            <option value="">Select Tempo</option>
            {[...Array(10)].map((_, index) => (
              <option key={index} value={index + 1}>{index + 1}</option>
            ))}
          </select>
        </div>
        <button type="submit">Submit</button>
      </form>

      {/* Display list of workouts */}
      <div>
        <h3>List of Workouts</h3>
        <ul>
          {workouts.map((workout, index) => (
            <li key={index}>
              {workout.category} - Time: {workout.time} minutes, Rounds: {workout.rounds}, Tempo: {workout.tempo}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default BoxingPage;
