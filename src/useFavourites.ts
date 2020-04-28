import {useEffect, useState} from "react";

export const FAVOURITES = 'FAVOURITES';

export const useFavourites = (id: string): { onFavourite: () => void; favourite: boolean } => {
  const [favourite, setFavourite] = useState<boolean>(false);

  useEffect(() => {
    const favourites = JSON.parse(localStorage.getItem(FAVOURITES) || '{}');
    setFavourite(!!favourites[id])
  }, []);

  const onFavourite = () => {
    const favourites = JSON.parse(localStorage.getItem(FAVOURITES) || '{}');
    localStorage.setItem(FAVOURITES, JSON.stringify({...favourites, [id]: !favourite}));
    setFavourite((val: boolean) => !val);
  };

  return { onFavourite, favourite}
};
