import React, { FC } from 'react';
import { Props } from './CoinInfo.interface';
import useStyles from './CoinInfo.styles';
import { Box, CardMedia, Typography, Paper } from '@material-ui/core';
import StarIcon from '@material-ui/icons/Star';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import LanguageIcon from '@material-ui/icons/Language';
import TwitterIcon from '@material-ui/icons/Twitter';
import ExploreIcon from '@material-ui/icons/Explore';
import { useFavourites } from '../../useFavourites';
import Tooltip from '@material-ui/core/Tooltip';

const CoinInfo: FC<Props> = (props) => {
  const {
    icon,
    name,
    symbol,
    rank,
    price,
    priceChange1d,
    marketCap,
    volume,
    availableSupply,
    totalSupply,
    websiteUrl,
    twitterUrl,
    exp,
    id,
    currencyData,
  } = props;
  const classes = useStyles();

  const { favourite, onFavourite } = useFavourites(id);

  return (
    <Paper
      elevation={0}
      style={{ justifyContent: 'space-between', padding: 16, flexWrap: 'wrap',  borderRadius: 0 }}
      className={classes.flex}
    >
      <Box>
        <div className={[classes.flex, classes.label].join(' ')}>
          <CardMedia style={{ height: 32, width: 32, marginRight: 8 }} image={icon} />
          <Typography className={classes.name}>{`${name} (${symbol})`}</Typography>
          <div className={classes.rank}>#{rank}</div>
        </div>

        <div className={[classes.flex, classes.label].join(' ')}>
          <div
            onClick={onFavourite}
            style={{ height: 32, width: 32, justifyContent: 'center' }}
            className={classes.flex}
          >
            <StarIcon className={classes.icon} style={{ color: !favourite ? 'lightgray' : '' }} />
          </div>
          <div className={classes.price}>{`${currencyData?.symbol}${price.toFixed(2)}`}</div>
          <div
            className={[classes.flex, priceChange1d > 0 ? classes.positive : classes.negative].join(' ')}
            style={{ marginLeft: 8, fontSize: 16 }}
          >
            {priceChange1d > 0 ? (
              <ArrowDropUpIcon className={classes.positive} />
            ) : (
              <ArrowDropDownIcon className={classes.negative} />
            )}
            <span>{`${priceChange1d.toFixed(2)}%`}</span>
          </div>
        </div>
      </Box>
      <Box>
        <div style={{ height: 48 }}>
          <div className={classes.title}>MARKET CAP</div>
          <Typography style={{ fontSize: 16 }}>{`${currencyData?.symbol}${new Intl.NumberFormat().format(
            marketCap,
          )}`}</Typography>
        </div>
        <div style={{ height: 48 }}>
          <div className={classes.title}>VOLUME 24H</div>
          <Typography style={{ fontSize: 16 }}>{`${currencyData?.symbol}${new Intl.NumberFormat().format(
            volume,
          )}`}</Typography>
        </div>
      </Box>
      <Box>
        <div style={{ height: 48 }}>
          <div className={classes.title}>AVAILABLE SUPPLY</div>
          <Typography style={{ fontSize: 16 }}>{`${new Intl.NumberFormat().format(availableSupply)}`}</Typography>
        </div>
        <div style={{ height: 48 }}>
          <div className={classes.title}>TOTAL SUPPLY</div>
          <Typography style={{ fontSize: 16 }}>{`${new Intl.NumberFormat().format(totalSupply)}`}</Typography>
        </div>
      </Box>
      <Box style={{ height: 96 }}>
        <Tooltip title={websiteUrl}>
          <div
            onClick={() => window.open(websiteUrl, '_blank')}
            style={{ height: 32, width: 32, justifyContent: 'center', cursor: 'pointer' }}
            aria-label="link"
            className={classes.flex}
          >
            <LanguageIcon style={{ color: 'lightgray' }} />
            <span style={{ marginLeft: 8 }}>Website</span>
          </div>
        </Tooltip>
        <Tooltip title={twitterUrl}>
          <div
            onClick={() => window.open(twitterUrl, '_blank')}
            style={{ height: 32, width: 32, justifyContent: 'center', cursor: 'pointer' }}
            className={classes.flex}
          >
            <TwitterIcon style={{ color: 'lightgray' }} />
            <span style={{ marginLeft: 8 }}>Twitter</span>
          </div>
        </Tooltip>
      </Box>
      <Box style={{ height: 96 }}>
        {exp.map((ex: string, index: number) => (
          <Tooltip key={index} title={ex}>
            <div
              onClick={() => window.open(ex, '_blank')}
              style={{ display: 'flex', alignItems: 'center', height: 32, cursor: 'pointer' }}
            >
              <ExploreIcon style={{ color: 'lightgray', marginRight: 8 }} />
              <span>{`Explorer${index + 1}`}</span>
            </div>
          </Tooltip>
        ))}
      </Box>
    </Paper>
  );
};

export default CoinInfo;
