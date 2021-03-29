import React, { useState, useEffect } from 'react';
import { Grid } from '@material-ui/core';
import { MdTimer } from 'react-icons/md';
import Button from '@material-ui/core/Button';
import { checkActivePogprize } from '../../components/auth/service';
import useInterval from '../../components/hooks/useInterval';
import Countdown from 'react-countdown';

const PrizeQueue = (props) => {
  const [pogprize, setPogprize] = useState(null);

  useEffect(() => {
    console.log('pog prize progress');
    checkActivePogprize().then((response) => {
      if (response.status === 200 && response.data.length == 0) {
        setPogprize(null);
      } else if (!response.data[0].active) {
        // go to /pogprize
        setPogprize(null);
      } else {
        setPogprize(response.data[0]);
      }
      console.log(response);
    });
  }, []);

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
  let body;
  pogprize !== null ? (
    (body = (
      <div className="entriesContainer">
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
          <Grid item xs style={{ textAlign: 'center', marginTop: '4%' }}>
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
          <Grid item xs style={{ marginTop: '5%', textAlign: 'center' }}>
            <Button
              className="pogprizeButtonStyle"
              size="large"
              onClick={() => window.close()}
            >
              Close
            </Button>
          </Grid>
        </Grid>
      </div>
    ))
  ) : (
    <div className="entriesContainer">
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
          <p className="progressPogprizeTitle">Title: No Active Pogprize</p>
        </Grid>
        <Grid item xs style={{ marginTop: '5%', textAlign: 'center' }}>
          <Button
            className="pogprizeButtonStyle"
            size="large"
            onClick={() => window.close()}
          >
            Close
          </Button>
        </Grid>
      </Grid>
    </div>
  );
  return <>{body}</>;
};
export default PrizeQueue;
