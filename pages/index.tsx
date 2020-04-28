import React, { FC, useEffect, useState } from 'react';
import {CryptoPricesAndPortfolio, Header, Tabs, usePageStyles, CoinsList } from '../src/components';
import { ThemeProvider } from '@material-ui/styles';
import { light, useLocalTheme } from '../src/theme';
import { Item } from '../src/components/Tabs/Tabs.interface';
import { Paper } from '@material-ui/core';
import { GetStaticProps } from 'next';
import axios from 'axios';
import { HomeProps } from '../src/page.interfaces';
import { Coin } from '../src/components/CoinsList/CoinsList.interface';
import Skeleton from '@material-ui/lab/Skeleton';
import _ from 'lodash.throttle';
import InfiniteScroll from 'react-infinite-scroll-component';
import {FAVOURITES} from "../src/useFavourites";

const Home: FC<HomeProps> = (props) => {
  const classes = usePageStyles();
  const list = props.coinsWithGlobalAverage || [];

  const [listToDisplay, setListToDisplay] = useState<Coin[]>(() => list.slice(0, 10));
  const [timeout, setTime] = useState<any>();

  const [activeTab, setActiveTab] = useState(0);
  const next = () => {
    const time = setTimeout(() => {
      setListToDisplay((lst: Coin[]) => [...lst, ...list.slice(lst.length, lst.length + 10)]);
    }, 1000);
    setTime(time);
  };

  useEffect(() => {
    return () => {
      clearTimeout(timeout);
    };
  });

  const { theme, switchTheme, isDark } = useLocalTheme();
  const [favourites, setFavourites] = useState<Coin[]>(() => []);

  useEffect(() => {
    if(activeTab === 2){
      const interval = setInterval(() => {
        const favourites = JSON.parse(localStorage.getItem(FAVOURITES) || '{}');
        const favourited:Coin[]  =  [];
        Object.keys(favourites).reverse().forEach((fav: string) => {
          if(favourites[fav]) {
            const coin = list.find((each: Coin) => each.id === fav);
            if(coin){
              favourited.push(coin);
            }
          }
        });
        setFavourites(favourited);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, []);

  const tabConfig: Item[] = [
    {
      label: 'CRYPTOCURRENCIES',
      component: <CoinsList list={listToDisplay} />,
    },
    {
      label: 'EXCHANGES',
      component: <div>FFF</div>,
    },
    {
      // DO NOT CHANGE THE INDICES
      label: 'FAVOURITES',
      component: <CoinsList list={favourites} />,
    },
  ];

  return (
    <ThemeProvider theme={theme || light}>
      <Paper elevation={0} style={{ padding: 0, borderRadius: 0}}>
        <InfiniteScroll
          dataLength={list.length}
          next={() => {}}
          hasMore={listToDisplay < list}
          height="100vh"
          loader={
            activeTab === 0 &&
            Array(9)
              .fill('')
              .map((e, i) => (
                <Paper className={classes.skeleton} style={{ padding: '0 32px' }} key={i}>
                  <Skeleton style={{ backgroundColor: isDark ? 'rgb(32,32,32)' : '#fff' }} animation="wave" height={51} />
                </Paper>
              ))
          }
          onScroll={activeTab === 0 ? _(next, 1000) : () => {}}
          endMessage={
            <Paper style={{ borderRadius: 0, textAlign: 'center' }} elevation={0}>
              <b>All Done</b>
            </Paper>
          }
        >
          <Header isDark={isDark} onChangeTheme={switchTheme} />

          <Paper elevation={0} className={classes.body}>
            {list.length && <CryptoPricesAndPortfolio {...list[0]} />}
            <div>
              <Tabs
                onTabChange={(idx: number) => {
                  setActiveTab(idx);
                  setListToDisplay(() => list.slice(0, 10));
                }}
                tabs={tabConfig}
              />
            </div>
          </Paper>
        </InfiniteScroll>
      </Paper>
    </ThemeProvider>
  );
};

export const getServerSideProps: GetStaticProps = async ({ params }) => {
  const response = await axios.get('https://api.coinstats.app/public/v1/coins', { params });
  return {
    props: {
      coinsWithGlobalAverage: response.data.coins,
    },
  };
};

export default Home;
