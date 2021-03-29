import React, { useState, useEffect } from 'react';
import { Grid } from '@material-ui/core';
import { MdTimer } from 'react-icons/md';
import Button from '@material-ui/core/Button';
import { getPrizes,redeemReward } from '../../components/auth/service';
import useInterval from '../../components/hooks/useInterval';

const PrizeQueue = (props) => {
  const [prizeList, setPrizeList] = useState(null);
  const fulfillReward = (name, title) => {
    redeemReward(title, name);
    getPrizes().then((response) => {
      console.log(response.data);
      setPrizeList(response.data);
    });
  };
  useEffect(() => {
    getPrizes().then((response) => {
      // console.log(response.data);
      setPrizeList(response.data);
    });
  }, []);
  const redemptionButton = (status, name, title) => {
    if (status == 'Unfulfilled') {
      return (
        <>
          <Grid item xs style={{ textAlign: 'center' }}>
            <Button
              size="small"
              style={{ marginTop: '2%', marginBottom: '-2%' }}
              onClick={() => fulfillReward(name, title)}
            >
              Fulfill
            </Button>
          </Grid>
        </>
      );
    } else {
      return (
        <>
          <Grid item xs style={{ textAlign: 'center' }}>
            <Button
              size="small"
              style={{
                marginTop: '2%',
                marginBottom: '-2%',
                backgroundColor: 'white',
              }}
            >
              Fulfilled
            </Button>
          </Grid>
        </>
      );
    }
  };
  let pastPrizes;
  if (prizeList?.length > 0) {
    console.log(prizeList[0].status);
    pastPrizes = prizeList.map((prize, i) => (
      // <p className="dashboardCardSub">No past prizes.</p>;
      <>
        <p className="dashboardCardMainPP">
          {i + 1}. {prize.title}
        </p>
        <p className="dashboardCardSubPP" style={{ margin: '10px' }}>
          <b>Winner: </b>
          {prize.name}
        </p>
        {redemptionButton(prize.status, prize.name, prize.title)}
      </>
    ));
  } else {
    pastPrizes = <p className="dashboardCardMainPP">No past prizes.</p>;
  }

  return (
    <div className="entriesContainer">
      <Grid item xs style={{ textAlign: 'center' }}>
        <MdTimer size={30} />
        <p className="progressTextsmall">Prize Queue</p>
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
          {pastPrizes}
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
export default PrizeQueue;
