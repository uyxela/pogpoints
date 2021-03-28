import React from 'react';
import styles from './Start.css';
import TwitchLogo from '../../../assets/images/TwitchGlitchWhite.svg';
import { validateToken } from '../../components/auth/service';
import { authenticate } from '../../components/auth/process';
import {getUser} from '../../components/auth/service'
import {getItem} from '../../components/data/Store'

const Start = () => {
  validateToken().then((valid) => {
    if (valid) {
      window.location.replace('#/dashboard');
    }
  });

  return (
    <div className={styles.container}>
      <div className={styles.content}>
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
      </div>
    </div>
  );
};

export default Start;
