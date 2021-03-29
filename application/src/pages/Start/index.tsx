import React from 'react';
// import styles from './Start.css';
import TwitchLogo from '../../../assets/images/TwitchGlitchWhite.svg';
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
