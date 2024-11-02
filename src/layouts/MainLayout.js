
import React from 'react';
import Sidebar from '../components/Sidebar';
import './MainLayout.module.css'; 

const MainLayout = ({ children }) => {
  return (
    <div className="main-layout">
      <Sidebar />
      <div className="content">
        {children}
      </div>
    </div>
  );
};

export default MainLayout;
