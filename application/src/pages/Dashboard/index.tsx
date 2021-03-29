import React, { useEffect, useState } from 'react';
import styles from './Dashboard.css';
import Navbar from '../../components/ui/Navbar';

import { Grid } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { MdTimer, MdPeople } from 'react-icons/md';
import {
  getUser,
  getPogPrizes,
  checkActivePogprize,
  getPrizes,
} from '../../components/auth/service';
import { redeemReward } from '../../components/auth/process';
import { useHistory } from 'react-router-dom';

const Dashboard = () => {
  const history = useHistory();
  const [user, setUser] = useState();
  const [pogPrizeList, setPogPrizeList] = useState(null);
  const [currentPogPrize, setCurrentPogPrize] = useState(null);
  const [prizeList, setPrizeList] = useState(null);
  useEffect(() => {
    getUser().then((response) => {
      console.log(response);
      setUser(response);
    });
    getPogPrizes().then((response) => {
      console.log(response.data);
      setPogPrizeList(response.data);
    });
    checkActivePogprize().then((response) => {
      console.log(response.data);
      if (response.status === 200 && response.data.length == 0) {
        if (response.data[0] && response.data[0].active) {
          setCurrentPogPrize(null);
        }
      }
      setCurrentPogPrize(response.data[0]);
    });
    getPrizes().then((response) => {
      console.log(response.data);
      setPrizeList(response.data);
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
    borderRadius: '20px',
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
          style={{
            width: '50%',
            backgroundColor: '#FFA6EB',
            marginTop: '10%',
            marginBottom: '20%',
          }}
          onClick={() => history.push('/pogprizeprogress')}
        >
          View
        </Button>
      </>
    );
  }
  let pastPrizes;

  const fulfillReward = (name, title) => {
    redeemReward({ name: name, title: title });
  };

  const redemptionButton = (status, name, title) => {
    if (status == 'Unfulfilled') {
      return (
        <>
          <Grid item xs style={{textAlign:'center'}}>
            <Button size="small" style={{marginTop:'2%',marginBottom:'-2%'}} onClick={() => fulfillReward(name, title)}>
              Fulfill
            </Button>
          </Grid>
        </>
      );
    }
    return null;
  };

  if (prizeList.length > 0) {
    console.log(prizeList[0].status);
    pastPrizes = prizeList.map((prize, i) => (
      // <p className={styles.cardSub}>No past prizes.</p>;
      <>
        <p className={styles.cardMainPP}>
          {i + 1}. {prize.title}
        </p>
        <p className={styles.cardSubPP}>
          <b>Status: </b>
          {prize.status}
        </p>
        <p className={styles.cardSubPP}>
          <b>Winner: </b>
          {prize.name}
        </p>
        {redemptionButton(prize.status, prize.name, prize.title)}
      </>
    ));
  } else {
    pastPrizes = <p className={styles.cardMainPP}>No past prizes.</p>;
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
              <p className={styles.textsmall}>Past PogPrizes</p>
            </Grid>
            <Grid
              item
              xs
              style={{
                ...cardStyle,
                textAlign: 'left',
                paddingLeft: '10%',
                paddingRight: '10%',
                paddingBottom: '10%',
              }}
            >
              {pastPrizes}
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
