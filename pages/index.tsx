import React, { FC, useCallback, useEffect, useState } from 'react';
import { CryptoPricesAndPortfolio, Header, Tabs, usePageStyles, CoinsList, Exchanges } from '../src/components';
import Head from 'next/head';
import { ThemeProvider } from '@material-ui/styles';
import { light, useLocalTheme } from '../src/theme';
import { Item } from '../src/components/Tabs/Tabs.interface';
import { debounce, Paper } from '@material-ui/core';
import { GetStaticProps } from 'next';
import axios from 'axios';
import { HomeProps } from '../src/page.interfaces';
import { Coin } from '../src/components/CoinsList/CoinsList.interface';
import Skeleton from '@material-ui/lab/Skeleton';
import _ from 'lodash.throttle';
import InfiniteScroll from 'react-infinite-scroll-component';
import { FAVOURITES } from '../src/useFavourites';
import { Fiat, HeaderValues } from '../src/components/Header/Header.interface';
import { useRouter } from 'next/router';
import { baseUrl } from '../src/apiConfig';

const Home: FC<HomeProps> = (props) => {
  const classes = usePageStyles();
  const [list, setList] = useState<Coin[]>(() => props.coinsWithGlobalAverage || []);
  const [headerValues, setHeaderValues] = useState<HeaderValues>(() => ({ ...props.initialValue }));

  useEffect(() => {
    const interval = setInterval(() => {
      axios.get(`${baseUrl}/coins`, {params: {...headerValues}}).then((res) => {
        setList(res.data.coins);
      });
    }, 60 * 1000);
    return () => clearInterval(interval);
  }, [headerValues, props.coinsWithGlobalAverage]);

  useEffect(() => {
    if (props.coinsWithGlobalAverage) {
      setList(props.coinsWithGlobalAverage);
    }
  }, [props.coinsWithGlobalAverage]);

  const [listToDisplay, setListToDisplay] = useState<Coin[]>(() => list.slice(0, 10));
  const [timeout, setTime] = useState<any>();
  const router = useRouter();

  const [currencyData, setCurrencyData] = useState<Fiat>();

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

  useEffect(() => {
    setListToDisplay((val: Coin[]) => list.slice(0, val.length));
  }, [list]);

  const push = useCallback(debounce(router.push, 2000), [router]);

  const onChange = (val: HeaderValues) => {
    setHeaderValues(headerValues);
    const query = val.search ?  { ...val} : { currency: val.currency};
    push({
      pathname: `/`,
      query: { ...query },
    });
  };

  const { theme, isDark, switchTheme } = useLocalTheme();
  const [favourites, setFavourites] = useState<Coin[]>(() => []);

  useEffect(() => {
    if (activeTab === 2) {
      const interval = setInterval(() => {
        const favourites = JSON.parse(localStorage.getItem(FAVOURITES) || '{}');
        const favourited: Coin[] = [];
        Object.keys(favourites)
          .reverse()
          .forEach((fav: string) => {
            if (favourites[fav]) {
              const coin = list.find((each: Coin) => each.id === fav);
              if (coin) {
                favourited.push(coin);
              }
            }
          });
        setFavourites(favourited);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [activeTab]);

  // DO NOT CHANGE THE INDICES
  const tabConfig: Item[] = [
    {
      label: 'CRYPTOCURRENCIES',
      component: <CoinsList currentCurrency={currencyData} list={listToDisplay} />,
    },
    {
      label: 'EXCHANGES',
      component: <Exchanges />,
    },
    {
      label: 'FAVOURITES',
      component: <CoinsList currentCurrency={currencyData} list={favourites} />,
    },
  ];

  return (
    <ThemeProvider theme={theme || light}>
      <Head>
        <title>Crypto Stats</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Paper elevation={0} style={{ padding: 0, borderRadius: 0 }}>
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
                <Paper className={classes.skeleton} style={{ padding: '0 32px', borderRadius: 0 }} key={i}>
                  <Skeleton
                    style={{ backgroundColor: isDark ? 'rgb(32,32,32)' : '#fff' }}
                    animation="wave"
                    height={51}
                  />
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
          <Header
            onCurrencyChange={setCurrencyData}
            onChange={onChange}
            onChangeTheme={switchTheme}
            initialValue={headerValues}
          />
          <Paper elevation={0} className={classes.body}>
            {list.length && <CryptoPricesAndPortfolio currencyData={currencyData} {...list[0]} />}
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

export const getServerSideProps: GetStaticProps = async ({ query }: any) => {
  try {
    const response = await axios.get(`${baseUrl}/coins`, { params: query });
    return {
      props: {
        coinsWithGlobalAverage: response?.data?.coins || [],
        urlParams: query,
      },
    };
  } catch (error) {
    return {
      props: {
        coinsWithGlobalAverage: [],
      },
    };
  }
};

export default Home;
