import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
// import styles from './Navbar.css';
import { FaHome } from 'react-icons/fa';
import { MdCasino } from 'react-icons/md';
import { IoMdExit } from 'react-icons/io';
import { useLocation } from 'react-router-dom';
import { getUser, logOut } from '../../auth/service';

export default function Nav() {
  const location = useLocation();

  const getNavStyle = (e: String) => {
    if (location.pathname === e) {
      return 'navBarItemActive';
    } else {
      return 'navBarItem';
    }
  };

  const [user, setUser] = useState();

  useEffect(() => {
    getUser().then((user) => {
      // console.log(getAccessToken());
      // console.log(user);
      setUser(user);
    });
  }, []);

  return (
    <div>
      <div className="navbar">
        <div className="navBarProfile">
          <img src={user?.profile_image_url} className="navBarProfileIcon" />
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
        <div className="navBarItem" onClick={logOut}>
          <IoMdExit size={20} />
          <Link to={`/`} replace>
            <p>Log Out</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
