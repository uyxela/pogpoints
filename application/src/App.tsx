import React from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import './App.global.css';
import Start from './pages/Start';
import Dashboard from './pages/Dashboard';
import PogPrize from './pages/PogPrize';
import PogSpin from './pages/PogSpin';
import PogPrizeProgress from './pages/PogPrizeProgress';

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/pogprize" component={PogPrize} />
        <Route path="/pogspin" component={PogPrize} />
        <Route path="/pogprizeprogress" component={PogPrizeProgress} />
      </Switch>
    </Router>
  );
}
