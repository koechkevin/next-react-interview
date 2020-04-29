
export interface Fiat {
  name: string;
  rate: number;
  symbol: string;
  imageUrl: string;
}

export interface HeaderValues {
  search: string;
  currency: string;
}

export interface Props {
  onChangeTheme: () => void;
  onChange: (value: HeaderValues) => void;
  initialValue: HeaderValues;
  onCurrencyChange: (currency: Fiat) => void;
}
