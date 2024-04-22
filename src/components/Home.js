import React from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  const handleSignIn = () => {
    navigate('/sign-in');
  };

  const handleCreateAccount = () => {
    navigate('/create-account');
  };

  return (
    <div className="app-container">
       <header className="app-header">
          <div className="title-container">
            <h1 className="app-title">Welcome to FitFusion</h1>
          </div>
          <img src={'/FF.png'} className="app-logo" alt="FitFusion Logo" />
          <br></br>
          <p className="app-intro">
            Start your fitness journey today.
          </p>
          <br></br>
        <button className="button sign-in-button" onClick={handleSignIn}>Sign In</button>
        <br></br>
        <p>
            New to Fit Fusion?
        </p>
        <button className="button create-account-button" onClick={handleCreateAccount}>Create an Account</button>
        </header>
      </div>
   
  );
}

export default Home;
