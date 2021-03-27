import React from 'react';
import styles from './Start.css';
import TwitchLogo from '../../../assets/images/TwitchGlitchWhite.svg';
<<<<<<< Updated upstream
import { HashRouter, Link } from 'react-router-dom';
=======
import { validateToken } from '../../components/auth/service';
import { Redirect } from 'react-router';
>>>>>>> Stashed changes

const Start = () => {
  if (validateToken()) {
    return <Redirect to="/dashboard" />;
  }

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
<<<<<<< Updated upstream
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
=======
        <div className={styles.login}>
          <div className={styles.button} onClick={() => {}}>
            <p className={styles.text}>Login with Twitch</p>
            <img
              className={styles.logo}
              src={TwitchLogo}
              alt="White Twitch Glitch Logo"
            />
          </div>
        </div>
>>>>>>> Stashed changes
      </div>
    </div>
  );
};

export default Start;
