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
import { useSelector } from 'react-redux';
import { getIsLoggedIn, getEmail } from 'redux/auth/auth-selectors';

import { useTabContext } from 'components/ActiveTabContext/ActiveTabContext';

export default function MenuAppBar() {
  const isLoggedIn = useSelector(getIsLoggedIn);
  const email = useSelector(getEmail);

  const [auth, setAuth] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);

  const activeTab = useTabContext();

  const handleChange = (event) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  console.log('activeTab: ', activeTab);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{ backgroundColor: '#0c0c0c' }}>
        <Toolbar>
          <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Button
            variant="contained"
            startIcon={<HowToRegIcon />}
            style={{ marginRight: '1rem', backgroundColor: '#0c0c0c' }}
            onClick={() => activeTab.toggleActive('register')}
          >
            Register
          </Button>
          <Button
            variant="contained"
            startIcon={<LoginIcon />}
            style={{ marginRight: '1rem', backgroundColor: '#0c0c0c' }}
            onClick={() => activeTab.toggleActive('login')}
          >
            Log In
          </Button>
          <Button
            variant="contained"
            startIcon={<ImportContactsIcon />}
            style={{ marginRight: '1rem', backgroundColor: '#0c0c0c' }}
          >
            Contacts
          </Button>

          {isLoggedIn && (
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
                <MenuItem onClick={handleClose}>Log out</MenuItem>
              </Menu>
              <Typography variant="p">{email}</Typography>
            </div>
          )}

          {!isLoggedIn && (
            <div>
              <Typography variant="p">
                Welcome,{' '}
                <Link
                  component="button"
                  variant="body2"
                  onClick={() => {
                    console.info('log in');
                  }}
                >
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
