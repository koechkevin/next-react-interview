import React, { FC } from 'react';
import { Props } from './CoinChart.interface';
import { Chart } from 'react-charts';

const CoinChart: FC<Props> = (props) => {
  const { data } = props;

  const d = React.useMemo(
    () => [
      {
        data,
      },
    ],
    [data],
  );

  const axes = React.useMemo(
    () => [
      { primary: true, type: 'linear', position: 'bottom' },
      { type: 'linear', position: 'left' },
    ],
    [],
  );

  return <Chart data={d} axes={axes} />;
};

export default CoinChart;
