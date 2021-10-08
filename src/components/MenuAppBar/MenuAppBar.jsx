import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Typography, IconButton, Tooltip, Toolbar, AppBar, Box, Menu, MenuItem, Link } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import HomeIcon from '@mui/icons-material/Home';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import LoginIcon from '@mui/icons-material/Login';
import ImportContactsIcon from '@mui/icons-material/ImportContacts';
import { useSelector, useDispatch } from 'react-redux';
import { getIsLoggedIn, getEmail, getName } from 'redux/auth/auth-selectors';
import { logoutUser } from 'redux/auth/auth-operations';
import { NavBarLink } from './NavBarLink/NavBarLink';
import { UserAvatar } from './UserAvatar/UserAvatar';

import styles from './menuAppBar.module.scss';
import { AvatarDialog } from './AvatarDialog/AvatarDialog';

export default function MenuAppBar() {
  const dispatch = useDispatch();

  const isLoggedIn = useSelector(getIsLoggedIn);
  const email = useSelector(getEmail);
  const name = useSelector(getName);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [userAvatar, setUserAvatar] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {}, [userAvatar]);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" className={styles.wrapper}>
        <Toolbar className={styles.wrapper}>
          {isLoggedIn ? (
            <>
              <div className={styles.navbar}>
                <NavBarLink to="/" title="Home" icon={<HomeIcon className={styles.icon} />} />
                <NavBarLink to="contacts" title="Contacts" icon={<ImportContactsIcon className={styles.icon} />} />
              </div>
              <div className={styles.navbar}>
                <Tooltip title="User menu" arrow>
                  <IconButton
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleMenu}
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
                  onClose={handleClose}
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
            </>
          ) : (
            <>
              <div className={styles.navbar}>
                <NavBarLink to="/" title="Home" icon={<HomeIcon className={styles.icon} />} />
                <NavBarLink to="/register" title="Register" icon={<HowToRegIcon className={styles.icon} />} />
                <NavBarLink to="/login" title="Log In" icon={<LoginIcon className={styles.icon} />} />
              </div>
              <div className={styles.navbar}>
                <IconButton
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                >
                  <AccountCircle fontSize="large" />
                </IconButton>
                <Typography variant="p" className={styles.welcome}>
                  Welcome,&nbsp;
                  <NavLink to="/login" className={styles.guest}>
                    guest!
                  </NavLink>
                </Typography>
              </div>
            </>
          )}
        </Toolbar>
        <AvatarDialog
          open={isDialogOpen}
          onClose={(value) => {
            setUserAvatar(value);
            setIsDialogOpen(false);
          }}
          handleListItemClick={() => {}}
        />
      </AppBar>
    </Box>
  );
}
