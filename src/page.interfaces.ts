import { Coin } from './components/CoinsList/CoinsList.interface';
import {HeaderValues} from "./components/Header/Header.interface";

export interface HomeProps {
  coinsWithGlobalAverage: Coin[];
  initialValue: HeaderValues;
}

export interface CoinProps {
  coin: Coin;
  urlParams: HeaderValues;
}
