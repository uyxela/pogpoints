import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.global.css';
import Start from './pages/Start';

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={Start} />
      </Switch>
    </Router>
  );
}
