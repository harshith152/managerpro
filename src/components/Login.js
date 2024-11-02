import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Auth.css';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Retrieve user data from local storage
    const storedUser = JSON.parse(localStorage.getItem('user'));

    // Check if the credentials match
    if (storedUser && storedUser.email === email && storedUser.password === password) {
      onLogin();  // Call parent component's onLogin function
      navigate('/');  // Redirect to board page
    } else {
      alert('Incorrect email or password. Please try again.');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-image-section">
        <img src="/assets/loginimage.png" alt="Welcome Astronaut" className="astronaut-img" />
        <h2>Welcome aboard my friend</h2>
        <p>Just a couple of clicks and we start</p>
      </div>

      <div className="auth-form-section">
        <div className="auth-form">
          <h2>Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <img src="/assets/mail.png" alt="Email Icon" className="left-icon" />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <img src="/assets/lock.png" alt="Password Icon" className="left-icon" />
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <img
                src={showPassword ? "/assets/unhide.png" : "/assets/hide.png"}
                alt="Toggle Password"
                className="right-icon"
                onClick={() => setShowPassword(!showPassword)}
              />
            </div>
            <button type="submit" className="auth-button">Log in</button>
          </form>
          <p>
            Don't have an account? <a href="/register" className="toggle-link">Register</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
