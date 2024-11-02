import React, { useState } from 'react';
import './Settings.css';

const Settings = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  
  const handleUpdate = (e) => {
    e.preventDefault();
    
    const isEditingOnlyOneField = 
      (name && !email && !oldPassword && !newPassword) ||
      (!name && email && !oldPassword && !newPassword) ||
      (!name && !email && oldPassword && newPassword);

    if (!isEditingOnlyOneField) {
      alert('Please edit only one field at a time.');
      return;
    }

    const storedUser = JSON.parse(localStorage.getItem('user'));

    if (oldPassword && newPassword) {
      // Check if old password matches
      if (oldPassword !== storedUser.password) {
        alert('Old password is incorrect');
        return;
      }

      // Update password in local storage
      storedUser.password = newPassword;
      localStorage.setItem('user', JSON.stringify(storedUser));
      alert('Password updated successfully');
    } else {
      // Update name or email if changed
      if (name) {
        storedUser.name = name;
      }
      if (email) {
        storedUser.email = email;
      }
      localStorage.setItem('user', JSON.stringify(storedUser));
      alert('Profile updated successfully');
    }

    // Clear fields after updating
    setOldPassword('');
    setNewPassword('');
    setName('');
    setEmail('');
  };

  return (
    <div className="settings-page-container">
      <div className="settings-container">
        <h2>Settings</h2>
        <form onSubmit={handleUpdate} className="settings-form">
          {/* Name Field */}
          <div className="form-group">
            <label htmlFor="name">
              <img src="/assets/profile.png" alt="Profile Icon" className="icon-placeholder" />
              <input 
                type="text" 
                id="name"
                placeholder="Name" 
                value={name} 
                onChange={(e) => setName(e.target.value)}
              />
            </label>
          </div>

          {/* Email Field */}
          <div className="form-group">
            <label htmlFor="email">
              <img src="/assets/mail.png" alt="Mail Icon" className="icon-placeholder" />
              <input 
                type="email" 
                id="email" 
                placeholder="Update Email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
          </div>

          {/* Old Password Field */}
          <div className="form-group">
            <label htmlFor="oldPassword">
              <img src="/assets/lock.png" alt="Lock Icon" className="icon-placeholder" />
              <input 
                type={showOldPassword ? 'text' : 'password'}
                id="oldPassword"
                placeholder="Old Password" 
                value={oldPassword} 
                onChange={(e) => setOldPassword(e.target.value)}
              />
              <img 
                src="/assets/eye.png" 
                alt="Toggle Visibility" 
                className="toggle-password"
                onClick={() => setShowOldPassword(!showOldPassword)}
              />
            </label>
          </div>

          {/* New Password Field */}
          <div className="form-group">
            <label htmlFor="newPassword">
              <img src="/assets/lock.png" alt="Lock Icon" className="icon-placeholder" />
              <input 
                type={showNewPassword ? 'text' : 'password'}
                id="newPassword"
                placeholder="New Password" 
                value={newPassword} 
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <img 
                src="/assets/eye.png" 
                alt="Toggle Visibility" 
                className="toggle-password"
                onClick={() => setShowNewPassword(!showNewPassword)}
              />
            </label>
          </div>

          <button type="submit" className="update-button">Update</button>
        </form>
      </div>
    </div>
  );
};

export default Settings;
