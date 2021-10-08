import React from 'react';
import { NavLink } from 'react-router-dom';
import { Link } from '@mui/material';

import styles from '../menuAppBar.module.scss';

export function NavBarLink({ to, title, icon = null }) {
  return (
    <NavLink to={to} className={styles.navlink} activeClassName={styles.active} exact>
      <Link component="button" variant="h6" underline="hover" className={styles.link}>
        {icon}
        {title}
      </Link>
    </NavLink>
  );
}
