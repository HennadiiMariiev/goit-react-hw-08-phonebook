import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser } from 'redux/auth/auth-operations';
import { useInput } from 'hooks/useInput';

export const SignInForm = () => {
  const emailInput = useRef();
  const passwordInput = useRef();

  const [email, setEmail] = useInput(emailInput);
  const [password, setPassword] = useInput(passwordInput);

  const dispatch = useDispatch();

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
    <div>
      <form style={{ display: 'flex', flexDirection: 'column', padding: '1rem' }}>
        <input
          type="email"
          name="email"
          pattern="/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/"
          title="Email should contains Latin letters, Only one @-symbol, One or more dot"
          placeholder="Please, type email"
          required
          value={email}
          ref={emailInput}
          onChange={onInputChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Please, type password"
          pattern="/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,12}$/"
          title="Password should contains from 8 to 12 symbols..."
          required
          value={password}
          ref={passwordInput}
          onChange={onInputChange}
        />
        <button type="submit" onClick={(e) => onSubmit(e)}>
          Sign In
        </button>
      </form>
    </div>
  );
};
