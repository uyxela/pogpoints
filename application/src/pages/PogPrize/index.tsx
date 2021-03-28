import React, { useState } from 'react';
import styles from './PogPrize.css';
import Navbar from '../../components/ui/Navbar';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import { Grid } from '@material-ui/core';

const PogPrize = () => {
  interface Prize {
    title: String;
    description: String;
    value?: number;
  }

  const [form, setForm] = useState({
    title: '' as String,
    description: '' as String,
    pointsPerEntry: 1 as number,
    prize: [] as Prize[],
    endsAt: new Date(new Date().getTime() - (new Date().getTimezoneOffset() * 60000)).toISOString().split(':').splice(0,2).join(':') as String,
    numPrizes: 1 as number,
  });

  const handleNameChange = (e: any) => {
    console.log(e.target.value);
    if (e.target.id === 'numPrizes') {
      if (e.target.value > 10) {
        setForm({
          ...form,
          [e.target.id]: 10,
        });
      } else if (e.target.value < 1) {
        setForm({
          ...form,
          [e.target.id]: 1,
        });
      } else {
        setForm({
          ...form,
          [e.target.id]: e.target.value,
        });
      }
    } else {
      setForm({
        ...form,
        [e.target.id]: e.target.value,
      });
    }
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
                id="prize"
                label="Prize Description"
                value={form.prize}
                variant="filled"
                onChange={handleNameChange}
                className={styles.textinput}
                color="primary"
                fullWidth
              />
            </Grid>
            <Grid item xs>
              <TextField
                id="numPrizes"
                label="Number of prizes (1-10)"
                value={form.numPrizes}
                variant="filled"
                onChange={handleNameChange}
                className={styles.textinput}
                color="primary"
                type="number"
                inputProps={{ min: '1', max: '10', step: '1' }}
                fullWidth
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
                inputProps={{min:new Date(new Date().getTime() - (new Date().getTimezoneOffset() * 60000)).toISOString().split(':').splice(0,2).join(':') as String}}
                fullWidth
              />
            </Grid>
            <Grid item xs style={{ marginTop: '5%' }}>
              <Link to={`/pogprizeprogress`} replace>
                <Button className={styles.buttonStyle} size="large">
                  Start
                </Button>
              </Link>
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
