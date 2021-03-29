import React, { useState, useEffect } from 'react';
// import styles from './PogPrizeProgress.css';
import Navbar from '../../components/ui/Navbar';
import { Grid } from '@material-ui/core';
import { MdTimer } from 'react-icons/md';
import { MdPeople } from 'react-icons/md';
import Button from '@material-ui/core/Button';
import { AiFillTag } from 'react-icons/ai';
// import { getUserID } from '../../components/auth/service';
// import axios from 'axios';
// import env from '../../components/data/env.json';
import {
  checkActivePogprize,
  getEntries,
  drawPogprize,
} from '../../components/auth/service';
import { useHistory } from 'react-router-dom';
import Countdown from 'react-countdown';
import useInterval from '../../components/hooks/useInterval';

const PogPrizeProgress = props => {
  const [pogprize, setPogprize] = useState(null);
  const [isRunning, setIsRunning] = useState(true);
  const [entries, setEntries] = useState([]);
  const delay = 2000;
  const history = useHistory();

  useEffect(() => {
    console.log('pog prize progress');
    checkActivePogprize().then((response) => {
      if (response.status === 200 && response.data.length == 0) {
        history.push('/pogprize');
      }
      else if (!response.data[0].active) {
        // go to /pogprize
        history.push('/pogprize');
      }
      else {
        setPogprize(response.data[0]);
      }
      console.log(response);

    });
  }, []);

  useInterval(
    () => {
      getEntries().then((val) => {
        setEntries(val);
      });
      // if (new Date(pogprize?.endsAt) - new Date() < 0) {
      //   // drawPogprize();
      //   console.log('draw!');
      // }
    },
    isRunning ? delay : null
  );

  if (pogprize == null) {
    return <></>;
  }

  let entrylist;
  if (entries.length > 0) {
    entrylist = entries.map((data, i) => (
      <p className="progressCardSub">
        {i + 1}: {data.name}
      </p>
    ));
  } else {
    entrylist = <p className="progressCardSub">No entries yet :(</p>;
  }
  const Completed = () => <p className="progressCardMain">Draw Over!</p>;

  const timerenderer = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
      // Render a completed state
      return <Completed />;
    } else {
      // Render a countdown

      return (
        <p className="progressCardMain">
          {('0' + hours).slice(-2)}:{('0' + minutes).slice(-2)}:
          {('0' + seconds).slice(-2)}
        </p>
      );
    }
  };
  return (
    <div className="progressContainer">
      <Navbar />
      <Grid container spacing={3} style={{ marginTop: '2%' }}>
        <Grid item xs={0.5} />
        <Grid item xs={5}>
          <Grid container direction="column">
            <Grid item xs>
              <h1 className="progressTitle">PogPrize</h1>
              <p className="progressText">In Progress</p>
            </Grid>
            <Grid
              item
              xs
              style={{
                padding: '3%',
                marginTop: '10%',
                backgroundColor: '#232340',
                borderRadius: '20px',
              }}
            >
              <p className="progressPogprizeTitle">Title: {pogprize.title}</p>
              <p className="progressPogprizeDesc">
                Prompt: {pogprize.description}
              </p>
              <p className="progressPogprizeText">
                Description: {pogprize.prizeDescription}
              </p>
            </Grid>
            <Grid item xs style={{ marginTop: '10%', textAlign: 'center' }}>
              {/* <Link to={`/pogprizeprogress`} replace> */}
              <Button
                className="progressButtonStyle"
                // size="large"
                onClick={() => {
                  drawPogprize();
                  setIsRunning(false);
                  history.push({pathname:'/pogprizeend',state:{pogPrize:pogprize}})
                }}
              >
                PogStop
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
            style={{ minHeight: '80vh' }}
          >
            <Grid item xs style={{ textAlign: 'center' }}>
              <MdTimer size={30} />
              <p className="progressTextsmall">Timer</p>
            </Grid>
            <Grid
              item
              xs
              style={{
                marginTop: '3%',
                textAlign: 'center',
                backgroundColor: 'white',
                borderRadius: '20px',
              }}
            >
              <p className="progressCardSub">Draw ends in:</p>

              <Countdown
                date={Date.parse(
                  new Date(pogprize.endsAt).toLocaleString('en-US', {
                    timeZone: 'UTC',
                  })
                )}
                renderer={timerenderer}
              />
              <p className="progressCardSub">minutes</p>
              <p className="progressCardSub">at</p>
              <p className="progressCardSub">
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
              <p className="progressTextsmall">Points</p>
            </Grid>
            <Grid
              item
              xs
              style={{
                marginTop: '3%',
                textAlign: 'center',
                backgroundColor: 'white',
                borderRadius: '20px',
              }}
            >
              <p className="progressCardSub">Total points spent:</p>
              <p className="progressCardMain">
                {pogprize.pointsPerEntry * entries.length}
              </p>
              <p className="progressCardSub">points</p>
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
              <p className="progressTextsmall">Pogprize Entries</p>
            </Grid>
            <Grid
              item
              xs
              style={{
                marginTop: '3%',
                textAlign: 'center',
                backgroundColor: 'white',
                borderRadius: '20px',
                minHeight: '70vh',
              }}
            >
              <div className="progressEntriesThing" style={{ overflow: 'scroll', height: '70vh' }}>
                {entrylist}
              </div>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={0.5} />
      </Grid>
    </div>
  );
};

export default PogPrizeProgress;
