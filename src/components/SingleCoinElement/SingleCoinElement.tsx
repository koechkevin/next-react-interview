import React, {FC} from 'react';
import { Props } from './SingleCoinElement.interface';
import useStyles from './SingleCoinElement.styles';
import { CardMedia, Typography, Box } from '@material-ui/core';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import { ActiveLink } from '../ActiveLink';
import { CoinChart } from '../CoinChart';
import StarIcon from '@material-ui/icons/Star';
import {useFavourites} from "../../useFavourites";
import {useRouter} from "next/router";

const SingleCoinElement: FC<Props> = (props) => {
  const { rank, name, priceChange1d, price, priceBtc, marketCap, volume, icon, id, currentCurrency } = props;
  const classes = useStyles();

  const router = useRouter();

  const { favourite, onFavourite } = useFavourites(id);

  return (
    <Box style={{ display: 'flex', height: 52 }}>
      <div style={{ width: 32, alignItems: 'center' }} className={classes.td}>
        <StarIcon
          onClick={onFavourite}
          className={classes.icon}
          style={{ cursor: 'pointer',color: !favourite ? 'lightgray' : '' }}
        />
      </div>
      <ActiveLink href={{pathname:"/[coin]", query:  router.query  }} as={`/${id}`}>
        <div className={classes.row}>
          <div style={{ width: 32 }} className={classes.td}>
            <Typography>{rank}</Typography>
          </div>
          <div style={{ overflow: 'hidden',flex: 1, textOverflow: 'ellipsis', }} className={classes.td}>
            <CardMedia style={{ height: 16, width: 16, marginRight: 8 }} image={icon} />
            <Typography style={{
               textOverflow: 'ellipsis', whiteSpace: 'nowrap'
            }}>{name}</Typography>
          </div>
          <div style={{ flex: 1 }} className={classes.td}>
            {priceChange1d > 0 ? (
              <ArrowDropUpIcon className={classes.positive} />
            ) : (
              <ArrowDropDownIcon className={classes.negative} />
            )}
            <Typography className={priceChange1d >= 0 ? classes.positive : classes.negative}>{`${priceChange1d.toFixed(
              2,
            )}%`}</Typography>
          </div>
          <div style={{ flex: 1 }} className={classes.td}>
            <Typography>{`${currentCurrency?.symbol}${price.toFixed(2)}`}</Typography>
          </div>
          <div style={{ flex: 1 }} className={classes.td}>
            <Typography>{priceBtc.toFixed(8)}</Typography>
          </div>
          <div style={{ flex: 1 }} className={classes.td}>
            <Typography>{`${currentCurrency?.symbol}${marketCap.toFixed(1)}`}</Typography>
          </div>
          <div style={{ flex: 1 }} className={classes.td}>
            <Typography>{`${currentCurrency?.symbol}${volume.toFixed(1)}`}</Typography>
          </div>
          <div style={{ flex: 1 }} className={classes.td}>
            <CoinChart data={[]} />
          </div>
        </div>
      </ActiveLink>
    </Box>
  );
};

export default SingleCoinElement;
