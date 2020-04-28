import React, { FC } from 'react';
import { Props } from './Header.interface';
import { AppBar, Toolbar, IconButton, Typography, Button, Box, Switch, Divider, Paper } from '@material-ui/core';
import useStyles from './Header.styles';
import { ActiveLink } from '../ActiveLink';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

const Header: FC<Props> = (props) => {
  const { onChangeTheme, isDark } = props;
  const classes = useStyles();
  return (
    <AppBar elevation={0} position="sticky">
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
          <ActiveLink href="">
            <Typography className={classes.text}>News</Typography>
          </ActiveLink>
          <ActiveLink href="">
            <Typography className={classes.text}>Portfolio</Typography>
          </ActiveLink>
          <IconButton>
            <MoreHorizIcon className={classes.icon} />
          </IconButton>
          <Divider style={{ height: 20, width: 2 }} variant="fullWidth" orientation="vertical" />
          <div>
            <input placeholder="Search" className={classes.input} />
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
