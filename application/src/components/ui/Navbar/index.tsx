import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Navbar.css';
import DefaultProfile from '../../../../assets/images/default-profile.png';
import { FaHome } from 'react-icons/fa';
import { MdCasino } from 'react-icons/md';
import { useLocation } from 'react-router-dom';

export default function Nav() {
  const location = useLocation();
  const getNavStyle = (e: String) => {
    if (location.pathname === e) {
      return styles.navBarItemActive;
    } else {
      return styles.navBarItem;
    }
  };
  return (
    <div>
      <div className={styles.navbar}>
        <div className={styles.navBarProfile}>
          <img src={DefaultProfile} className={styles.navBarProfileIcon} />
          <h3>John Suckanut</h3>
        </div>
        <div className={getNavStyle('/dashboard')}>
          <FaHome size={20} />
          <Link to={`/dashboard`} replace>
            <p>Dashboard</p>
          </Link>
        </div>
        <div className={getNavStyle('/pogprize')}>
          <MdCasino size={20} />
          <Link to={`/pogprize`} replace>
            <p>PogPrize</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
