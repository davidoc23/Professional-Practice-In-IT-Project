import React, { useState } from 'react';
import Dashboard from './Dashboard';

function SignInPage() {
  // Define state variables for username, password, and authentication error
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [redirectToDashboard, setRedirectToDashboard] = useState(false); // State to control redirect

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior

    try {
      // Make a POST request to the server for authentication
      const response = await fetch('http://localhost:4001/api/login', { // Corrected URL
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });

      // Check if the request was successful (status code 200)
      if (response.ok) {
        // If authentication is successful, set redirectToDashboard to true
        console.log('Authentication successful');
        setRedirectToDashboard(true);
      } else {
        // If authentication fails, get the error message from the server response
        const errorData = await response.json();
        setError(errorData.message);
      }
    } catch (error) {
      // Handle any network errors
      console.error('Error:', error);
      setError('An error occurred. Please try again later.');
    }
  };

  // Render the Dashboard component if redirectToDashboard is true
  if (redirectToDashboard) {
    return <Dashboard />;
  }

  return (
    <div className="sign-in-container">
      <div className="parent-container">
        <div className="form-container">
          <h2>Sign In</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="username">Username:</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <br />
            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <br />
            <button type="submit">Sign In</button>
            <br/>
            <a href="/" className="redirect-button">Go to Home</a>
            {error && <div className="error-message">{error}</div>}
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignInPage;
