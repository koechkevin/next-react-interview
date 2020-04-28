import React, { FC } from 'react';
import { Props } from './CryptoPricesAndPortfolio.interface';
import useStyles from './CryptoPricesAndPortfolio.styles';
import {Box, Paper, Typography} from '@material-ui/core';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';

const CryptoPricesAndPortfolio: FC<Props> = (props) => {
  const classes = useStyles();
  const { marketCap, volume, priceChange1d } = props;
  return (
    <Paper elevation={0} className={classes.parent} style={{ marginTop: 16 }}>
      <div style={{ textAlign: 'center' }}>
        <Typography style={{ fontSize: 16 }} variant="h2">
          Crypto Prices and Portfolio
        </Typography>
      </div>
      <div className={classes.flex} style={{ maxWidth: 600 }}>
        <div>
          <div className={classes.label}>MARKET CAP</div>
          <div style={{ display: 'flex' }}>
            <Typography style={{ fontSize: 16 }}>{`$${new Intl.NumberFormat().format(marketCap)}`}</Typography>
            <div
              className={[priceChange1d > 0 ? classes.positive : classes.negative].join(' ')}
              style={{ marginLeft: 8, display: 'flex', alignItems: 'center' }}
            >
              {priceChange1d > 0 ? (
                <ArrowDropUpIcon className={classes.positive} />
              ) : (
                <ArrowDropDownIcon className={classes.negative} />
              )}
              <span>{`${priceChange1d.toFixed(2)}%`}</span>
            </div>
          </div>
        </div>
        <div>
          <div className={classes.label}>VOLUME 24H</div>
          <div style={{ display: 'flex' }}>
            <Typography style={{ fontSize: 16 }}>{`$${new Intl.NumberFormat().format(volume)}`}</Typography>
            <div
              className={[priceChange1d > 0 ? classes.positive : classes.negative].join(' ')}
              style={{ marginLeft: 8, display: 'flex', alignItems: 'center' }}
            >
              {priceChange1d > 0 && <ArrowDropUpIcon className={classes.positive} />}
              {priceChange1d <= 0 && <ArrowDropDownIcon className={classes.negative} />}
              <span>{`${(priceChange1d - 4).toFixed(2)}%`}</span>
            </div>
          </div>
        </div>
        <div>
          <div className={classes.label}>BTC DOMINANCE</div>
          <div style={{ display: 'flex'}}>
            <Typography style={{ fontSize: 16 }}>{`63.96%`}</Typography>
            <div
              className={[priceChange1d > 0 ? classes.positive : classes.positive].join(' ')}
              style={{ marginLeft: 8, display: 'flex', alignItems: 'center' }}
            >
              {priceChange1d > 0 && <ArrowDropUpIcon className={classes.positive} />}
              {priceChange1d <= 0 && <ArrowDropUpIcon className={classes.positive} />}
              <span>{`${0.65}%`}</span>
            </div>
          </div>
        </div>
      </div>
    </Paper>
  );
};

export default CryptoPricesAndPortfolio;
