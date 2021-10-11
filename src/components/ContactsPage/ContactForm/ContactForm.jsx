import React from 'react';
import { toastMessage } from '../../../helpers/form-helper';
import { useSelector, useDispatch } from 'react-redux';
import { getItems } from 'redux/contacts-selectors';
import { fetchPostSingleContact } from 'redux/items/items-operations';
import { useContact } from 'hooks/useContact';
import AddIcon from '@mui/icons-material/Add';
import { isNameInContacts } from 'helpers/isNameInContacts';
import { FormControl, InputLabel, Input, FormHelperText, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import * as helperText from 'helpers/helper-text';
import { isAllowedKeyCode } from 'helpers/checkKeyCode';
import { useCurrentButton } from 'hooks/useCurrentButton';

import styles from '../../TemplateForm/templateForm.module.scss';

export function ContactForm() {
  const items = useSelector(getItems);
  const [isCurrentButton, setIsCurrentButton] = useCurrentButton();
  const dispatch = useDispatch();

  const [contact, setContact, error] = useContact();

  const isSubmitButtonDisabled = () => {
    if (Object.values(error).some((el) => el) || Object.values(contact).some((el) => el.length === 0)) return true;
    return false;
  };

  //#region methods
  const onInputChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    if (name === 'number') {
      if (isAllowedKeyCode(event)) setContact((prev) => ({ ...prev, [name]: value }));
    } else setContact((prev) => ({ ...prev, [name]: value }));
  };

  const clearInputs = () => {
    setContact({ name: '', number: '' });
  };

  const submitNewContact = (event) => {
    event.preventDefault();

    if (isNameInContacts(items, contact.name)) {
      toastMessage('warn', `There is an existing contact with name "${contact.name}"!`);
      return;
    }

    setIsCurrentButton(true);
    dispatch(fetchPostSingleContact(contact));
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
            value={contact.name}
            onChange={onInputChange}
            error={error.name && !!contact.name.length}
          />
          <FormHelperText id="helper-text">{helperText.name}</FormHelperText>
        </FormControl>
        <FormControl className={styles.control}>
          <InputLabel htmlFor="number">Number</InputLabel>
          <Input
            id="number"
            name="number"
            aria-describedby="contact-number"
            value={contact.number}
            onChange={onInputChange}
            error={error.number && !!contact.number.length}
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
