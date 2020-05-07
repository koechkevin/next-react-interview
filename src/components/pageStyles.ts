import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

export default makeStyles((theme: Theme) =>
  createStyles({
    body: {
      display: 'flex',
      flexDirection: 'column',
      padding: '16px 32px',
      borderRadius: 0,
    },
    sticky: {
      position: 'sticky',
      top: 64,
    },
    skeleton: {
    },
    loadMore: {
      marginTop: 8,
      display: 'flex',
      justifyContent: 'center',
      width: '100%'
    }
  }),
);
