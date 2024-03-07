import React, { useState } from 'react';

function CreateAccountPage() {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });

    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Make a POST request to check if the user already exists
            const response = await fetch('/api/checkUser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username: formData.username })
            });

            if (response.ok) {
                // If user does not exist, proceed with account creation
                const result = await response.json();
                if (!result.exists) {
                    // User does not exist, proceed with account creation
                    console.log('Creating account...');
                    // Add code to handle account creation (e.g., API call to create account)
                    // Then, redirect the user or show a success message
                } else {
                    // User already exists, display error message
                    setError('Username already exists. Please choose a different username.');
                }
            } else {
                // Handle server error or other issues
                setError('An error occurred while checking user details. Please try again later.');
            }
        } catch (error) {
            console.error('Error:', error);
            setError('An error occurred while checking user details. Please try again later.');
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
                        {error && <div className="error-message">{error}</div>}
                    </form>
                </div>
            </div>
        </div>
    );
}

export default CreateAccountPage;
