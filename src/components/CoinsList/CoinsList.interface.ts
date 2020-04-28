export interface Coin {
  id: string;
  icon: string;
  name: string;
  price: number;
  priceChange1d: number;
  priceBtc: number;
  marketCap: number;
  volume: number;
  rank: number;
  symbol: string;
  availableSupply: number;
  totalSupply: number;
  websiteUrl: string;
  twitterUrl: string;
  exp: string[];
}
export interface Props {
  list: Coin[];
}
