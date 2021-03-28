import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Navbar.css';
import DefaultProfile from '../../../../assets/images/default-profile.png';
import { FaHome } from 'react-icons/fa';
import { MdCasino } from 'react-icons/md';
import { GiShipWheel } from 'react-icons/gi';
import { useLocation } from 'react-router-dom';
import { getUser } from '../../auth/service';

export default function Nav() {
  const location = useLocation();

  const getNavStyle = (e: String) => {
    if (location.pathname === e) {
      return styles.navBarItemActive;
    } else {
      return styles.navBarItem;
    }
  };

  const [user, setUser] = useState();

  useEffect(() => {
    getUser().then((user) => {
      // console.log(getAccessToken());
      console.log(user);
      setUser(user);
    });
  }, []);

  return (
    <div>
      <div className={styles.navbar}>
        <div className={styles.navBarProfile}>
          <img
            src={user?.profile_image_url}
            className={styles.navBarProfileIcon}
          />
          <h3>{user?.display_name}</h3>
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
        <div className={getNavStyle('/pogspin')}>
          <GiShipWheel size={20} />
          <Link to={`/pogspin`} replace>
            <p>PogSpin</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
