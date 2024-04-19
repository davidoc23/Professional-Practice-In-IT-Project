import React, { useState, useEffect } from 'react';
import axios from 'axios';

function WeightsPage() {
  const [category, setCategory] = useState('');
  const [exercise, setExercise] = useState('');
  const [repRange, setRepRange] = useState('');
  const [weightLifted, setWeightLifted] = useState('');
  const [workouts, setWorkouts] = useState([]);

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    // Reset exercise, repRange, and weightLifted when category changes
    setExercise('');
    setRepRange('');
    setWeightLifted('');
  };

  const handleExerciseChange = (e) => {
    setExercise(e.target.value);
  };

  const handleRepRangeChange = (e) => {
    setRepRange(e.target.value);
  };

  const handleWeightLiftedChange = (e) => {
    setWeightLifted(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4001/api/weights-workouts', { category, exercise, repRange, weightLifted });
      console.log(response.data);
      fetchWorkouts();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    fetchWorkouts();
  }, []);

  const fetchWorkouts = async () => {
    try {
      const response = await axios.get('http://localhost:4001/api/weights-workouts');
      setWorkouts(response.data);
    } catch (error) {
      console.error('Error fetching workouts:', error);
    }
  };

  return (
    <div className="background-container">
      <div className="page-container">
        <h2 className="section-title">Weights Workouts</h2>

        <form onSubmit={handleSubmit} className="workout-form">
          <div className="form-group">
            <label htmlFor="category" className="form-label">Category:</label>
            <select id="category" value={category} onChange={handleCategoryChange} className="form-select">
              <option value="">Select Category</option>
              <option value="Chest and Arms">Chest and Arms</option>
              <option value="Back and Shoulders">Back and Shoulders</option>
              <option value="Legs">Legs</option>
            </select>
          </div>

          {category === 'Chest and Arms' && (
            <div>
            <div className="form-group">
              <label htmlFor="exercise" className="form-label">Exercise:</label>
              <select id="exercise" value={exercise} onChange={handleExerciseChange} className="form-select">
                <option value="">Select Exercise</option>
                <option value="DB Chestpress">DB Chestpress</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="repRange" className="form-label">Rep Range:</label>
              <select id="repRange" value={repRange} onChange={handleRepRangeChange} className="form-select">
                <option value="">Select Rep Range</option>
                {[...Array(15)].map((_, index) => (
                  <option key={index + 1} value={index + 1}>{index + 1}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="weightLifted" className="form-label">Weight Lifted (KG):</label>
              <select id="weightLifted" value={weightLifted} onChange={handleWeightLiftedChange} className="form-select">
                <option value="">Select Weight</option>
                {[...Array(50)].map((_, index) => (
                    <option key={index * 2.5 + 2.5} value={(index * 2.5 + 2.5).toFixed(1)}>{(index * 2.5 + 2.5).toFixed(1)}</option>
                ))}

              </select>
            </div>
          </div>
        )}

          {category === 'Back and Shoulders' && (
            <div>
              <div className="form-group">
                <label htmlFor="exercise" className="form-label">Exercise:</label>
                <select id="exercise" value={exercise} onChange={handleExerciseChange} className="form-select">
                  <option value="">Select Exercise</option>
                  <option value="Lat Pulldown">Lat Pulldown</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="repRange" className="form-label">Rep Range:</label>
                <select id="repRange" value={repRange} onChange={handleRepRangeChange} className="form-select">
                  <option value="">Select Rep Range</option>
                  {[...Array(15)].map((_, index) => (
                    <option key={index + 1} value={index + 1}>{index + 1}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="weightLifted" className="form-label">Weight Lifted (KG):</label>
                <select id="weightLifted" value={weightLifted} onChange={handleWeightLiftedChange} className="form-select">
                  <option value="">Select Weight</option>
                  {[...Array(50)].map((_, index) => (
                    <option key={index * 2.5 + 2.5} value={(index * 2.5 + 2.5).toFixed(1)}>{(index * 2.5 + 2.5).toFixed(1)}</option>
                ))}
                </select>
              </div>
            </div>
          )}

          {category === 'Legs' && (
            <div>
              <div className="form-group">
                <label htmlFor="exercise" className="form-label">Exercise:</label>
                <select id="exercise" value={exercise} onChange={handleExerciseChange} className="form-select">
                  <option value="">Select Exercise</option>
                  <option value="Leg Extensions">Leg Extensions</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="repRange" className="form-label">Rep Range:</label>
                <select id="repRange" value={repRange} onChange={handleRepRangeChange} className="form-select">
                  <option value="">Select Rep Range</option>
                  {[...Array(15)].map((_, index) => (
                    <option key={index + 1} value={index + 1}>{index + 1}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="weightLifted" className="form-label">Weight Lifted (KG):</label>
                <select id="weightLifted" value={weightLifted} onChange={handleWeightLiftedChange} className="form-select">
                  <option value="">Select Weight</option>
                  {[...Array(50)].map((_, index) => (
                    <option key={index * 2.5 + 2.5} value={(index * 2.5 + 2.5).toFixed(1)}>{(index * 2.5 + 2.5).toFixed(1)}</option>
                ))}
                </select>
              </div>
            </div>
          )}

          <button type="submit" className="submit-button">Submit</button>
        </form>

        {/* Display list of workouts */}
        <div className="workout-list">
          <h3 className="section-title">List of Workouts</h3>
          <ul className="workout-ul">
            {workouts.map((workout, index) => (
              <li key={index} className="workout-li">
                <span className="workout-category">{workout.category}</span> -
                <span className="workout-details">Exercise: {workout.exercise}, Rep Range: {workout.repRange}, Weight Lifted: {workout.weightLifted} KG</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default WeightsPage;
