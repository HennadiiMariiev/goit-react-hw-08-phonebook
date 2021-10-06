import React from 'react';
import { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import Link from '@mui/material/Link';
import HomeIcon from '@mui/icons-material/Home';
import { Tooltip } from '@mui/material';

import HowToRegIcon from '@mui/icons-material/HowToReg';
import LoginIcon from '@mui/icons-material/Login';
import ImportContactsIcon from '@mui/icons-material/ImportContacts';
import { useSelector, useDispatch } from 'react-redux';
import { getIsLoggedIn, getEmail, getName } from 'redux/auth/auth-selectors';
import { logoutUser } from 'redux/auth/auth-operations';

import { NavLink } from 'react-router-dom';

export default function MenuAppBar() {
  const dispatch = useDispatch();

  const isLoggedIn = useSelector(getIsLoggedIn);
  const email = useSelector(getEmail);
  const name = useSelector(getName);

  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="fixed"
        style={{
          backgroundColor: '#0c0c0c',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Toolbar
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
          }}
        >
          {!isLoggedIn && (
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
              <NavLink to="/">
                <Link
                  component="button"
                  variant="body1"
                  style={{ marginRight: '1rem', backgroundColor: '#0c0c0c', display: 'flex', alignItems: 'center' }}
                >
                  <HomeIcon style={{ marginRight: '0.5rem' }} />
                  Home
                </Link>
              </NavLink>
              <NavLink to="/register">
                <Link
                  component="button"
                  variant="body1"
                  style={{ marginRight: '1rem', backgroundColor: '#0c0c0c', display: 'flex', alignItems: 'center' }}
                >
                  <HowToRegIcon style={{ marginRight: '0.5rem' }} />
                  Register
                </Link>
              </NavLink>

              <NavLink to="/login">
                <Link
                  component="button"
                  variant="body1"
                  style={{ marginRight: '1rem', backgroundColor: '#0c0c0c', display: 'flex', alignItems: 'center' }}
                >
                  <LoginIcon style={{ marginRight: '0.5rem' }} />
                  Log In
                </Link>
              </NavLink>
            </div>
          )}

          {isLoggedIn && (
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
              <NavLink to="/">
                <Link
                  component="button"
                  variant="body1"
                  style={{ marginRight: '1rem', backgroundColor: '#0c0c0c', display: 'flex', alignItems: 'center' }}
                >
                  <HomeIcon style={{ marginRight: '0.5rem' }} />
                  Home
                </Link>
              </NavLink>
              <NavLink to="/contacts">
                <Link
                  component="button"
                  variant="body1"
                  style={{ marginRight: '1rem', backgroundColor: '#0c0c0c', display: 'flex', alignItems: 'center' }}
                >
                  <ImportContactsIcon style={{ marginRight: '0.5rem' }} />
                  Contacts
                </Link>
              </NavLink>
            </div>
          )}

          {isLoggedIn ? (
            <div>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle size="large" />
              </IconButton>

              {/* <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={() => dispatch(logoutUser(name))}>Log out</MenuItem>
              </Menu> */}
              <Typography variant="p">{email}</Typography>
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
          ) : (
            <div>
              <Typography variant="p">
                Welcome,&nbsp;
                <Link component="button" variant="body2">
                  guest
                </Link>
                !
              </Typography>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
