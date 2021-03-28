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
    endsAt: new Date() as Date,
    numPrizes: 1 as number,
  });

  const handleNameChange = (e: any) => {
    setForm({
      ...form,
      [e.target.id]: e.target.value,
    });
    console.log();
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
                InputProps={{ inputProps: { min: 1, max: 10 } }}
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
      {/* <div className={styles.minicontainer}>
        <h1 className={styles.title}>PogPrizes</h1>
        <p className={styles.text}>Set up draws using PogPrizes</p>
      </div>

      <div className={styles.content}>
        <div className={styles.column}>

          <Link to={`/pogprizeprogress`} replace>
          <Button className={styles.buttonStyle} size="large">
            Start
          </Button>
          </Link>
        </div>

        <div className={styles.column}>


        </div>
      </div> */}
    </div>
  );
};

export default PogPrize;
