import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

export default makeStyles((theme: Theme) =>
  createStyles({
    flex: {
      display: 'flex',
      alignItems: 'center',
    },
    name: {
      lineHeight: '32px',
      fontSize: 16,
    },
    icon: {
      color: theme.palette.primary.main,
      cursor: 'pointer',
    },
    positive: {
      color: 'green',
    },
    negative: {
      color: 'red',
    },
    rank: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontWeight: 'bold',
      padding: 4,
      marginLeft: 8,
      borderRadius: 4,
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
    },
    label: {
      height: 48,
      marginBottom: 8,
    },
    price: {
      fontSize: 24,
    },
    title: {
      color: theme.palette.grey['500'],
    },
  }),
);
