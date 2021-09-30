import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { registerUser } from 'redux/auth/auth-operations';
import { useInput } from 'hooks/useInput';

export const RegisterForm = () => {
  const nameInput = useRef();
  const emailInput = useRef();
  const passwordInput = useRef();

  const [name, setName] = useInput(nameInput);
  const [email, setEmail] = useInput(emailInput);
  const [password, setPassword] = useInput(passwordInput);

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

  const clearInputs = () => {
    setName('');
    setEmail('');
    setPassword('');
  };

  const onSubmit = (e) => {
    e.preventDefault();

    dispatch(registerUser({ name, email, password }));
  };

  return (
    <div>
      <form style={{ display: 'flex', flexDirection: 'column', padding: '1rem' }}>
        <input
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name should contains letters, `, - and whitespaces. For example, Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan etc"
          placeholder="Please, type contact name"
          required
          value={name}
          ref={nameInput}
          onChange={onInputChange}
        />
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
          Register
        </button>
      </form>
    </div>
  );
};
