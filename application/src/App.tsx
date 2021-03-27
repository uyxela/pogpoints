import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.global.css';
import Start from './pages/Start';
import Dashboard from './pages/Dashboard';

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/" component={Start} />
      </Switch>
    </Router>
  );
}
