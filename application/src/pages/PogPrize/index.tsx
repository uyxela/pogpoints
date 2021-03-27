import React, { useState } from 'react';
import styles from './PogPrize.css';
import Navbar from '../../components/ui/Navbar';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

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
      <div className={styles.minicontainer}>
        <h1 className={styles.title}>PogPrizes</h1>
        <p className={styles.text}>Set up draws using PogPrizes</p>
      </div>

      <div className={styles.content}>
        <div className={styles.column}>
          <TextField
            id="title"
            label="Title"
            value={form.title}
            variant="filled"
            onChange={handleNameChange}
            color="primary"
            style={{ marginTop: '5%' }}
            fullWidth
          />
          <TextField
            id="pointsPerEntry"
            label="Points per entry"
            value={form.pointsPerEntry}
            variant="filled"
            onChange={handleNameChange}
            className={styles.textinput}
            color="primary"
            fullWidth
          />
          <TextField
            id="prize"
            label="Prize"
            value={form.prize}
            variant="filled"
            onChange={handleNameChange}
            className={styles.textinput}
            color="primary"
            fullWidth
          />
          <TextField
            id="endsAt"
            label="Duration (Minutes)"
            value={form.endsAt}
            variant="filled"
            onChange={handleNameChange}
            className={styles.textinput}
            color="primary"
            type="date"
            fullWidth
          />
          <Link to={`/pogprizeprogress`} replace>
          <Button className={styles.buttonStyle} size="large">
            Start
          </Button>
          </Link>
        </div>

        <div className={styles.column}>
          <TextField
            id="maxEntries"
            label="Max Entries Total"
            value={form.maxEntries}
            variant="filled"
            onChange={handleNameChange}
            color="primary"
            style={{ marginTop: '5%' }}
            fullWidth
          />
          <TextField
            id="maxEntriesPerViewer"
            label="Max Entries Per Viewer"
            value={form.maxEntriesPerViewer}
            variant="filled"
            onChange={handleNameChange}
            className={styles.textinput}
            color="primary"
            fullWidth
          />
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

        </div>
      </div>
    </div>
  );
};

export default PogPrize;
