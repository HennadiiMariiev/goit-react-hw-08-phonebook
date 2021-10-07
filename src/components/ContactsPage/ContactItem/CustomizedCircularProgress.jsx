import React from 'react';
import { CircularProgress } from '@mui/material';
import { green } from '@mui/material/colors';

export function CustomizedCircularProgress() {
  return (
    <CircularProgress
      size={56}
      sx={{
        color: green[500],
        position: 'absolute',
        top: -4,
        left: -5,
        zIndex: 1,
      }}
    />
  );
}
