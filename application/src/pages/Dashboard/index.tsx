import React, { useEffect, useState } from 'react';
import styles from './Dashboard.css';
import Navbar from '../../components/ui/Navbar';
import { checkUser } from '../../components/auth/service';
import { getItem } from '../../components/data/Store';
import { Grid } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { MdTimer, MdPeople } from 'react-icons/md';
import {
  getUser,
  getPogPrizes,
  checkActivePogprize,
} from '../../components/auth/service';
import { useHistory } from 'react-router-dom';

const Dashboard = () => {
  const history = useHistory();
  const [user, setUser] = useState();
  const [pogPrizeList, setPogPrizeList] = useState(null);
  const [currentPogPrize, setCurrentPogPrize] = useState(null);
  useEffect(() => {
    getUser().then((user) => {
      setUser(user);
    });
    getPogPrizes().then((data) => {
      console.log(data.data);
      setPogPrizeList(data.data);
    });
    checkActivePogprize().then((response) => {
      console.log(response.data);
      if (response.status === 200 && response.data.length == 0) {
        if (response.data[0].active) {
          setCurrentPogPrize(null);
        }
      }
      setCurrentPogPrize(response.data[0]);
    });
  }, []);
  const totalPogPrizes = () => {
    return pogPrizeList.length;
  };
  const totalEntries = () => {
    let total = 0;
    pogPrizeList.forEach((pogPrize) => {
      total += pogPrize.entries.length;
    });
    return total;
  };
  const totalPoints = () => {
    let total = 0;
    pogPrizeList.forEach((pogPrize) => {
      total += pogPrize.entries.length * pogPrize.pointsPerEntry;
    });
    return total;
  };
  const cardStyle = {
    backgroundColor: 'white',
    borderRadius: '30px',
    // minHeight: '25vh',
    margin: '5%',
    textAlign: 'center',
    alignItems: 'center',
  };
  if (pogPrizeList == null) {
    return <></>;
  }
  let currentPogCard;
  if (currentPogPrize == null) {
    currentPogCard = (
      <p className={styles.cardSub}>No current Pogprizes running.</p>
    );
  } else {
    currentPogCard = (
      <>
        <p className={styles.cardSub}>Active PogPrize:</p>
        <p className={styles.cardMainSmall}>{currentPogPrize.title}</p>
        <Button
          style={{width:'50%',backgroundColor:'#FFA6EB',marginTop:'10%',marginBottom:'20%'}}
          onClick={() => history.push('/pogprizeprogress')}
        >
          View
        </Button>
      </>
    );
  }
  return (
    <div className={styles.container}>
      <Navbar />
      <Grid container spacing={3} style={{ marginTop: '2%' }}>
        <Grid item xs={0.5} />
        <Grid item xs={5}>
          <h1 className={styles.title}>Dashboard</h1>
          <p className={styles.pogprizeTitle}>Hi, {user?.display_name}!</p>
          <p className={styles.pogprizeText} style={{ marginTop: '5%' }}>
            Some quick stats for you:
          </p>
          <Grid container style={{ paddingTop: '5%' }}>
            <Grid item xs>
              <Grid container direction="column">
                <Grid item xs style={cardStyle}>
                  <p className={styles.cardSub}>You have hosted:</p>
                  <p className={styles.cardMain}>{totalPogPrizes()}</p>
                  <p className={styles.cardSub}>PogPrizes</p>
                </Grid>
                <Grid item xs style={cardStyle}>
                  <p className={styles.cardSub}>Viewers redeemed:</p>
                  <p className={styles.cardMain}>{totalPoints()}</p>
                  <p className={styles.cardSub}>Channel Points</p>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs>
              <Grid container direction="column">
                <Grid item xs style={cardStyle}>
                  <p className={styles.cardSub}>Viewers entered:</p>
                  <p className={styles.cardMain}>{totalEntries()}</p>
                  <p className={styles.cardSub}>times</p>
                </Grid>
                <Grid item xs style={cardStyle}>
                  {currentPogCard}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs>
          <Grid container direction="column">
            <Grid item xs style={{ textAlign: 'center' }}>
              <MdTimer size={30} />
              <p className={styles.textsmall}>PogPrize History</p>
            </Grid>
            <Grid item xs style={cardStyle}>
              {/* <p className={styles.cardSub}>Viewers entered:</p>
                  <p className={styles.cardMain}>{totalEntries()}</p>
                  <p className={styles.cardSub}>times</p> */}
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs>
          <Grid container direction="column">
            <Grid item xs style={{ textAlign: 'center' }}>
              <MdPeople size={30} />
              <p className={styles.textsmall}>Leaderboard</p>
            </Grid>
            <Grid item xs style={cardStyle}>
              {/* <p className={styles.cardSub}>Viewers entered:</p>
                  <p className={styles.cardMain}>{totalEntries()}</p>
                  <p className={styles.cardSub}>times</p> */}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;
