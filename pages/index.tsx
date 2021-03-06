import React, { FC, useCallback, useEffect, useState } from 'react';
import { CryptoPricesAndPortfolio, Header, Tabs, usePageStyles, CoinsList, Exchanges } from '../src/components';
import Head from 'next/head';
import { light, useLocalTheme } from '../src/theme';
import { Item } from '../src/components/Tabs/Tabs.interface';
import { debounce, Paper, ThemeProvider } from '@material-ui/core';
import { GetStaticProps } from 'next';
import axios from 'axios';
import { HomeProps } from '../src/page.interfaces';
import { Coin } from '../src/components/CoinsList/CoinsList.interface';
import { FAVOURITES } from '../src/useFavourites';
import { Fiat, HeaderValues } from '../src/components/Header/Header.interface';
import { useRouter } from 'next/router';
import { baseUrl } from '../src/apiConfig';

const Home: FC<HomeProps> = (props) => {
  const classes = usePageStyles();
  const [list, setList] = useState<Coin[]>(() => props.coinsWithGlobalAverage || []);
  const [headerValues, setHeaderValues] = useState<HeaderValues>(() => ({ ...props.initialValue }));
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();

  const [currencyData, setCurrencyData] = useState<Fiat>();

  const [activeTab, setActiveTab] = useState(0);

  const push = useCallback(debounce(router.push, 2000), [router]);

  const fetchNext = async (limit: number) => {
    setLoading(true);
    const response = await axios.get(`${baseUrl}/coins`, { params: { currency: currencyData?.symbol, limit } });
    if (response.data.coins) {
      setList(response.data.coins);
    }
    setLoading(false);
  };

  const onChange = (val: HeaderValues) => {
    setHeaderValues(headerValues);
    const query = val.search ? { ...val } : { currency: val.currency };
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
      component: <CoinsList loading={loading} fetchNext={fetchNext} currentCurrency={currencyData} list={list} />
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
    <div style={{ minWidth: 800 }}>
      <ThemeProvider theme={theme || light}>
        <Head>
          <title>Crypto Stats</title>
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>
        <Paper elevation={0} style={{ padding: 0, borderRadius: 0, height: '100vh' }}>
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
                }}
                tabs={tabConfig}
              />
            </div>
          </Paper>
        </Paper>
      </ThemeProvider>
    </div>
  );
};

export const getServerSideProps: GetStaticProps = async ({ query }: any) => {
  try {
    const response = await axios.get(`${baseUrl}/coins`, { params: {limit: 10, ...query} });
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
