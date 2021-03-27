import React, { useState } from 'react';
import styles from './PogPrize.css';
import Navbar from '../../components/ui/Navbar';
import TextField from '@material-ui/core/TextField';

const PogPrize = () => {
  interface Prize {
    title: String,
    description: String,
    value?: number
  }

  const [form, setForm] = useState({
    title: "" as String,
    description: "" as String,
    pointsPerEntry: 1 as number,
    prize: [] as Prize[],
    endsAt: new Date() as Date,
    maxEntries: -1 as number,
    maxEntriesPerViewer: -1 as number,
  })

  const handleNameChange = (e: any) => {
    setForm({
      ...form,
      [e.target.id]: e.target.value
    })
    console.log()
  }

  return (
    <div className={styles.container}>
      <Navbar />
      <div className={styles.content}>

        <div className={styles.row}>
          <h1 className={styles.title}>PogPrizes</h1>
          <p className={styles.text}>
            Set up draws using PogPrizes
          </p>

          <TextField
            id="title"
            label="Title"
            value={form.title}
            variant="outlined"
            onChange={handleNameChange}
            className={styles.textinput}
          />
          <TextField
            id="description"
            label="Description"
            value={form.description}
            variant="outlined"
            onChange={handleNameChange}
            className={styles.textinput}
          />
          <TextField
            id="title"
            label="Title"
            value={form.title}
            variant="outlined"
            onChange={handleNameChange}
            className={styles.textinput}
          />
        </div>

        <div className={styles.row}>
          placeholder
        </div>
      </div>
    </div>
  );
};

export default PogPrize;

