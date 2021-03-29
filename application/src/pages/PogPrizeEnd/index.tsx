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
  const pogprize = getItem('pogPrize');
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
    const timer = setTimeout(() => {
      getWinningPrizes(pogprize.title).then((winningPrizes) => {
        setPrizes(winningPrizes);
        //console.log('winning prizes', winningPrizes);
      });
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // useEffect(() => {
  //   //console.log('location', location.hash);
  //   console.log('pogprize', pogprize);
  //   getWinningPrizes(pogprize.title).then((winningPrizes) => {
  //     setPrizes(winningPrizes);
  //     //console.log('winning prizes', winningPrizes);
  //   });
  // }, []);

  return (
    <div className="dashboardContainer">
      <Navbar />
      <Grid container spacing={3} style={{ marginTop: '2%' }}>
        <Grid item xs={0.5} />

        <Grid item xs={8}>
          <Grid container direction="column">
            <Grid item xs>
              <h1 className="dashboardTitle">And our PogWinners are...</h1>
            </Grid>
            <Grid
              item
              xs
              style={{
                // padding: '3%',
                // marginTop: '10%',
                backgroundColor: '#232340',
                borderRadius: '20px',
              }}
            >
              {prizes?.map((prize, i) => (
                <div style={{ marginLeft: '24px' }}>
                  <p
                    key={i}
                    className="progressPogprizeTitle"
                    style={{ marginTop: '5%' }}
                  >
                    Prize: {prize.title}
                  </p>
                  <p
                    key={i + 11}
                    className="progressPogprizeDesc"
                    style={{ marginTop: '5%' }}
                  >
                    Winner: {prize.name}
                  </p>
                </div>
              ))}
              <p
                className="dashboardPogprizeText"
                style={{ marginTop: '5%' }}
              ></p>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default PogPrizeEnd;
