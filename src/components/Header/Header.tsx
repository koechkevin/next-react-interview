import React, { ChangeEvent, FC, useEffect, useState } from 'react';
import { Fiat, HeaderValues, Props } from './Header.interface';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Box,
  Switch,
  Select,
  MenuItem,
  CardMedia,
} from '@material-ui/core';
import useStyles from './Header.styles';
import { ActiveLink } from '../ActiveLink';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { baseUrl } from '../../apiConfig';
import axios from 'axios';
import { useLocalTheme } from '../../theme';
import { useRouter } from 'next/router';

const Header: FC<Props> = (props) => {
  const { isDark } = useLocalTheme();

  const { onChangeTheme, onChange: headerChange, initialValue, onCurrencyChange } = props;
  const classes = useStyles();
  const router = useRouter();

  const [state, setState] = useState<HeaderValues>({
    currency: router.query.currency || 'USD',
    search: '',
    ...initialValue,
  });

  const [data, setData] = useState<Fiat[]>([]);

  useEffect(() => {
    axios.get(`${baseUrl}/fiats`).then((res: any) => {
      data && setData(res.data);
    });
  }, []);

  const onChange = (e: ChangeEvent<HTMLInputElement | { name?: any; value?: any }>) => {
    e.persist();
    headerChange && headerChange({ ...state, [e.target.name]: e.target.value });
    setState((v:HeaderValues) => ({ ...v, [e.target.name]: e.target.value }));
  };

  useEffect(() => {
    const fiat = data.find((curr: Fiat) => curr.name === state.currency);
    if (fiat) {
      onCurrencyChange(fiat);
    }
  }, [state.currency, data]);

  return (
    <AppBar style={{ flex: 1 }} elevation={0} position="sticky">
      <Toolbar className={classes.root}>
        <ActiveLink activeClassName={classes.active} href="/">
          <IconButton className={classes.logo} edge="start" color="inherit">
            <Typography className={classes.text} variant="h4">
              CoinStats
            </Typography>
          </IconButton>
        </ActiveLink>
        <Box className={classes.title}>
          <Typography className={classes.text}>{`Switch to ${isDark ? 'light' : 'dark'} mode`}</Typography>
          <Switch checked={isDark} onClick={onChangeTheme} color="primary" />
          <ActiveLink activeClassName={classes.active} href="/">
            <Typography className={classes.text}>Live Prices</Typography>
          </ActiveLink>
          <ActiveLink activeClassName={classes.active} href="/news">
            <Typography className={classes.text}>News</Typography>
          </ActiveLink>
          <ActiveLink href="">
            <Typography className={classes.text}>Portfolio</Typography>
          </ActiveLink>
          <IconButton>
            <MoreHorizIcon className={classes.icon} />
          </IconButton>
          <div className={classes.divider} />
          <Select
            MenuProps={{
              MenuListProps: {
                className: classes.selectList,
              },
            }}
            name="currency"
            onChange={onChange}
            IconComponent={() => <span />}
            value={state.currency}
            autoWidth
            className={classes.select}
            variant="outlined"
          >
            {data.map((fiat: Fiat) => (
              <MenuItem className={classes.item} value={fiat.name} key={fiat.name}>
                <CardMedia style={{ height: 14, width: 14, marginRight: 8 }} image={fiat.imageUrl} />
                <span>{fiat.name}</span>
              </MenuItem>
            ))}
          </Select>
          <div>
            <input
              value={state.search}
              name="search"
              onChange={onChange}
              placeholder="Search"
              className={classes.input}
            />
          </div>
        </Box>
        <Button className={classes.getStarted} disableElevation variant="contained" color="primary">
          Get Started
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
