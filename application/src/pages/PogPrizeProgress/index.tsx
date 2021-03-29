import React, { useState, useEffect } from 'react';
import styles from './PogPrizeProgress.css';
import Navbar from '../../components/ui/Navbar';
import { Grid } from '@material-ui/core';
import { MdTimer } from 'react-icons/md';
import { MdPeople } from 'react-icons/md';
import Button from '@material-ui/core/Button';
import { AiFillTag } from 'react-icons/ai';
import { getUserID } from '../../components/auth/service';
import axios from 'axios';
import env from '../../components/data/env.json';
import { checkActivePogprize, getEntries } from '../../components/auth/service';
import { useHistory } from 'react-router-dom';
import Countdown from 'react-countdown';
import useInterval from '../../components/hooks/useInterval';

const PogPrizeProgress = () => {
  const [pogprize, setPogprize] = useState(null);
  const [isRunning, setIsRunning] = useState(true);
  const [entries, setEntries] = useState([]);
  const delay = 2000;
  const history = useHistory();

  useEffect(() => {
    console.log('pog prize progress');
    checkActivePogprize().then((response) => {
      if (response.status === 200 && response.data.length == 0) {
        if (!response.data[0].active) {
          // go to /pogprize
          history.push('/pogprize');
        }
      }
      console.log(response);
      setPogprize(response.data[0]);
    });
  }, []);

  useInterval(
    () => {
      getEntries().then((val) => {
        setEntries(val);
      });
    },
    isRunning ? delay : null
  );

  if (pogprize == null) {
    return <></>;
  }

  let entrylist;
  if (entries.length > 0) {
    entrylist = entries.map((data, i) => (
      <p className={styles.cardSub}>
        {i + 1}. {data.viewer}
      </p>
    ));
  } else {
    entrylist = <p className={styles.cardSub}>No entries yet :(</p>;
  }
  const Completed = () => <p className={styles.cardMain}>Draw Over!</p>;

  const timerenderer = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
      // Render a completed state
      return <Completed />;
    } else {
      // Render a countdown
      return (
        <p className={styles.cardMain}>
          {hours}:{minutes}:{seconds}
        </p>
      );
    }
  };
  return (
    <div className={styles.container}>
      <Navbar />
      <Grid container spacing={3} style={{ marginTop: '2%' }}>
        <Grid item xs={0.5} />
        <Grid item xs={5}>
          <Grid container direction="column" >
            <Grid item xs>
              <h1 className={styles.title}>PogPrize</h1>
              <p className={styles.text}>In Progress</p>
            </Grid>
            <Grid item xs style={{
                padding: '3%',
                marginTop:'10%',
                backgroundColor: '#232340',
                borderRadius: '30px',
              }}>
              <p className={styles.pogprizeTitle}>Title: {pogprize.title}</p>
              <p className={styles.pogprizeDesc}>
                Prompt: {pogprize.description}
              </p>
              <p className={styles.pogprizeText}>
                Description: {pogprize.prizeDescription}
              </p>
            </Grid>
            <Grid item xs style={{ marginTop: '10%',textAlign:'center' }}>
              {/* <Link to={`/pogprizeprogress`} replace> */}
              <Button
                className={styles.buttonStyle}
                // size="large"
              >
                Shutdown
              </Button>
              {/* </Link> */}
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs>
          <Grid
            container
            direction="column"
            justify="flex-start"
            alignItems="stretch"
            style={{minHeight:'80vh'}}
          >
            <Grid item xs style={{ textAlign: 'center' }}>
              <MdTimer size={30} />
              <p className={styles.textsmall}>Timer</p>
            </Grid>
            <Grid
              item
              xs
              style={{
                marginTop: '3%',
                textAlign: 'center',
                backgroundColor: 'white',
                borderRadius: '30px',
              }}
            >
              <p className={styles.cardSub}>Draw ends in:</p>

              <Countdown
                date={Date.parse(
                  new Date(pogprize.endsAt).toLocaleString('en-US', {
                    timeZone: 'UTC',
                  })
                )}
                renderer={timerenderer}
              />
              <p className={styles.cardSub}>minutes</p>
              <p className={styles.cardSub}>at</p>
              <p className={styles.cardSub}>
                {new Date(pogprize.endsAt)
                  .toLocaleString('en-US', { timeZone: 'UTC' })
                  .split(':')
                  .splice(0, 2)
                  .join(':')
                  .concat(' PM')}
              </p>
            </Grid>
            <Grid item xs style={{ textAlign: 'center', marginTop: '15%' }}>
              <AiFillTag size={30} />
              <p className={styles.textsmall}>Points</p>
            </Grid>
            <Grid
              item
              xs
              style={{
                marginTop: '3%',
                textAlign: 'center',
                backgroundColor: 'white',
                borderRadius: '30px',
              }}
            >
              <p className={styles.cardSub}>Total points spent:</p>
              <p className={styles.cardMain}>
                {pogprize.pointsPerEntry * entries.length}
              </p>
              <p className={styles.cardSub}>points</p>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs>
          <Grid
            container
            direction="column"
            justify="flex-start"
            alignItems="stretch"
          >
            <Grid item xs style={{ textAlign: 'center' }}>
              <MdPeople size={30} />
              <p className={styles.textsmall}>Top Entrants</p>
            </Grid>
            <Grid
              item
              xs
              style={{
                marginTop: '3%',
                textAlign: 'center',
                backgroundColor: 'white',
                borderRadius: '30px',
                minHeight: '70vh',
              }}
            >
              {entrylist}
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={0.5} />
      </Grid>
    </div>
  );
};

export default PogPrizeProgress;
