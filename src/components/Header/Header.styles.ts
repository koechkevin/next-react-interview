import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

export default makeStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: theme.palette.primary.contrastText,
      minWidth: 800,
      overflowX: 'hidden',
    },
    divider: {
      height: 20,
      width: 1,
      backgroundColor: theme.palette.grey['300'],
    },
    logo: {
      marginRight: theme.spacing(4),
    },
    title: {
      flex: 1,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-evenly',
    },
    text: {
      color: theme.palette.text.primary,
    },
    active: {
      color: theme.palette.primary.dark,
    },
    getStarted: {
      borderRadius: 17,
    },
    icon: {
      color: theme.palette.grey['500'],
    },
    input: {
      width: '100%',
      outline: 'none',
      boxSizing: 'border-box',
      height: 32,
      borderRadius: 16,
      padding: '8px 16px',
      backgroundColor: theme.palette.background.paper,
      color: theme.palette.text.primary,
      border: `1px solid ${theme.palette.grey['300']}`,
    },
  }),
);
