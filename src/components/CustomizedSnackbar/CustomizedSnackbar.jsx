import React from 'react';
import { Snackbar, Alert } from '@mui/material';
import { useNotificationContext } from 'components/NotificationProvider/NotificationProvider';

export function CustomizedSnackbar() {
  const { closeNotification, type, message, open } = useNotificationContext();

  return (
    <Snackbar open={open} autoHideDuration={3000} onClose={closeNotification}>
      <Alert onClose={closeNotification} severity={type} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  );
}
