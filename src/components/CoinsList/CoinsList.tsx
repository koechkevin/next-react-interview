import React, { FC } from 'react';
import { Coin, Props } from './CoinsList.interface';
import useStyles from './CoinsList.styles';
import { SingleCoinElement } from '../SingleCoinElement';
import CoinsListHeader from './CoinsListHead';

const CoinsList: FC<Props> = (props) => {
  const { list } = props;
  const classes = useStyles();

  return (
    <div>
      <div className={classes.table}>
        <CoinsListHeader />
        {list.map((coin: Coin, index: number) => (
          <SingleCoinElement key={coin.id} {...coin} />
        ))}
      </div>
    </div>
  );
};

export default CoinsList;
