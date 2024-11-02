// import React, { useState } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import './Auth.css';

// const Register = () => {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const navigate = useNavigate();

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (password !== confirmPassword) {
//       alert('Passwords do not match');
//       return;
//     }
    
//     navigate('/login'); 
//   };

//   return (
//     <div className="auth-container">
//       <div className="auth-image-section">
//         <img src="/assets/loginimage.png" alt="Welcome Astronaut" className="astronaut-img" />
//         <h2>Welcome aboard my friend</h2>
//         <p>Just a couple of clicks and we start</p>
//       </div>
//       <div className="auth-form-section">
//         <div className="auth-form">
//           <h2>Register</h2>
//           <form onSubmit={handleSubmit}>
//             <div className="input-group">
//               <img src="/assets/profile.png" alt="Profile Icon" className="left-icon" />
//               <input
//                 type="text"
//                 placeholder="Name"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//                 required
//               />
//             </div>
//             <div className="input-group">
//               <img src="/assets/mail.png" alt="Email Icon" className="left-icon" />
//               <input
//                 type="email"
//                 placeholder="Email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 required
//               />
//             </div>
//             <div className="input-group">
//               <img src="/assets/lock.png" alt="Password Icon" className="left-icon" />
//               <input
//                 type={showConfirmPassword ? 'text' : 'password'}
//                 placeholder="Confirm Password"
//                 value={confirmPassword}
//                 onChange={(e) => setConfirmPassword(e.target.value)}
//                 required
//               />
//               <img
//                 src={showConfirmPassword ? "/assets/unhide.png" : "/assets/hide.png"}
//                 alt="Toggle Confirm Password"
//                 className="right-icon"
//                 onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//               />
//             </div>
//             <div className="input-group">
//               <img src="/assets/lock.png" alt="Password Icon" className="left-icon" />
//               <input
//                 type={showPassword ? 'text' : 'password'}
//                 placeholder="Password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 required
//               />
//               <img
//                 src={showPassword ? "/assets/unhide.png" : "/assets/hide.png"}
//                 alt="Toggle Password"
//                 className="right-icon"
//                 onClick={() => setShowPassword(!showPassword)}
//               />
//             </div>
//             <button type="submit" className="auth-button">Register</button>
//           </form>
//           <p>
//             Already have an account? <Link to="/login" className="toggle-link">Log in</Link>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Register;

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Auth.css';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    // Create user data object
    const userData = {
      name,
      email,
      password,
    };

    // Store user data in local storage
    localStorage.setItem('user', JSON.stringify(userData));

    // Navigate to login page
    navigate('/login');
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
          <h2>Register</h2>
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <img src="/assets/profile.png" alt="Profile Icon" className="left-icon" />
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
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
            <div className="input-group">
              <img src="/assets/lock.png" alt="Confirm Password Icon" className="left-icon" />
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <img
                src={showConfirmPassword ? "/assets/unhide.png" : "/assets/hide.png"}
                alt="Toggle Confirm Password"
                className="right-icon"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              />
            </div>
            <button type="submit" className="auth-button">Register</button>
          </form>
          <p>
            Already have an account? <Link to="/login" className="toggle-link">Log in</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
