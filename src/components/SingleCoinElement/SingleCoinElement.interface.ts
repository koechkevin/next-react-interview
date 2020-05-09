import { Coin } from '../CoinsList/CoinsList.interface';
import { Fiat } from '../Header/Header.interface';
import { CSSProperties } from 'react';

export interface Props extends Coin {
  currentCurrency?: Fiat;
  style?: CSSProperties;
}
