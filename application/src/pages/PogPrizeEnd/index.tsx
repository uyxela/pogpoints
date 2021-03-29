import React, { useEffect, useState } from 'react';
// import styles from './Dashboard.css';
import Navbar from '../../components/ui/Navbar';

import { Grid } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { MdTimer, MdPeople } from 'react-icons/md';
import { getWinningPrizes } from '../../components/auth/service';
import { useHistory, useLocation } from 'react-router-dom';
import { getItem } from '../../components/data/Store';

const PogPrizeEnd = (props) => {
  const location = useLocation();
  const history = useHistory();
  const pogprize = getItem('pogprize');
  const [prizes, setPrizes] = useState(null);
  const cardStyle = {
    backgroundColor: 'white',
    borderRadius: '20px',
    // minHeight: '25vh',
    margin: '5%',
    textAlign: 'center',
    alignItems: 'center',
  };

  useEffect(() => {
    getWinningPrizes(pogprize.title).then((winningPrizes) => {
      setPrizes(winningPrizes);
      console.log('winning prizes', winningPrizes);
    });
  }, []);

  return (
    <div className="dashboardContainer">
      <Navbar />
      <Grid container spacing={3} style={{ marginTop: '2%' }}>
        <Grid item xs={0.5} />
        <Grid item xs={8}>
          <h1 className="dashboardTitle">And our PogWinners are...</h1>
<<<<<<< HEAD
          {/* {prizes?.map((prize) => (
            <p className="dashboardPogprizeText" style={{ marginTop: '%' }}>
              {prize.name} won {prize.title}
            </p>
          ))} */}
          <p className="dashboardPogprizeText" style={{ marginTop: '5%' }}></p>
=======
          {prizes?.map(prize => <p className="dashboardPogprizeText" style={{marginTop: '%'}}>{prize.name} won {prize.title}</p>)}
          <p className="dashboardPogprizeText" style={{ marginTop: '5%' }}>

          </p>
>>>>>>> 0a792b61686a794a1d9a1283c1b1dabfe5256ff8
        </Grid>
      </Grid>
    </div>
  );
};

export default PogPrizeEnd;
