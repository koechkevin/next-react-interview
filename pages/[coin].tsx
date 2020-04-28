import React, { FC } from 'react';
import { GetStaticProps } from 'next';
import axios from 'axios';
import { CoinProps } from '../src/page.interfaces';
import { CoinChart, CoinInfo, Header, Tabs } from '../src/components';
import { Box, Paper, ThemeProvider } from '@material-ui/core';
import { light, useLocalTheme } from '../src/theme';
import { Item } from '../src/components/Tabs/Tabs.interface';

const Coin: FC<CoinProps> = (props) => {
  const { coin } = props;
  const tabs: Item[] = [
    {
      label: 'OVERVIEW',
      component: (
        <div style={{ width: '800px', height: '500px'}}>
        <CoinChart
          data={[
            [1539507300, 200.94573956, 0.03202943, 1],
            [1539593700, 210.76864529, 0.03168714, 1],
            [1539680100, 209.74244882, 0.03184456, 1],
            [1539766500, 209.40449177, 0.03196842, 1],
            [1539852900, 206.5674436, 0.03174293, 1],
            [1539939300, 202.92163916, 0.03145229, 1],
            [1540025700, 205.54253217, 0.0319021, 1],
            [1540112100, 206.7808671, 0.03196189, 1],
            [1540198500, 204.10912762, 0.03168181, 1],
            [1540284900, 203.76508027, 0.03163123, 1],
            [1540371300, 204.62262488, 0.03157571, 1],
            [1540457700, 202.99669859, 0.03136966, 1],
            [1540544100, 203.77931872, 0.03152597, 1],
            [1540630500, 204.02930361, 0.03162146, 1],
            [1540716900, 204.24400883, 0.03155278, 1],
            [1540803300, 204.13879861, 0.031734, 1],
            [1540889700, 197.48384326, 0.03126466, 1],
            [1540976100, 197.30103489, 0.03138109, 1],
            [1541062500, 199.36328744, 0.03151735, 1],
            [1541148900, 199.05493304, 0.0314686, 1],
            [1541235300, 200.37235121, 0.03142505, 1],
            [1541324700, 200.75792747, 0.03152465, 1],
            [1541408100, 208.8815608, 0.03237667, 1],
            [1541494500, 212.19046585, 0.03288148, 1],
            [1541580900, 220.38510575, 0.03372908, 1],
            [1541667300, 214.65489798, 0.03307554, 1],
            [1541753700, 212.58650405, 0.03294458, 1],
            [1541840100, 211.43444173, 0.03294584, 1],
            [1541926500, 211.98024969, 0.03321165, 1],
            [1542012900, 211.3111982, 0.03289473, 1],
            [1542099300, 208.41621557, 0.0328601, 1],
          ]}
        />
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
  return (
    <ThemeProvider theme={theme || light}>
      <Paper style={{ borderRadius: 0, minHeight: '100vh' }} elevation={0}>
        <Header isDark={isDark} onChangeTheme={switchTheme} />
        <Paper elevation={0} style={{ padding: 32 }}>
          <CoinInfo {...coin} />
          <Paper elevation={0} style={{ padding: 0, borderRadius: 0 }}>
            <Tabs tabs={tabs} />
          </Paper>
        </Paper>
      </Paper>
    </ThemeProvider>
  );
};

export const getServerSideProps: GetStaticProps = async ({ params }: any) => {
  const { coin: queryCoin, ...restProps } = params;
  try {
    const res = await axios.get(`https://api.coinstats.app/public/v1/coins/${queryCoin}`, {
      params: { ...restProps },
    });
    const {
      data: { coin },
    } = res;
    return {
      props: {
        coin,
      },
    };
  } catch (error) {
    return {
      props: { coin: {} },
    };
  }
};

export default Coin;
