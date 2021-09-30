import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getEmail, getIsLoggedIn, getName } from 'redux/auth/auth-selectors';
import { logoutUser } from 'redux/auth/auth-operations';

export const UserMenu = () => {
  const dispatch = useDispatch();
  const email = useSelector(getEmail);
  const name = useSelector(getName);
  const isLoggedIn = useSelector(getIsLoggedIn);

  return (
    <>
      {isLoggedIn ? (
        <div style={{ marginBottom: '1rem', display: 'flex' }}>
          <p>{email}</p>
          <button type="button" onClick={() => dispatch(logoutUser(name))}>
            Log Out
          </button>
        </div>
      ) : (
        <div style={{ marginBottom: '1rem', display: 'flex' }}>
          <p>Hello, guest!</p>
          <button type="button" onClick={() => console.log('log in')}>
            Log in
          </button>
        </div>
      )}
    </>
  );
};
