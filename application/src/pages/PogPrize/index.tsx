import React, { useState, useEffect } from 'react';
import styles from './PogPrize.css';
import Navbar from '../../components/ui/Navbar';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import { Grid } from '@material-ui/core';
import { errorMonitor } from 'stream';
import axios from 'axios';
import env from '../../components/data/env.json'
const PogPrize = () => {

  const [form, setForm] = useState({
    title: '' as String,
    description: '' as String,
    pointsPerEntry: 1 as number,
    prizeDescription: '' as String,
    endsAt: new Date(
      new Date().getTime() - new Date().getTimezoneOffset() * 60000
    )
      .toISOString()
      .split(':')
      .splice(0, 2)
      .join(':') as String,
    numberOfPrizes: 1 as number,
  });

  const [error, setError] = useState({
    title: false,
    description: false,
    pointsPerEntry: false,
    prizeDescription: false,
    endsAt: false,
    numberOfPrizes: false,
  });


  const valerrorHandler = () => {
    let numErrors = 0;
    setError({
      ...error,
      title: (form.title.length < 1)?true:false,
      description:(form.description.length < 1)?true:false,
      numberOfPrizes:(form.numberOfPrizes < 1 || form.numberOfPrizes > 10)?true:false,
      prizeDescription:(form.prizeDescription.length < 1)?true:false,
      pointsPerEntry:(form.pointsPerEntry < 1)?true:false
    })

    if (form.title.length < 1 || form.description.length < 1 || form.numberOfPrizes < 1 || form.numberOfPrizes > 10 || form.prizeDescription.length < 1 || pointsPerEntry < 1) {
      return false;
    }
    return true;
  }

  const handleSubmit = () => {
    if(valerrorHandler()){
      axios.post(`${env.url}/newPogPrize`,JSON.stringify(form)).then(res => {
        console.log(res);
        if (res.status == 201) {
          window.location.replace('/pogprizeprogress');
        } else {
          // error
        }
      })
    }
  }

  const handleNameChange = (e: any) => {
    setError({
      ...error,
      [e.target.id]:false
    })
    setForm({
      ...form,
      [e.target.id]: e.target.value,
    });
  };

  return (
    <div className={styles.container}>
      <Navbar />
      <Grid container spacing={3} style={{ marginTop: '2%' }}>
        <Grid item xs={0.5} />
        <Grid item xs={4}>
          <Grid container direction="column">
            <Grid item xs>
              <h1 className={styles.title}>PogPrizes</h1>
              <p className={styles.text}>Set up draws using PogPrizes</p>
            </Grid>
            <Grid item xs>
              <TextField
                id="prizeDescription"
                label="Prize Description"
                value={form.prizeDescription}
                variant="filled"
                onChange={handleNameChange}
                className={styles.textinput}
                color="primary"
                fullWidth
                error={error.prizeDescription}
              />
            </Grid>
            <Grid item xs>
              <TextField
                id="numberOfPrizes"
                label="Number of prizes (1-10)"
                value={form.numberOfPrizes}
                variant="filled"
                onChange={handleNameChange}
                className={styles.textinput}
                color="primary"
                type="number"
                inputProps={{ min: '1', max: '10', step: '1' }}
                fullWidth
                error={error.numberOfPrizes}
              />
            </Grid>
            <Grid item xs>
              <TextField
                id="pointsPerEntry"
                label="Points per entry"
                value={form.pointsPerEntry}
                variant="filled"
                onChange={handleNameChange}
                className={styles.textinput}
                color="primary"
                type="number"
                fullWidth
                error={error.pointsPerEntry}
              />
            </Grid>
            <Grid item xs>
              <TextField
                id="endsAt"
                label="Ends At"
                value={form.endsAt}
                variant="filled"
                onChange={handleNameChange}
                className={styles.textinput}
                color="primary"
                type="datetime-local"
                defaultValue={form.endsAt}
                inputProps={{
                  min: new Date(
                    new Date().getTime() -
                      new Date().getTimezoneOffset() * 60000
                  )
                    .toISOString()
                    .split(':')
                    .splice(0, 2)
                    .join(':') as String,
                }}
                fullWidth
                error={error.endsAt}
              />
            </Grid>
            <Grid item xs style={{ marginTop: '5%' }}>
              {/* <Link to={`/pogprizeprogress`} replace> */}
                <Button
                  className={styles.buttonStyle}
                  size="large"
                  onClick={handleSubmit}
                >
                  Start
                </Button>
              {/* </Link> */}
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={4}>
          <Grid container direction="column" style={{ marginTop: '50%' }}>
            <Grid item xs>
              <TextField
                id="title"
                label="Title"
                value={form.title}
                variant="filled"
                onChange={handleNameChange}
                color="primary"
                fullWidth
                error={error.title}
              />
            </Grid>
            <Grid item xs>
              <TextField
                id="description"
                label="Description"
                value={form.description}
                variant="filled"
                onChange={handleNameChange}
                className={styles.textinput}
                color="primary"
                fullWidth
                multiline
                rows={8}
                error={error.description}
              />
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
              <p className={styles.textsmall}>History</p>
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
            ></Grid>
          </Grid>
        </Grid>
        <Grid item xs={0.5} />
      </Grid>
    </div>
  );
};

export default PogPrize;
