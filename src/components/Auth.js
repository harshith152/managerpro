import React, { useState } from 'react';
import Register from './Register';
import Login from './Login';
import '../styles/Auth.css';

const Auth = () => {
  const [isRegister, setIsRegister] = useState(true);

  return (
    <div className="auth-container">
      <div className="auth-image-section">
        <img src="/assets/astronaut.png" alt="Welcome Astronaut" className="astronaut-img" />
        <h2>Welcome aboard my friend</h2>
        <p>Just a couple of clicks and we start</p>
      </div>
      <div className="auth-form-section">
        {isRegister ? (
          <Register toggleForm={() => setIsRegister(false)} />
        ) : (
          <Login toggleForm={() => setIsRegister(true)} />
        )}
      </div>
    </div>
  );
};

export default Auth;