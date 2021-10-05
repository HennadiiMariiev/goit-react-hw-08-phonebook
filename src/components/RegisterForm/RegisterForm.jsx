import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { registerUser } from 'redux/auth/auth-operations';
import { useInput } from 'hooks/useInput';
import { LoadingButton } from '@mui/lab';
import { useSelector } from 'react-redux';
import { getIsFetching } from 'redux/auth/auth-selectors';

import TextField from '@mui/material/TextField';

// export const useInput = (input) => {
//   const [value, setValue] = useState(() => '');

//   useEffect(() => {
//     function isValidInput(input) {
//       if (!input.value.match(input.pattern) && input.value.length) return false;

//       return true;
//     }

//     if (!isValidInput(input.current)) {
//       input.current.style = 'background-color: #f7d7d7;';
//     } else {
//       input.current.style = 'background-color: transparent;';
//     }
//   }, [value, input]);

//   return [value, setValue];
// };

export default function RegisterForm() {
  // const nameInput = useRef();
  // const emailInput = useRef();
  // const passwordInput = useRef();

  const isFetching = useSelector(getIsFetching);

  // const [name, setName] = useInput(nameInput);
  // const [email, setEmail] = useInput(emailInput);
  // const [password, setPassword] = useInput(passwordInput);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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
    <div style={{ marginTop: '5rem' }}>
      <form style={{ display: 'flex', flexDirection: 'column', padding: '1rem' }}>
        <TextField
          label="Name"
          variant="outlined"
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name should contains letters, `, - and whitespaces. For example, Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan etc"
          placeholder="Please, type contact name"
          required
          value={name}
          // ref={nameInput}
          onChange={onInputChange}
        />
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
          Register
        </LoadingButton>
      </form>
    </div>
  );
}
