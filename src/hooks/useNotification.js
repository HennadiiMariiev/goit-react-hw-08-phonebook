import { useCallback, useMemo, forwardRef } from 'react';
import { useSnackbar, SnackbarContent } from 'notistack';

import { CircularProgress, Grid } from '@mui/material';
import { makeStyles } from '@material-ui/styles';
import { Alert } from '@mui/lab';

const useStyles = makeStyles((theme) => ({
  root: {
    boxShadow: '0 3px 5px -1px rgb(0 0 0 / 20%), 0 6px 10px 0 rgb(0 0 0 / 14%), 0 1px 18px 0px rgb(0 0 0 / 12%)',
  },
  alert: {
    width: '100%',
  },
  loading: {
    marginLeft: 'auto',
  },
}));

const Notification = forwardRef((props, ref) => {
  const classes = useStyles();

  return (
    <SnackbarContent ref={ref} className={classes.root}>
      <Alert
        variant="filled"
        color="info"
        severity="info"
        classes={{
          root: classes.alert,
          message: classes.alert,
        }}
      >
        <Grid container spacing={3}>
          <Grid item>{props.message}</Grid>

          <Grid item className={classes.loading}>
            <CircularProgress color="inherit" size={20} />
          </Grid>
        </Grid>
      </Alert>
    </SnackbarContent>
  );
});

function useNotification() {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const notification = useMemo(
    () => ({
      default: (message) =>
        enqueueSnackbar(message, {
          variant: 'default',
          autoHideDuration: 1000,
        }),
      success: (message, duration = 2000) =>
        enqueueSnackbar(message, {
          variant: 'success',
          autoHideDuration: duration,
        }),
      error: (message) =>
        enqueueSnackbar(message, {
          variant: 'error',
          autoHideDuration: 2500,
        }),
      warning: (message) =>
        enqueueSnackbar(message, {
          variant: 'warning',
          autoHideDuration: 3000,
        }),
    }),
    []
  );

  const closeNotification = useCallback(
    (key, onEnd) => {
      return (...args) => {
        if (key) closeSnackbar(key);

        setTimeout(() => onEnd(...args), 600);
      };
    },
    [closeSnackbar]
  );

  const snackbars = useMemo(
    () => ({
      info: (message) => {
        const snackbarKey = enqueueSnackbar(message, {
          variant: 'info',
          content: (_, message) => <Notification message={message} />,
          persist: true,
        });

        return Object.keys(notification).reduce((acc, key) => {
          acc[key] = closeNotification(snackbarKey, notification[key]);

          return acc;
        }, {});
      },
      ...notification,
    }),
    []
  );

  return snackbars;
}

export default useNotification;
