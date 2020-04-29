import React, {ElementType, FC, useEffect} from 'react';
import Head from 'next/head';

interface Props {
  Component: ElementType;
  pageProps: object;
}

const MyApp: FC<Props> = (props) => {
  const { Component, pageProps } = props;

  useEffect(() => {
    const jssStyles: Element  = document.querySelector('#jss-server-side') as Element;
    document.body.style.margin = '0';
    if (jssStyles) {
      (jssStyles.parentElement as Element).removeChild(jssStyles);
    }
  }, []);

  return (
    <React.Fragment>
        <Component {...pageProps} />
    </React.Fragment>
  );
};

export default MyApp;
