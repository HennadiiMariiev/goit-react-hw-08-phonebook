import React from 'react';
import { Typography } from '@mui/material';

import styles from './footer.module.scss';

export function Footer() {
  return (
    <div className={styles.wrapper}>
      <Typography variant="h6" component="h4" className={styles.text}>
        Developed by GoIT student
      </Typography>
      <Typography variant="p" component="p">
        &copy; 2021
      </Typography>
    </div>
  );
}
