import { Coin } from './components/CoinsList/CoinsList.interface';

export interface HomeProps {
  coinsWithGlobalAverage: Coin[];
}

export interface CoinProps {
  coin: Coin;
}
