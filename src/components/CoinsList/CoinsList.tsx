import React, { FC } from 'react';
import { Props, RowInterface } from './CoinsList.interface';
import useStyles from './CoinsList.styles';
import { VariableSizeList as List } from 'react-window';
import { SingleCoinElement } from '../SingleCoinElement';
import CoinsListHeader from './CoinsListHead';
import {CircularProgress, debounce} from '@material-ui/core';
import AutoSizer from 'react-virtualized-auto-sizer';

const CoinsList: FC<Props> = (props) => {
  const { list, currentCurrency, fetchNext, loading } = props;
  const classes = useStyles();

  const Row: FC<RowInterface> = ({ index, style }): JSX.Element => {
    const coin = list[index];
    return (
      <div style={{ ...style }}>
        <SingleCoinElement style={style} currentCurrency={currentCurrency} key={coin.id} {...coin} />
        {index === list.length - 1 && loading && (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 52 }}>
            <CircularProgress size={20} thickness={2.5} />
          </div>
        )}
      </div>
    );
  };

  return (
    <div className={classes.table}>
      <CoinsListHeader />
      <AutoSizer>
        {({ height, width }) => (
          <List
            onScroll={debounce(({ scrollDirection, scrollOffset }) => {
              if (scrollDirection === 'forward' && scrollOffset % 10 <= 5) {
                fetchNext && fetchNext(list.length + 10);
              }
            }, 1000)}
            itemSize={() => 52}
            width={width}
            height={height - 52}
            itemCount={list.length}
          >
            {Row}
          </List>
        )}
      </AutoSizer>
    </div>
  );
};

export default CoinsList;
