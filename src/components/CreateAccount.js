import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function CreateAccountPage() {
    //useState hook to manage form data state, initialized with username and password fields
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });
    //useState hook to manage error message state, initialized as an empty string
    const [error, setError] = useState('');
    const navigate = useNavigate(); // Get the navigate function for programmatic navigation

    //Function to handle changes in form input fields, updating the corresponding state
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,//Spread the previous state to maintain other key-values
            [name]: value//Update the changed value dynamically using computed property name
        }));
    };

    //Asynchronous function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();//Prevent default form submission behavior

        // Check if username or password fields are empty
        if (!formData.username || !formData.password) {
            setError('Please fill in all fields.');
            return;
        }

        try {
            //Attempt to send the form data to the server using a POST requestv
            const response = await fetch('http://localhost:4001/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)//Convert form data into JSON format
            });

            if (response.ok) {//Check if the HTTP status code is successful
                console.log('Account created successfully');
                navigate('/sign-in'); // Redirect to the sign-in page upon successful account creation
            } else {
                const data = await response.json();//Parse the JSON response body
                console.error('Error:', data.message);//Log the error message from the response
                if (response.status === 409) {
                    setError('Username already exists. Please choose a different one.');
                    setFormData({ username: '', password: '' }); //Clear form fields on specific error
                } else {
                    setError('Failed to create account. Please try again.');
                }
            }
        } catch (error) {
            console.error('Error:', error);//Log any errors that occur during the fetch process
            setError('Failed to create account. Please try again.');
        }
    };
    
    return (
        <div className="create-account-container">
            <div className="parent-container">
                <div className="form-container">
                    <h2>Create Account</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="username">Username:</label>
                            <input type="text" id="username" name="username" value={formData.username} onChange={handleChange} />
                        </div>
                        <br />
                        <div className="form-group">
                            <label htmlFor="password">Password:</label>
                            <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} />
                        </div>
                        <br />
                        <button type="submit">Create Account</button>
                        <br/>
                        <br/>
                        <a href="/" className="redirect-button">Go to Home</a>
                        {error && <div className="error-message">{error}</div>}
                    </form>
                </div>
            </div>
        </div>
    );
}

export default CreateAccountPage;
