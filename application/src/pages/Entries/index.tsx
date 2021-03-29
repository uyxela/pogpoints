import React, { useState } from 'react';
import { Grid } from '@material-ui/core';
import { MdPeople } from 'react-icons/md';
import Button from '@material-ui/core/Button';
import {
  getEntries,
} from '../../components/auth/service';
import useInterval from '../../components/hooks/useInterval';

const Entries = (props) => {
  const [entries, setEntries] = useState([]);
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
    <div className="entriesContainer">
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
      <Grid item xs style={{ marginTop: '5%', textAlign: 'center' }}>
        <Button
          className="pogprizeButtonStyle"
          size="large"
          onClick={() => window.close()}
        >
          Close
        </Button>
      </Grid>
    </div>
  );
};
export default Entries;
