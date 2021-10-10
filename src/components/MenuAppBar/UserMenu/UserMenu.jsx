import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getEmail, getIsLoggedIn, getName } from 'redux/auth/auth-selectors';
import { logoutUser } from 'redux/auth/auth-operations';
import { Tooltip, IconButton, Menu, MenuItem, Typography } from '@mui/material';
import { UserAvatar } from 'components/MenuAppBar/UserAvatar/UserAvatar';
import { getAvatar } from 'redux/auth/auth-selectors';
import LogoutIcon from '@mui/icons-material/Logout';

import styles from './../menuAppBar.module.scss';

export const UserMenu = ({ isDialogOpen, setIsDialogOpen, anchorEl, setAnchorEl }) => {
  const dispatch = useDispatch();
  const persistedAvatar = useSelector(getAvatar);
  const email = useSelector(getEmail);
  const name = useSelector(getName);
  const isLoggedIn = useSelector(getIsLoggedIn);
  const [userAvatar, setUserAvatar] = useState('');

  useEffect(() => {
    isLoggedIn ? setUserAvatar(persistedAvatar) : setUserAvatar('');
  }, [isLoggedIn, persistedAvatar]);

  return (
    <div className={styles.navbar}>
      <Tooltip title="User menu" arrow>
        <IconButton
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={(event) => setAnchorEl(event.currentTarget)}
          color="inherit"
          className={styles.userAvatar}
        >
          <UserAvatar name={name} src={userAvatar} />
        </IconButton>
      </Tooltip>

      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
      >
        <MenuItem onClick={() => setIsDialogOpen(!isDialogOpen)}>Select Avatar</MenuItem>
        <MenuItem onClick={() => dispatch(logoutUser(name))}>Log out</MenuItem>
      </Menu>
      <Typography variant="p" className={styles.welcome}>
        {email}
      </Typography>
      <Tooltip title="Log Out" arrow>
        <IconButton
          size="large"
          aria-label="Log Out"
          aria-controls="logout"
          aria-haspopup="true"
          onClick={() => dispatch(logoutUser(name))}
          color="inherit"
        >
          <LogoutIcon />
        </IconButton>
      </Tooltip>
    </div>
  );
};
