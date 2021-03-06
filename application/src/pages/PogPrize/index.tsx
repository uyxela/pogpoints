import React, { useState, useEffect } from 'react';
//import styles from './PogPrize.css';
import Navbar from '../../components/ui/Navbar';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import { Grid } from '@material-ui/core';
import axios from 'axios';
import env from '../../components/data/env.json';
import {
  getUserID,
  checkActivePogprize,
  getAccessToken,
} from '../../components/auth/service';
import { useHistory } from 'react-router-dom';

const PogPrize = () => {
  const history = useHistory();
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
    broadcaster: '' as String,
    accessToken: '' as String,
    active: false as Boolean,
  });
  const [buttonPressed, setButtonPressed] = useState(false);

  useEffect(() => {
    checkActivePogprize().then((res: any) => {
      // console.log(res)
      if (res.data.length !== 0) {
        if (res.data[0].active) {
          // history.push('/pogprizeprogress');
        }
      }
    });

    getUserID().then((userid) => {
      console.log(userid, getAccessToken());
      setForm({
        ...form,
        broadcaster: userid,
        accessToken: getAccessToken(),
      });
    });
  }, []);

  const [error, setError] = useState({
    title: false,
    description: false,
    pointsPerEntry: false,
    prizeDescription: false,
    endsAt: false,
    numberOfPrizes: false,
  });

  const valerrorHandler = () => {
    setError({
      ...error,
      title: form.title.length < 1 ? true : false,
      description: form.description.length < 1 ? true : false,
      numberOfPrizes:
        form.numberOfPrizes < 1 || form.numberOfPrizes > 10 ? true : false,
      prizeDescription: form.prizeDescription.length < 1 ? true : false,
      pointsPerEntry: form.pointsPerEntry < 1 ? true : false,
    });

    if (
      form.title.length < 1 ||
      form.description.length < 1 ||
      form.numberOfPrizes < 1 ||
      form.numberOfPrizes > 10 ||
      form.prizeDescription.length < 1 ||
      form.pointsPerEntry < 1
    ) {
      return false;
    } else {
      return true;
    }
  };

  const handleSubmit = () => {
    if (valerrorHandler()) {
      console.log(error);
      let formData = {
        ...form,
        pointsPerEntry: parseInt(form.pointsPerEntry),
        numberOfPrizes: parseInt(form.numberOfPrizes),
        start: new Date(
          new Date().getTime() - new Date().getTimezoneOffset() * 60000
        )
          .toISOString()
          .split(':')
          .splice(0, 2)
          .join(':'),
        active: setActive(form.endsAt),
        //endsAt: Date.parse(form.endsAt)
      };

      axios
        .post(`${env.url}/newPogPrize`, formData, {
          headers: {
            'Content-Type': 'application/json',
          },
        })
        .then((res) => {
          console.log(res);
          if (res.status == 201) {
            axios
              .post(
                `${env.url}/createWebhook/${form.broadcaster}`,
                {
                  accessToken: form.accessToken,
                },
                {
                  headers: {
                    'Content-Type': 'application/json',
                  },
                }
              )
              .then((res1) => {
                console.log(res1);
                history.push('/pogprizeprogress');
              })
              .catch((error) => {
                console.log(error);
              });
          } else {
            // error
            console.log(res);
          }
        });
    }
  };

  const handleNameChange = (e: any) => {
    setError({
      ...error,
      [e.target.id]: false,
    });
    setForm({
      ...form,
      [e.target.id]: e.target.value,
    });
  };

  const setActive = (end) => {
    if (
      Date.parse(
        new Date(end).toLocaleString('en-US', {
          timeZone: 'UTC',
        })
      ) -
        Date.now() >
      0
    ) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <div className="pogprizeContainer">
      <Navbar />
      <Grid
        container
        spacing={3}
        style={{ marginTop: '2%' }}
        direction="column"
      >
        <Grid item xs style={{ marginLeft: '5%' }}>
          <h1 className="pogprizeTitle" style={{ marginLeft: '0' }}>
            PogPrize
          </h1>
          <p className="pogprizeText">Set up draws using PogPrizes</p>
        </Grid>
        <Grid item xs>
          <Grid container direction="row">
            <Grid item xs={5} style={{ padding: '3%', marginLeft: '2%' }}>
              <Grid item xs>
                <TextField
                  id="prizeDescription"
                  label="Prize Description"
                  value={form.prizeDescription}
                  variant="filled"
                  onChange={handleNameChange}
                  className="pogprizeTextinput"
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
                  className="pogprizeTextinput"
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
                  className="pogprizeTextinput"
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
                  className="pogprizeTextinput"
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
            </Grid>
            <Grid item xs={5} style={{ padding: '3%' }}>
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
                  className="pogprizeTextinput"
                  color="primary"
                  spellCheck={false}
                  fullWidth
                  multiline
                  rows={4}
                  error={error.description}
                />
              </Grid>
              <Grid item xs style={{ marginTop: '5%' }}>
                {/* <Link to={`/pogprizeprogress`} replace> */}
                <Button
                  className="pogprizeButtonStyle"
                  size="large"
                  onClick={handleSubmit}
                >
                  Start
                </Button>
                {/* </Link> */}
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        {/* </Grid> */}

        {/*
        <Grid item xs>
          <Grid
            container
            direction="column"
            justify="flex-start"
            alignItems="stretch"
          >
            <Grid item xs style={{ textAlign: 'center' }}>
              <p className="pogprizeTextsmall">History</p>
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
            ></Grid>
          </Grid>
        </Grid> */}
        <Grid item xs={0.5} />
      </Grid>
    </div>
  );
};

export default PogPrize;
