//Import React and necessary hooks from 'react', and axios for making HTTP requests.
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function CardioPage() {
  //State hooks to manage the form data and list of workouts.
  const [category, setCategory] = useState('');//Manages the cardio workout category.
  const [time, setTime] = useState('');//Manages the time spent on the workout.
  const [distance, setDistance] = useState('');//Manages the distance covered in the workout.
  const [workouts, setWorkouts] = useState([]);//Manages a list of workouts fetched from the backend.

   //Event handlers to update state based on user input.
  const handleCategoryChange = (e) => {
    setCategory(e.target.value);//Update category state on user input.
  };

  const handleTimeChange = (e) => {
    setTime(e.target.value);
  };

  const handleDistanceChange = (e) => {
    setDistance(e.target.value);
  };

  //Handle form submission with async function.
  //HandleSubmit is defined as an asynchronous function, which means it will handle 
  //asynchronous operations and return a Promise.
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
       //axios.post returns a Promise. Using 'await' pauses execution of this async function
        //until the Promise resolves or rejects. Execution resumes once the server response is received.
      const response = await axios.post('http://localhost:4001/api/cardio-workouts', { category, time, distance });
      //Log the response data to the console. Since the await keyword is used above,
      //at this point, 'response' contains the resolved value of the Promise returned by axios.post.
      console.log(response.data); // Handle the response as needed
      //Fetch the updated list of workouts after submission
      //After successfully posting the data, fetch the latest workouts from the server.
      //fetchWorkouts also returns a Promise and is handled with await, ensuring that
      //it completes before any subsequent lines of code run.
      fetchWorkouts();
    } catch (error) {
      // If the Promise is rejected (e.g., network error, server error), the control jumps to this catch block.
      // Logs the error to the console.
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
    <div className="background-container">
    <div className="page-container">
        <h2 className="section-title">Cardio Workouts</h2>
        
        <form onSubmit={handleSubmit} className="workout-form">
            <div className="form-group">
                <label htmlFor="category" className="form-label">Category:</label>
                <select id="category" value={category} onChange={handleCategoryChange} className="form-select">
                    <option value="">Select Category</option>
                    <option value="Walk">Walk</option>
                    <option value="Jog">Jog</option>
                    <option value="Sprint">Sprint</option>
                </select>
            </div>
            
            <div className="form-group">
                <label htmlFor="time" className="form-label">Time (minutes):</label>
                <input type="text" id="time" value={time} onChange={handleTimeChange} className="form-input" />
            </div>
            
            <div className="form-group">
                <label htmlFor="distance" className="form-label">Distance (miles):</label>
                <input type="text" id="distance" value={distance} onChange={handleDistanceChange} className="form-input" />
            </div>
            
            <button type="submit" className="submit-button">Submit</button>
            <br></br>
            <br></br>
            <a href="/" className="redirect-button">Go to Home</a>
            <br></br>
            <br></br>
            <a href="/dashboard" className="redirect-button">Go back to Dashboard</a>
        </form>
        
        {/* Display list of workouts */}
        <div className="workout-list">
            <h3 className="section-title">List of Cardio Workouts</h3>
            <ul className="workout-ul">
                {workouts.map((workout) => (
                    <li key={workout._id} className="workout-li">
                        Category: {workout.category}, Time: {workout.time} minutes, Distance: {workout.distance} miles
                        <br></br>
                        <br></br>
                        <button onClick={() => handleDelete(workout._id)} className="delete-button">Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    </div>
</div>
  );
}

export default CardioPage;
