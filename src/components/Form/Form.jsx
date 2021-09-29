import React, { useEffect, useState, useRef } from 'react';

import {
  StyledForm,
  StyledTitle,
  StyledLable,
  StyledInput,
  StyledButton as StyledPrimaryButton,
} from './StyledFormComponents';
import { toastMessage } from './form-helper';
import { useSelector } from 'react-redux';
import { getItems } from 'redux/contacts-selectors';
import { useDispatch } from 'react-redux';
import { fetchPostSingleContact } from 'redux/items/items-operations';

const useInput = (input) => {
  const [value, setValue] = useState(() => '');

  useEffect(() => {
    function isValidInput(input) {
      if (!input.value.match(input.pattern) && input.value.length) return false;

      return true;
    }

    if (!isValidInput(input.current)) {
      input.current.style = 'background-color: #f7d7d7;';
    } else {
      input.current.style = 'background-color: transparent;';
    }
  }, [value, input]);

  return [value, setValue];
};

export function Form() {
  const items = useSelector(getItems);
  const dispatch = useDispatch();

  const nameInput = useRef();
  const numberInput = useRef();

  const [name, setName] = useInput(nameInput);
  const [number, setNumber] = useInput(numberInput);

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
    <>
      <StyledTitle>Phonebook</StyledTitle>
      <StyledForm onSubmit={submitNewContact}>
        <StyledLable>
          Name
          <StyledInput
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
            placeholder="Please, type contact name"
            required
            value={name}
            ref={nameInput}
            onChange={onInputChange}
          />
        </StyledLable>
        <StyledLable>
          Number
          <StyledInput
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Номер телефона должен состоять цифр и может содержать пробелы, тире, круглые скобки и может начинаться с +"
            placeholder="Please, type contact number"
            required
            value={number}
            ref={numberInput}
            onChange={onInputChange}
          />
        </StyledLable>
        <StyledPrimaryButton type="submit">Add contact</StyledPrimaryButton>
      </StyledForm>
    </>
  );
}
