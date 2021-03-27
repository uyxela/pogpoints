import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Navbar.css';

export default function Nav() {
  return (
    <div className={styles.navbarContainer}>
      <Link to={`/`}>
        <button type="button">Home</button>
      </Link>
      <Link to={`/dashboard`}>
        <button type="button">Dashboard</button>
      </Link>
    </div>
  );
}
