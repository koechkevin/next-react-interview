import {Coin} from "../CoinsList/CoinsList.interface";
import {Fiat} from "../Header/Header.interface";

export interface Props extends Coin {
  currencyData?: Fiat;
}
