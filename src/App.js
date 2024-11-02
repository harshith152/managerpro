import React, { useState } from 'react';
import { Route, Routes, useLocation, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Board from './pages/Board';
import Analytics from './pages/Analytics';
import Settings from './pages/Settings';
import Login from './components/Login';
import Register from './components/Register';
import Share from './pages/Share'; 
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false); 
  const location = useLocation();

  
  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  
  const isAuthRoute = location.pathname === '/login' || location.pathname === '/register';
  const isSharePage = location.pathname.startsWith('/share'); 

  return (
    <div className="app-container">
      {/* Conditionally render Sidebar only if the user is authenticated and not on the Share or auth routes */}
      {isAuthenticated && !isSharePage && !isAuthRoute && <Sidebar />}

      <div className={`main-content ${isSharePage || isAuthRoute ? 'no-sidebar' : ''}`}>
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/share/:taskId" element={<Share />} /> {/* Public Share route */}

          {/* Protected routes */}
          {isAuthenticated ? (
            <>
              <Route path="/" element={<Board />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/settings" element={<Settings />} />
            </>
          ) : (
            
            <Route path="*" element={<Navigate to="/login" replace />} />
          )}
        </Routes>
      </div>
    </div>
  );
}

export default App;


