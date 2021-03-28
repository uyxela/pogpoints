import React from 'react';
import styles from './Dashboard.css';
import Navbar from '../../components/ui/Navbar';
import {checkUser} from '../../components/auth/service';
import {getItem} from '../../components/data/Store';

const Dashboard = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <Navbar />
        {/* <button onClick={() => checkUser()} /> */}
      </div>
    </div>
  );
};

export default Dashboard;

