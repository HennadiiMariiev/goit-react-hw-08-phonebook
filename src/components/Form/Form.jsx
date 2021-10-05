import React from 'react';
import { toastMessage } from '../../helpers/form-helper';
import { useSelector } from 'react-redux';
import { getItems } from 'redux/contacts-selectors';
import { useDispatch } from 'react-redux';
import { fetchPostSingleContact } from 'redux/items/items-operations';
import { useInput } from 'hooks/useInput';
import { Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { Button } from '@mui/material';

import { FormControl, InputLabel, Input, FormHelperText } from '@mui/material';
import * as regexp from 'helpers/regexpPatterns';
import * as helperText from 'helpers/helper-text';

export function ContactForm() {
  const items = useSelector(getItems);
  const dispatch = useDispatch();

  const [name, setName, isNameError] = useInput('', regexp.name);
  const [number, setNumber, isNumberError] = useInput('', regexp.number);

  //#region methods
  const onInputChange = (event) => {
    switch (event.target.name) {
      case 'name':
        setName(event.target.value);
        break;

      case 'number':
        setNumber(event.target.value);
        break;

      default:
        return;
    }
  };

  const clearInputs = () => {
    setName('');
    setNumber('');
  };

  const isNameInContacts = (searchName) => items.find(({ name }) => name === searchName);

  const submitNewContact = (event) => {
    event.preventDefault();

    if (isNameInContacts(name)) {
      toastMessage('warn', `There is an existing contact with name "${name}"!`);
      return;
    }

    dispatch(fetchPostSingleContact({ name, number }));
    clearInputs();
  };
  //#endregion

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        margin: '6rem 0 1rem',
      }}
    >
      <form
        onSubmit={submitNewContact}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-start',
          padding: '1.5rem',
          background: '#FFFFFF',
          minWidth: 'auto',
          border: '1px solid #1976d2',
          borderRadius: '5px',
        }}
      >
        <Typography
          variant="h5"
          component="h5"
          style={{
            margin: '0 0 0.5rem',
            color: '#1976d2',
          }}
        >
          Add new contact
        </Typography>
        <FormControl
          style={{
            minWidth: '300px',
            marginBottom: '1rem',
          }}
        >
          <InputLabel htmlFor="name">Name</InputLabel>
          <Input
            id="name"
            name="name"
            aria-describedby="contact-name"
            value={name}
            onChange={onInputChange}
            error={Boolean(name.length && isNameError)}
          />
          <FormHelperText id="helper-text">{helperText.name}</FormHelperText>
        </FormControl>
        <FormControl
          style={{
            minWidth: '300px',
            marginBottom: '1.5rem',
          }}
        >
          <InputLabel htmlFor="number">Number</InputLabel>
          <Input
            id="number"
            name="number"
            aria-describedby="contact-number"
            value={number}
            onChange={onInputChange}
            error={Boolean(number.length && isNumberError)}
          />
          <FormHelperText id="helper-text">{helperText.number}</FormHelperText>
        </FormControl>
        <Button
          variant="contained"
          type="submit"
          startIcon={<AddIcon />}
          disabled={Boolean(isNameError || isNumberError)}
        >
          Add contact
        </Button>
      </form>
    </div>
  );
}
