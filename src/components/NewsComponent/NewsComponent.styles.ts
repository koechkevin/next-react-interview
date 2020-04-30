import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

export default makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: 16,
      display: 'flex',
      marginBottom: 8,
      flex: 1,
      '& > div': {
        marginRight: 16,
      },
    },
    sourceLinks: {
      fontWeight:'bold',
      fontSize: 12,
      color: theme.palette.grey['600'],
      cursor: 'pointer',
    },
    bottom: {
      display: 'flex',
      marginTop: 8,
      justifyContent: 'space-between',
    },
    flex: {
      display: 'flex',
      fontSize: 16,
      marginTop: 16,
      textTransform: 'capitalize',
      color: theme.palette.grey['600']
    },
    reactions: {
      display: 'flex',
      alignItems: 'center',
      fontSize: 14,
    },
    coinStyle: {
      display: 'flex',
      alignItems: 'center',
      '& > div': {
        marginRight: 16,
        fontWeight: 'bold',
      }
    },
    hoverableText: {
      cursor: 'pointer',
      '&:hover': {
        color: theme.palette.primary.light,
      }
    }

  }),
);
