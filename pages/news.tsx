import React, { FC, useEffect, useState } from 'react';
import { Paper, ThemeProvider } from '@material-ui/core';
import { light, useLocalTheme } from '../src/theme';
import { Header, NewsComponent } from '../src/components';
import axios from 'axios';
import { baseUrl } from '../src/apiConfig';
import { NewsInterface } from '../src/components/NewsComponent/NewsComponent.interface';
import { GetStaticProps } from 'next';
import useSWR from 'swr';

interface Props {
  newsList: NewsInterface[];
}
const News: FC<Props> = (props) => {
  const { newsList } = props;
  const { theme, switchTheme } = useLocalTheme();
  const [news, setNews] = useState<NewsInterface[]>(() => newsList);

  const { data } = useSWR(`${baseUrl}/news`, axios.get,  { refreshInterval: 60 * 1000 });

  useEffect(() => {
    if (data?.data?.news) {
      setNews(data?.data?.news);
    }
  }, [data]);
  return (
    <ThemeProvider theme={theme || light}>
      <Paper style={{ height: '100vh', overflow: 'auto', borderRadius: 0, minWidth: 800 }} elevation={0}>
        <Header
          onChangeTheme={switchTheme}
          onChange={console.log}
          // @ts-ignore
          initialValue={{}}
          onCurrencyChange={() => {}}
        />
        <Paper elevation={0} style={{ padding: 16 }}>
          {news.map((single: NewsInterface) => {
            return <NewsComponent key={single.id} {...single} />;
          })}
        </Paper>
      </Paper>
    </ThemeProvider>
  );
};

export const getServerSideProps: GetStaticProps = async ({ query }: any) => {
  try {
    const queryParams = { ...query };
    const response = await axios.get(`${baseUrl}/news`, { params: queryParams });
    return {
      props: {
        newsList: response?.data?.news || [],
      },
    };
  } catch (error) {
    return {
      props: {
        newsList: [],
      },
    };
  }
};

export default News;
