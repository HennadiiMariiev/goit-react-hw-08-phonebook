import React, { useContext } from 'react';
import { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu/index';
import { Button } from '@mui/material';
import Link from '@mui/material/Link';

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
      <AppBar position="static" style={{ backgroundColor: '#0c0c0c' }}>
        <Toolbar>
          {!isLoggedIn && (
            <>
              {/* <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
                <MenuIcon />
              </IconButton> */}

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
                  // onClick={() => activeTab.toggleActive('login')}
                >
                  <LoginIcon style={{ marginRight: '0.5rem' }} />
                  Log In
                </Link>
              </NavLink>
            </>
          )}

          {isLoggedIn && (
            <NavLink to="/contacts">
              <Link
                component="button"
                variant="body1"
                style={{ marginRight: '1rem', backgroundColor: '#0c0c0c', display: 'flex', alignItems: 'center' }}
                // onClick={() => activeTab.toggleActive('login')}
              >
                <ImportContactsIcon style={{ marginRight: '0.5rem' }} />
                Contacts
              </Link>
            </NavLink>
          )}

          {isLoggedIn ? (
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>

              <Menu
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
              </Menu>
              <Typography variant="p">{email}</Typography>
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
