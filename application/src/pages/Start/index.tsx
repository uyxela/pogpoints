import React from 'react';
import styles from './Start.css';
import TwitchLogo from '../../../assets/images/TwitchGlitchWhite.svg';
import { HashRouter, Link } from 'react-router-dom';

const Start = () => {
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
            <Link to={`/dashboard`}>
              <div className={styles.button}>
                <p className={styles.text}>Login with Twitch</p>
                <img
                  className={styles.logo}
                  src={TwitchLogo}
                  alt="White Twitch Glitch Logo"
                />
              </div>
            </Link>
          </div>
      </div>
    </div>
  );
};

export default Start;
