import React, { FC, useEffect } from 'react';
import axios from 'axios';
import { Props } from './Exchanges.interface';
import useStyles from './Exchanges.styles';
import ExchangeHeader from './ExchangeHead';
import { baseUrl } from '../../apiConfig';

const Exchanges: FC<Props> = () => {
  useEffect(() => {
    axios.get(`${baseUrl}/exchanges`).then((res) => console.log('========>', res.data));
  }, []);
  return (
    <div style={{ marginTop: 8 }}>
      <ExchangeHeader />
    </div>
  );
};

export default Exchanges;
