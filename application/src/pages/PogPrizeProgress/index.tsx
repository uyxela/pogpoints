import React, { useState } from 'react';
import styles from './PogPrizeProgress.css';
import Navbar from '../../components/ui/Navbar';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Grid } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { MdTimer } from 'react-icons/md';
import { MdPeople } from 'react-icons/md';
import { AiFillTag} from 'react-icons/ai';
const PogPrizeProgress = () => {
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
    maxEntries: -1 as number,
    maxEntriesPerViewer: -1 as number,
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
      <Grid container spacing={3} style={{marginTop:"2%"}}>
      <Grid item xs={0.5}/>
        <Grid item xs={5}>
          <Grid container direction="column">
            <Grid item xs >
              <h1 className={styles.title}>PogPrizes</h1>
              <p className={styles.text}>Set up draws using PogPrizes</p>
            </Grid>

            <Grid item xs>
              <p className={styles.text}>*Name</p>
              <p className={styles.textsmall}>*Description</p>
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
            <Grid item xs style={{textAlign:"center"}}>
              <MdTimer size={30} />
              <p className={styles.textsmall}>Timer</p>
            </Grid>
            <Grid item xs style={{marginTop:"3%",textAlign:"center", backgroundColor:"white", borderRadius:"30px"}}>
              <p className={styles.cardSub}>Draw ends in:</p>
              <p className={styles.cardMain}>xx:xx</p>
              <p className={styles.cardSub}>minutes</p>
            </Grid>
            <Grid item xs style={{textAlign:"center", marginTop:"15%"}}>
              <AiFillTag size={30} />
              <p className={styles.textsmall}>Points</p>
            </Grid>
            <Grid item xs style={{marginTop:"3%",textAlign:"center", backgroundColor:"white", borderRadius:"30px"}}>
              <p className={styles.cardSub}>Total points spent:</p>
              <p className={styles.cardMain}>x</p>
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
            <Grid item xs style={{textAlign:"center"}}>
              <MdPeople size={30} />
              <p className={styles.textsmall}>Top Entrants</p>
            </Grid>
            <Grid item xs style={{marginTop:"3%",textAlign:"center", backgroundColor:"white", borderRadius:"30px"}}>
              <p className={styles.cardMain}>1. user</p>
              <p className={styles.cardSub}>user1</p>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={0.5}/>
      </Grid>
    </div>
  );
};

export default PogPrizeProgress;
