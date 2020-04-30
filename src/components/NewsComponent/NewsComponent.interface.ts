export interface NewsCoin {
  coinKeywords: string;
  coinPercent: number;
  coinTitleKeyWords: string;
  coinNameKeyWords: string;
  coinIdKeyWords: string;
}

export interface NewsInterface {
  id: string;
  searchKeywords: string[];
  feedDate: number;
  source: string;
  title: string;
  description: string;
  imgURL: string;
  link: string;
  sourceLink: string;
  shareURL: string;
  reactionsCount: any;
  relatedCoins: string[];
  coins: NewsCoin[];
}
export interface Props extends NewsInterface {

}
