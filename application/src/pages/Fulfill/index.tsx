import React from 'react';
import styles from './Fulfill.css';
import TwitchLogo from '../../../assets/images/TwitchGlitchWhite.svg';
import { validateToken } from '../../components/auth/service';
import { authenticate } from '../../components/auth/process';
import { getItem } from '../../components/data/Store';
import { Grid } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import {
  getUser,
  getPogPrizes,
  checkActivePogprize,
  getPrizes,
} from '../../components/auth/service';
import { redeemReward } from '../../components/auth/process';
import { useParams, Link } from 'react-router-dom';
const Fulfill = () => {
  const params = useParams();
  console.log(JSON.stringify(params));

  // const fulfillReward = (title,name) => {

  // }

  return (
    <div className={styles.container}>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="stretch"
        spacing={3}
      >
        <Grid item xs>
          <Grid
            container
            direction={'column'}
            justify="center"
            alignContent="stretch"
          >
            <Grid item xs>
              <p className={styles.title}>Redeem PogPrize Win</p>
              <p className={styles.pogprizeTitle}>{params.title}</p>
              <p className={styles.pogprizeDesc}>{params.name}</p>
            </Grid>
            <Grid item xs>
              {/* <Link to={'http://localhost/callback'}> */}
                <Button>Fulfill</Button>
              {/* </Link> */}
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      {/* <div className={styles.content}>
        <div className={styles.description}>
          <h1 className={styles.title}>POGPOINTS</h1>
          <p className={styles.text}>
            PogPoints gives you new ways to interact with your audience through
            giveaways and draws using Twitch Channel Points.
          </p>
        </div>
        <div className={styles.login}>
          <div className={styles.button} onClick={authenticate}>
            <p className={styles.text}>Login with Twitch</p>
            <img
              className={styles.logo}
              src={TwitchLogo}
              alt="White Twitch Glitch Logo"
            />
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default Fulfill;
