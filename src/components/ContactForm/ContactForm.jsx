import React, { useState } from 'react';
import { toastMessage } from '../../helpers/form-helper';
import { useSelector, useDispatch } from 'react-redux';
import { getItems } from 'redux/contacts-selectors';
import { fetchPostSingleContact } from 'redux/items/items-operations';
import { useContactInput } from 'hooks/useContactInput';
import AddIcon from '@mui/icons-material/Add';
import { isNameInContacts } from 'helpers/isNameInContacts';
import { FormControl, InputLabel, Input, FormHelperText, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import * as regexp from 'helpers/regexpPatterns';
import * as helperText from 'helpers/helper-text';
import { isAllowedKeyCode } from 'helpers/checkKeyCode';
import { isValidPhoneLength } from 'helpers/checkPhoneLength';
import { useCurrentButton } from 'hooks/useCurrentButton';

import styles from '../TemplateForm/templateForm.module.scss';

export function ContactForm() {
  const items = useSelector(getItems);
  const [isCurrentButton, setIsCurrentButton] = useCurrentButton();
  const dispatch = useDispatch();

  const [name, setName, isNameError] = useContactInput('', regexp.name);
  const [number, setNumber] = useContactInput('', regexp.number);

  const isSubmitButtonDisabled = () => {
    if (!name.length || isNameError || !isValidPhoneLength(number)) return true;
    return false;
  };

  //#region methods
  const onInputChange = (event) => {
    switch (event.target.name) {
      case 'name':
        setName(event.target.value);
        break;

      case 'number':
        if (isAllowedKeyCode(event)) setNumber(event.target.value);
        break;

      default:
        return;
    }
  };

  const clearInputs = () => {
    setName('');
    setNumber('');
  };

  const submitNewContact = (event) => {
    event.preventDefault();

    if (isNameInContacts(items, name)) {
      toastMessage('warn', `There is an existing contact with name "${name}"!`);
      return;
    }

    setIsCurrentButton(true);
    dispatch(fetchPostSingleContact({ name, number }));
    clearInputs();
  };
  //#endregion

  return (
    <div className={styles.wrapper}>
      <form onSubmit={submitNewContact} className={styles.form}>
        <Typography variant="h4" component="h4">
          Add new contact
        </Typography>
        <FormControl className={styles.control}>
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
        <FormControl className={styles.control}>
          <InputLabel htmlFor="number">Number</InputLabel>
          <Input
            id="number"
            name="number"
            aria-describedby="contact-number"
            value={number}
            onChange={onInputChange}
            error={!!number.length && !isValidPhoneLength(number)}
          />
          <FormHelperText id="helper-text">{helperText.number}</FormHelperText>
        </FormControl>
        <LoadingButton
          variant="contained"
          type="submit"
          loading={isCurrentButton}
          disabled={isSubmitButtonDisabled()}
          className={styles.loadButton}
          startIcon={<AddIcon className={styles.icon} />}
        >
          Add contact
        </LoadingButton>
      </form>
    </div>
  );
}
