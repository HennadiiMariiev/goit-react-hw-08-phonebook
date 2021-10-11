import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { registerUser, loginUser } from 'redux/auth/auth-operations';
import { LoadingButton } from '@mui/lab';
import { useSelector } from 'react-redux';
import { getIsFetching } from 'redux/auth/auth-selectors';
import TextField from '@mui/material/TextField';
import { Typography } from '@mui/material';
import * as helperText from 'helpers/helper-text';

import { useUser } from 'hooks/useUser';

import styles from '../TemplateForm/templateForm.module.scss';

export default function TemplateForm({ type }) {
  const dispatch = useDispatch();
  const isFetching = useSelector(getIsFetching);

  const [user, setUser, error] = useUser();
  const [isSubmitBtnDisabled, setIsSubmitBtnDisabled] = useState(true);

  useEffect(() => {
    const isRegisterAllow = () => {
      if (Object.values(error).some((el) => el) || Object.values(user).some((el) => el.length === 0)) return true;
      return false;
    };

    const isLoginAllow = () => {
      if (error.email || error.password || user.email.length === 0 || user.password.length === 0) return true;
      return false;
    };

    switch (type) {
      case 'register':
        setIsSubmitBtnDisabled(isRegisterAllow());
        break;

      case 'login':
        setIsSubmitBtnDisabled(isLoginAllow());
        break;

      default:
        return;
    }
  }, [error, user, type]);

  const onInputChange = ({ target: { name, value } }) => {
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    switch (type) {
      case 'register':
        dispatch(registerUser(user));
        break;

      case 'login':
        dispatch(loginUser({ email: user.email, password: user.password }));
        break;

      default:
        return;
    }
  };

  return (
    <div className={styles.wrapper}>
      <form className={styles.form}>
        <Typography variant="h4" component="h4">
          {type === 'register' ? 'Registration' : 'Log In'}
        </Typography>
        {type === 'register' && (
          <TextField
            label="Name"
            variant="outlined"
            type="text"
            name="name"
            helperText={helperText.regName}
            placeholder="John Smith"
            required
            value={user.name}
            error={error.name && !!user.name.length}
            onChange={onInputChange}
            className={styles.input}
          />
        )}
        <TextField
          label="E-mail"
          variant="outlined"
          type="email"
          name="email"
          helperText={helperText.email}
          placeholder="john_smith@mail.com"
          required
          value={user.email}
          error={error.email && !!user.email.length}
          onChange={onInputChange}
          className={styles.input}
        />
        <TextField
          label="Password"
          variant="outlined"
          type="password"
          name="password"
          placeholder="Qwerty123!"
          helperText={helperText.password}
          required
          value={user.password}
          error={error.password && !!user.password.length}
          onChange={onInputChange}
          className={styles.input}
        />
        <LoadingButton
          variant="contained"
          type="submit"
          onClick={(e) => onSubmit(e)}
          loading={isFetching}
          disabled={isSubmitBtnDisabled}
          className={styles.loadButton}
        >
          {type === 'register' ? 'Sign up' : 'Sign In'}
        </LoadingButton>
      </form>
    </div>
  );
}
