import React from 'react';
import { useDispatch } from 'react-redux';
import { registerUser, loginUser } from 'redux/auth/auth-operations';
import { LoadingButton } from '@mui/lab';
import { useSelector } from 'react-redux';
import { getIsFetching } from 'redux/auth/auth-selectors';
import { useContactInput } from 'hooks/useContactInput';
import TextField from '@mui/material/TextField';
import * as regexp from 'helpers/regexpPatterns';
import { Typography } from '@mui/material';

import styles from '../TemplateForm/templateForm.module.scss';

export default function TemplateForm({ type }) {
  const isFetching = useSelector(getIsFetching);

  const [email, setEmail, isEmailError] = useContactInput('', regexp.email);
  const [name, setName, isNameError] = useContactInput('', regexp.name);
  const [password, setPassword, isPasswordError] = useContactInput('', regexp.password);

  const dispatch = useDispatch();

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

  const isButtonDisabled = () => {
    switch (type) {
      case 'register':
        if (
          !!isPasswordError ||
          !!isEmailError ||
          !!isNameError ||
          email.length === 0 ||
          password.length === 0 ||
          name.length === 0
        )
          return true;
        break;

      case 'login':
        if (!!isPasswordError || !!isEmailError || email.length === 0 || password.length === 0) return true;
        break;

      default:
        return;
    }
    return false;
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
            helperText="Name should contains letters, `, - and whitespaces. For example, Adrian, Jacob Mercer etc"
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
          helperText="Email should contains Latin letters, one @-symbol, one or more dot"
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
          helperText="Password should contains 8-12 symbols, 'a-z' 'A-Z' '0-9' '!@#$%^&*_=+-'"
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
          disabled={isButtonDisabled()}
          className={styles.loadButton}
        >
          {type === 'register' ? 'Sign up' : 'Sign In'}
        </LoadingButton>
      </form>
    </div>
  );
}
