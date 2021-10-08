import React from 'react';
import { Container } from '@mui/material';

const styles = {
  padding: '5.5rem 2rem 5rem',
};

export function CustomContainer({ children }) {
  return <Container style={styles}>{children}</Container>;
}
