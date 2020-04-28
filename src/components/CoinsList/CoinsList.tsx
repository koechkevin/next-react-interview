import React, { FC } from 'react';
import { Coin, Props } from './CoinsList.interface';
import useStyles from './CoinsList.styles';
import { Typography } from '@material-ui/core';
import { SingleCoinElement } from '../SingleCoinElement';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

const CoinsList: FC<Props> = (props) => {
  const { list } = props;
  const classes = useStyles();

  return (
    <div>
      <div className={classes.table}>
        <div className={classes.head}>
          <div style={{ width: 32 }}>
            <Typography>{}</Typography>
          </div>
          <div style={{ display: 'flex', width: 32 }}>
            <Typography>#</Typography>
            <KeyboardArrowUpIcon />
          </div>
          <div className={classes.cell}>
            <Typography>NAME</Typography>
          </div>
          <div className={classes.cell}>
            <Typography>24H CHANGE</Typography>
          </div>
          <div className={classes.cell}>
            <Typography>PRICE</Typography>
          </div>
          <div className={classes.cell}>
            <Typography>PRICE IN BTC</Typography>
          </div>
          <div className={classes.cell}>
            <Typography>MARKET CAP</Typography>
          </div>
          <div className={classes.cell}>
            <Typography>VOLUME 24H</Typography>
          </div>
          <div className={classes.cell}>
            <Typography>PRICE GRAPH (7D)</Typography>
          </div>
        </div>
        {list.map((coin: Coin, index: number) => (
          <SingleCoinElement key={index} {...coin} />
        ))}
      </div>
    </div>
  );
};

export default CoinsList;
