import React, { useEffect, useState } from 'react';
// import styles from './Dashboard.css';
import Navbar from '../../components/ui/Navbar';

import { Grid } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { MdTimer, MdPeople } from 'react-icons/md';
import {
  getUser,
  getPogPrizes,
  checkActivePogprize,
  getPrizes,
  redeemReward,
} from '../../components/auth/service';
import { useHistory } from 'react-router-dom';

const PogPrizeEnd = () => {

  const cardStyle = {
    backgroundColor: 'white',
    borderRadius: '20px',
    // minHeight: '25vh',
    margin: '5%',
    textAlign: 'center',
    alignItems: 'center',
  };



  return (
    <div className="dashboardContainer">
      <Navbar />
      <Grid container spacing={3} style={{ marginTop: '2%' }}>
        <Grid item xs={0.5} />
        <Grid item xs={5}>
          <h1 className="dashboardTitle">Dashboard</h1>
          <p className="dashboardPogprizeTitle">Hi, </p>
          <p className="dashboardPogprizeText" style={{ marginTop: '5%' }}>
            Some quick stats for you:
          </p>

        </Grid>


      </Grid>
    </div>
  );
};

export default PogPrizeEnd;
