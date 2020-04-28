import {createMuiTheme, Theme} from '@material-ui/core';
import { useEffect, useState } from 'react';

export const MODE = 'THEME_MODE';
export const colorScheme = {
  palette: {
    primary: {
      dark: '#c86200',
      main: '#FF9800',
      contrastText: '#fff',
    },
  },
};

interface LocalTheme {
  theme: Theme;
  switchTheme: () => void;
  isDark: boolean;
  defaultTheme: Theme;
}

const dark = createMuiTheme({
  ...colorScheme,
  palette: {
    ...colorScheme.palette,
    text: {
      primary: '#fff',
    },
    primary: {
      ...colorScheme.palette.primary,
      contrastText: '#000'
    },
    background: {
      paper: '#000',
    },
  }
});

export const light = createMuiTheme({
  ...colorScheme,
});

export const useLocalTheme = (): LocalTheme => {
  const [isDark, setIsDark] = useState<boolean>(false);

  const switchTheme = () => {
    localStorage.setItem(MODE, isDark ? 'light' : 'dark');
    setIsDark((val) => !val);
  };

  useEffect(() => {
    const mode: string = localStorage.getItem(MODE) || 'light';
    setIsDark(mode === 'dark');
  });
  return { theme: isDark ? dark : light, switchTheme, isDark, defaultTheme: light };
};
