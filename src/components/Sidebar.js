import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    
    navigate('/login'); 
  };

  return (
    <div className="sidebar-container">
      <div className="sidebar">
        <div className="logo">
          <img src="/assets/codesandbox.png" alt="Pro Manage Logo" className="logo-img" />
          <h2>Pro Manage</h2>
        </div>
        <nav>
          <ul>
            <li className={location.pathname === "/" ? "active" : ""}>
              <Link to="/">
                <img
                  src={location.pathname === "/" ? "/assets/activeboard.png" : "/assets/board.png"}
                  alt="Board Icon"
                  className="icon"
                />
                Board
              </Link>
            </li>
            <li className={location.pathname === "/analytics" ? "active" : ""}>
              <Link to="/analytics">
                <img
                  src={location.pathname === "/analytics" ? "/assets/activeanalytics.png" : "/assets/analytics.png"}
                  alt="Analytics Icon"
                  className="icon"
                />
                Analytics
              </Link>
            </li>
            <li className={location.pathname === "/settings" ? "active" : ""}>
              <Link to="/settings">
                <img
                  src={location.pathname === "/settings" ? "/assets/activesettings.png" : "/assets/settings.png"}
                  alt="Settings Icon"
                  className="icon"
                />
                Settings
              </Link>
            </li>
          </ul>
        </nav>
        <div className="logout">
          <button onClick={handleLogout}>
            <img src="/assets/Logout.png" alt="Logout Icon" className="icon" />
            Log out
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
