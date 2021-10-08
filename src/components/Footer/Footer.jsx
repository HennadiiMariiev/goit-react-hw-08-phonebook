import React from 'react';
import { Typography, Link } from '@mui/material';

import styles from './footer.module.scss';

export function Footer() {
  return (
    <div className={styles.wrapper}>
      <Typography variant="p" component="p" className={styles.subtitle}>
        Developed by{' '}
        <Link href="https://goit.ua/" target="_blank" className={styles.link}>
          GoIT
        </Link>
        &nbsp;student
      </Typography>
      <Typography variant="p" component="p">
        Copyright &copy; 2021
      </Typography>
    </div>
  );
}
