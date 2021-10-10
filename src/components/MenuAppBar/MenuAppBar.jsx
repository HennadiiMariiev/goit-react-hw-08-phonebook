import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Typography, IconButton, Toolbar, AppBar, Box } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import HomeIcon from '@mui/icons-material/Home';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import LoginIcon from '@mui/icons-material/Login';
import ImportContactsIcon from '@mui/icons-material/ImportContacts';
import { useSelector, useDispatch } from 'react-redux';
import { getIsLoggedIn } from 'redux/auth/auth-selectors';
import { selectAvatar } from 'redux/auth/auth-operations';
import { NavBarLink } from './NavBarLink/NavBarLink';
import { AvatarDialog } from './AvatarDialog/AvatarDialog';
import { UserMenu } from 'components/MenuAppBar/UserMenu/UserMenu';

import styles from './menuAppBar.module.scss';

export default function MenuAppBar() {
  const dispatch = useDispatch();

  const isLoggedIn = useSelector(getIsLoggedIn);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

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
              <UserMenu
                isDialogOpen={isDialogOpen}
                setIsDialogOpen={setIsDialogOpen}
                anchorEl={anchorEl}
                setAnchorEl={setAnchorEl}
              />
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
                  onClick={(event) => setAnchorEl(event.currentTarget)}
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
            if (typeof value === 'string') dispatch(selectAvatar(value));
            setIsDialogOpen(false);
          }}
        />
      </AppBar>
    </Box>
  );
}
