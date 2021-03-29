import React from 'react';
// import styles from './Start.css';
import TwitchLogo from '../../../assets/images/TwitchGlitchWhite.svg';
import PogPoints from '../../../assets/images/pogpoints-image.png';
import { validateToken } from '../../components/auth/service';
import { authenticate } from '../../components/auth/process';
import { getUser } from '../../components/auth/service';
import { getItem } from '../../components/data/Store';

const Start = () => {
  validateToken().then((valid) => {
    if (valid) {
      window.location.replace('#/dashboard');
    }
  });

  return (
    <div className="startContainer">
      <div className="startContent">
        <div className="startDescription">
          <h1 className="startTitle">POGPOINTS</h1>
          <p className="startText">
            PogPoints gives you new ways to interact with your audience through
            giveaways and draws using Twitch Channel Points.
          </p>
        </div>
        <div className="startLogin">
          <div
            style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              marginBottom: '20px',
              marginTop: '-40px',
            }}
          >
            <img src={PogPoints} alt="PogPoints" style={{ height: '200px' }} />
          </div>

          <div className="startButton" onClick={authenticate}>
            <p className="startText">Login with Twitch</p>
            <img
              className="startLogo"
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
