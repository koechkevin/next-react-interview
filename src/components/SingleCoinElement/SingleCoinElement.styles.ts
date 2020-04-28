import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

export default makeStyles((theme: Theme) =>
  createStyles({
    td: {
      padding: 8,
      display: 'flex',
    },
    icon: {
      color: theme.palette.primary.main,
    },
    positive: {
      color: 'green',
    },
    negative: {
      color: 'red',
    },
    row: {
      padding: 8,
      borderBottom: `1px solid ${theme.palette.grey['300']}`,
      display: 'flex',
      flex: 1,
    },
  }),
);
