import React from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import './App.global.css';
import Start from './pages/Start';
import Dashboard from './pages/Dashboard';
import PogPrize from './pages/PogPrize';
import PogPrizeProgress from './pages/PogPrizeProgress';
import PogPrizeEnd from './pages/PogPrizeEnd';
import Entries from './pages/Entries';
import PogPrizeInfo from './pages/PogPrizeInfo';
import PrizeQueue from './pages/PrizeQueue'
import { AnimatedSwitch } from 'react-router-transition';

export default function App() {
  return (
    <Router>
      <AnimatedSwitch
        atEnter={{ opacity: 0 }}
        atLeave={{ opacity: 0 }}
        atActive={{ opacity: 1 }}
      >
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/pogprize" component={PogPrize} />
        <Route path="/pogprizeprogress" component={PogPrizeProgress} />
        <Route path="/pogprizeend" component={PogPrizeEnd} />
        <Route path="/entries" component={Entries} />
        <Route path="/pogprizeinfo" component={PogPrizeInfo} />
        <Route path="/prizequeue" component={PrizeQueue} />
        <Route path="/" component={Start} />
      </AnimatedSwitch>
    </Router>
  );
}
