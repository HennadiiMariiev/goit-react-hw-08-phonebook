import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { registerUser, loginUser } from 'redux/auth/auth-operations';
import { LoadingButton } from '@mui/lab';
import { useSelector } from 'react-redux';
import { getIsFetching } from 'redux/auth/auth-selectors';
import { useContactInput } from 'hooks/useContactInput';
import TextField from '@mui/material/TextField';
import * as regexp from 'helpers/regexpPatterns';
import { Typography } from '@mui/material';
import * as helperText from 'helpers/helper-text';

import styles from '../TemplateForm/templateForm.module.scss';

export default function TemplateForm({ type }) {
  const dispatch = useDispatch();
  const isFetching = useSelector(getIsFetching);

  const [email, setEmail, isEmailError] = useContactInput('', regexp.email);
  const [name, setName, isNameError] = useContactInput('', regexp.name);
  const [password, setPassword, isPasswordError] = useContactInput('', regexp.password);
  const [isSubmitBtnDisabled, setIsSubmitBtnDisabled] = useState(true);

  useEffect(() => {
    const isRegisterAllow = () => {
      if (
        !!isPasswordError ||
        !!isEmailError ||
        !!isNameError ||
        email.length === 0 ||
        password.length === 0 ||
        name.length === 0
      )
        return true;
      return false;
    };

    const isLoginAllow = () => {
      if (!!isPasswordError || !!isEmailError || email.length === 0 || password.length === 0) return true;
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
  }, [isPasswordError, isEmailError, isNameError, name, email, password, type]);

  const onInputChange = ({ target: { name, value } }) => {
    switch (name) {
      case 'name':
        setName(value);
        break;

      case 'email':
        setEmail(value);
        break;

      case 'password':
        setPassword(value);
        break;

      default:
        return;
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();

    switch (type) {
      case 'register':
        dispatch(registerUser({ name, email, password }));
        break;

      case 'login':
        dispatch(loginUser({ email, password }));
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
            value={name}
            error={isNameError}
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
          value={email}
          error={isEmailError}
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
          value={password}
          error={isPasswordError}
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
