import React from 'react';
import { Typography, Link } from '@mui/material';

import styles from './homePage.module.scss';

export default function HomePage() {
  return (
    <div className={styles.wrapper}>
      <Typography variant="h3" component="h3" className={styles.title}>
        Welcome to PhoneBook!
      </Typography>
      <Typography variant="p" component="p">
        This is very simple application for saving your contacts, created with&nbsp;
        <Link href="https://reactjs.org/" target="_blank">
          React.js
        </Link>{' '}
        as a homework on{' '}
        <Link href="https://goit.ua/" target="_blank">
          GoIT
        </Link>
        &nbsp;FullStack JS Course!
      </Typography>
      <Typography variant="p" component="p">
        Hope you will enjoy it!
      </Typography>
      <Typography variant="h5" component="h5" className={styles.subtitle}>
        Here is a small screencast-video about this App!
      </Typography>
      <iframe
        width="960"
        height="715"
        src="https://www.youtube.com/embed/QAhIhUKgfZg"
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
}
