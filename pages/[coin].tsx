import React, { FC, useEffect, useState } from 'react';
import { GetStaticProps } from 'next';
import axios from 'axios';
import { CoinProps } from '../src/page.interfaces';
import { CoinChart, CoinInfo, Header, Tabs } from '../src/components';
import { Button, Paper, ThemeProvider } from '@material-ui/core';
import { light, useLocalTheme } from '../src/theme';
import { Item } from '../src/components/Tabs/Tabs.interface';
import { baseUrl } from '../src/apiConfig';
import Router from 'next/router';
import Head from 'next/head';

const Coin: FC<CoinProps> = (props) => {
  const { coin } = props;
  const [params, setParams] = useState({
    coinId: coin?.id,
    period: '24h',
  });
  const [chart, setChart] = useState();

  useEffect(() => {
    if (params.coinId) {
      axios.get(`${baseUrl}/charts`, { params }).then((res) => {
        setChart(res?.data.chart);
      });
    }
  }, [params]);
  const tabs: Item[] = [
    {
      label: 'OVERVIEW',
      component: (
        <div style={{ minWidth: '800px', height: '500px' }}>
          <CoinChart data={chart || []} />
        </div>
      ),
    },
    {
      label: 'NEWS',
      component: <span />,
    },
    {
      label: 'MARKETS',
      component: <span />,
    },
    {
      label: 'HOLDINGS',
      component: <span />,
    },
  ];
  const { theme, switchTheme, isDark } = useLocalTheme();

  useEffect(() => {
    if (!coin) {
      Router.push('/routes/404');
    }
  });

  if (!coin) {
    return <div />;
  }
  return (
    <ThemeProvider theme={theme || light}>
      <Head>
        <title>{coin && coin.name}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Paper style={{ borderRadius: 0, minHeight: '100vh' }} elevation={0}>
        <Header isDark={isDark} onChangeTheme={switchTheme} />
        <Paper elevation={0} style={{ padding: 32 }}>
          <CoinInfo {...coin} />
          <Paper elevation={0} style={{ padding: 0, borderRadius: 0 }}>
            <Tabs tabs={tabs} />
            <Paper elevation={0} style={{ display: 'flex' }}>
              <Button
                onClick={() => setParams((v) => ({ ...v, period: '24h' }))}
                color={params.period === '24h' ? 'primary' : 'inherit'}
              >
                24h
              </Button>
              <Button
                onClick={() => setParams((v) => ({ ...v, period: '1w' }))}
                color={params.period === '1w' ? 'primary' : 'inherit'}
              >
                1w
              </Button>
              <Button
                onClick={() => setParams((v) => ({ ...v, period: '1m' }))}
                color={params.period === '1m' ? 'primary' : 'inherit'}
              >
                1m
              </Button>
              <Button
                onClick={() => setParams((v) => ({ ...v, period: '3m' }))}
                color={params.period === '3m' ? 'primary' : 'inherit'}
              >
                3m
              </Button>
              <Button
                onClick={() => setParams((v) => ({ ...v, period: '6m' }))}
                color={params.period === '6m' ? 'primary' : 'inherit'}
              >
                6m
              </Button>
              <Button
                onClick={() => setParams((v) => ({ ...v, period: '1y' }))}
                color={params.period === '1y' ? 'primary' : 'inherit'}
              >
                1y
              </Button>
              <Button
                onClick={() => setParams((v) => ({ ...v, period: 'all' }))}
                color={params.period === 'all' ? 'primary' : 'inherit'}
              >
                All
              </Button>
            </Paper>
          </Paper>
        </Paper>
      </Paper>
    </ThemeProvider>
  );
};

export const getServerSideProps: GetStaticProps = async ({ params }: any) => {
  const { coin: queryCoin, ...restProps } = params;
  try {
    const res = await axios.get(`${baseUrl}/coins/${queryCoin}`, {
      params: { ...restProps },
    });
    if (res.data.coin) {
      return {
        props: {
          coin: res.data.coin,
        },
      };
    }
    return { props: {} };
  } catch (error) {
    return { props: {} };
  }
};

export default Coin;
