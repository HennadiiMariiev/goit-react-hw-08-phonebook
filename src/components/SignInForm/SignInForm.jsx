import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser } from 'redux/auth/auth-operations';
import { useInput } from 'hooks/useInput';

import LoadingButton from '@mui/lab/LoadingButton';
import { useSelector } from 'react-redux';
import { getIsFetching } from 'redux/auth/auth-selectors';

import TextField from '@mui/material/TextField';

export default function SignInForm() {
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const isFetching = useSelector(getIsFetching);

  const onInputChange = ({ target: { name, value } }) => {
    switch (name) {
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

  const clearInputs = () => {
    setPassword('');
    setEmail('');
  };

  const onSubmit = (e) => {
    e.preventDefault();

    dispatch(loginUser({ email, password }));
  };

  return (
    <div style={{ marginTop: '5rem' }}>
      <form style={{ display: 'flex', flexDirection: 'column', padding: '1rem' }}>
        <TextField
          label="E-mail"
          variant="outlined"
          type="email"
          name="email"
          pattern="/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/"
          title="Email should contains Latin letters, Only one @-symbol, One or more dot"
          placeholder="Please, type email"
          required
          value={email}
          // ref={emailInput}
          onChange={onInputChange}
        />
        <TextField
          label="Password"
          variant="outlined"
          type="password"
          name="password"
          placeholder="Please, type password"
          pattern="/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,12}$/"
          title="Password should contains from 8 to 12 symbols..."
          required
          value={password}
          // ref={passwordInput}
          onChange={onInputChange}
        />
        <LoadingButton type="submit" onClick={(e) => onSubmit(e)} loading={isFetching}>
          Sign In
        </LoadingButton>
      </form>
    </div>
  );
}
