import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

export default makeStyles((theme: Theme) =>
  createStyles({
    head: {
      borderTop: `1px solid ${theme.palette.grey['300']}`,
      borderBottom: `1px solid ${theme.palette.grey['300']}`,
      padding: 8,
      display: 'flex',
      height: 32,
    },
    cell: {
      flex: 1,
      paddingLeft: 8,
      justifyContent: 'center',
    },
  }),
);
