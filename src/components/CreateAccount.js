import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function CreateAccountPage() {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });

    const [error, setError] = useState('');
    const navigate = useNavigate(); // Get the navigate function for programmatic navigation

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Check if username or password fields are empty
        if (!formData.username || !formData.password) {
            setError('Please fill in all fields.');
            return;
        }

        try {
            const response = await fetch('http://localhost:4001/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                console.log('Account created successfully');
                navigate('/sign-in'); // Redirect to the sign-in page upon successful account creation
            } else {
                const data = await response.json();
                console.error('Error:', data.message);
                if (response.status === 409) {
                    setError('Username already exists. Please choose a different one.');
                    setFormData({ username: '', password: '' }); // Clear the fields
                } else {
                    setError('Failed to create account. Please try again.');
                }
            }
        } catch (error) {
            console.error('Error:', error);
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
