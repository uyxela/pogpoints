import React from 'react';
import styles from './Dashboard.css';
import Navbar from '../../components/ui/Navbar';
const Dashboard = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <Navbar />
      </div>
    </div>
  );
};

export default Dashboard;

