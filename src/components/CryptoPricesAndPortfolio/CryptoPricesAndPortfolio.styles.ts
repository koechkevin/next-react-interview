import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

export default makeStyles((theme: Theme) =>
  createStyles({
    flex: {
      display: 'flex',
      height: 64,
      justifyContent: 'space-between',
      borderTop: `1px solid ${theme.palette.grey['300']}`,
      borderBottom: `1px solid ${theme.palette.grey['300']}`,
      width: '100%',
      marginTop: 16,
      padding: '12px 4px',
    },positive: {
      color: 'green',
    },
    negative: {
      color: 'red',
    },
    parent: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: 16,
      minWidth: 800,
      flexDirection: 'column'
    },
    label: {
      color: theme.palette.grey['500']
    }
  }),
);
