import React, { FC } from 'react';
import { Typography } from '@material-ui/core';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import useStyles from './Exchanges.styles';

const ExchangeHeader: FC<{}> = (props) => {
  const classes = useStyles();
  return (
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
        <Typography>VOLUME 24H</Typography>
      </div>
      <div className={classes.cell}>
        <Typography>VOLUME 7D</Typography>
      </div>
      <div className={classes.cell}>
        <Typography>PRICE IN BTC</Typography>
      </div>
      <div className={classes.cell}>
        <Typography>VOLUME 30D</Typography>
      </div>
      <div className={classes.cell}>
        <Typography>NO. OF MARKETS</Typography>
      </div>
      <div className={classes.cell}>
        <Typography>CHANGE (24H)</Typography>
      </div>
      <div className={classes.cell}>
        <Typography>LAUNCHED</Typography>
      </div>
    </div>
  );
};

export default ExchangeHeader;
