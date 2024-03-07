// Home.js
import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
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
        <Link to="/sign-in">
          <button className="button sign-in-button">Sign In</button>
        </Link>
        <br></br>
        <p>
            New to Fit Fusion?
        </p>
        <Link to="/create-account">
          <button className="button create-account-button">Create an Account</button>
        </Link>
        </header>
      </div>
   
  );
}

export default Home;
