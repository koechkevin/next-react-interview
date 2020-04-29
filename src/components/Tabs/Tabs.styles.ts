import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

export default makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.paper,
      minWidth: 800,
    },
    bar: {
      backgroundColor: theme.palette.primary.contrastText,
      top: 64,
    }
  }),
);
