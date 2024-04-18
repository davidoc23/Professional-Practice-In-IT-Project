import React, { useState } from 'react';
import { Link } from 'react-router-dom';

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
            const response = await fetch('http://localhost:4001/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                console.log('Account created successfully');

                
            } else {
                const data = await response.json();
                console.error('Error:', data.message);
                setError('Failed to create account. Please try again.');
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
                        <Link to="/sign-in">
                        <button type="submit">Create Account</button>
                        </Link>
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
