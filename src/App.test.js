// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Board from './pages/Board';
import Analytics from './pages/Analytics';
import Settings from './pages/Settings';
import './App.css';

function App() {
  return (
    <Router>
      <MainLayout>
        <Switch>
          <Route path="/" exact component={Board} />
          <Route path="/analytics" component={Analytics} />
          <Route path="/settings" component={Settings} />
        </Switch>
      </MainLayout>
    </Router>
  );
}

export default App;
