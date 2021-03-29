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
import { setItem } from '../../components/data/Store';

const Entries = (props) => {
  const [entries, setEntries] = useState([])
  const [isRunning, setIsRunning] = useState(true);
  const delay = 2000;
  useInterval(
    () => {
      getEntries().then((val) => {
        setEntries(val);
      });
    },
    isRunning ? delay : null
  );
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
  return (
    <div className="progressContainer">
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
        <div
          className="progressEntriesThing"
          style={{ overflow: 'scroll', height: '70vh' }}
        >
          {entrylist}
        </div>
      </Grid>
    </div>
  );
};
export default Entries;
