// App.js
import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import CreateAccount from './components/CreateAccount';
import SignIn from './components/SignIn'; 
import Dashboard from './components/Dashboard';
import BoxingPage from './components/BoxingPage';
import CardioPage from './components/CardioPage';
import WeightsWOPage from './components/WeightsWOPage';




function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create-account" element={<CreateAccount />} />
          <Route path="/sign-in" element={<SignIn />} /> 
          <Route path="/dashboard"element={<Dashboard />} />
          <Route path="/boxing"element={<BoxingPage />} />
          <Route path="/cardio"element={<CardioPage />} />
          <Route path="/weights"element={<WeightsWOPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
