import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useContact } from 'hooks/useContact';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import UndoIcon from '@mui/icons-material/Undo';
import { TextField, ListItem, Divider } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import * as helperText from 'helpers/helper-text';
import { fetchRemoveSingleContact, fetchPatchSingleContact } from 'redux/items/items-operations';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import { isAllowedKeyCode } from 'helpers/checkKeyCode';
import { isValidPhoneLength } from 'helpers/checkPhoneLength';
import { getIsLoading } from 'redux/loading/loading-selector';
import { ButtonWrapper } from './ButtonWrapper';
import { CustomizedCircularProgress } from './CustomizedCircularProgress';
import { isIdInContacts } from 'helpers/isNameInContacts';
import { getItems } from 'redux/contacts-selectors';
import { toastMessage } from 'helpers/form-helper';

import styles from 'components/ContactsPage/contactPage.module.scss';

export default function ContactItem({ id, name, number }) {
  const [contact, setContact, error] = useContact({ name, number });
  const [isValuesChanged, setIsValuesChanged] = useState(false);
  const [isSaveButtonDisabled, seIsSaveButtonDisabled] = useState(true);

  const dispatch = useDispatch();
  const isLoading = useSelector(getIsLoading);
  const contacts = useSelector(getItems);

  useEffect(() => {
    if (contact.name !== name || contact.number !== number) setIsValuesChanged(true);
    else setIsValuesChanged(false);
  }, [contact, name, number]);

  useEffect(() => {
    if (!isLoading) setIsValuesChanged(false);
  }, [isLoading]);

  useEffect(() => {
    if (error.name || contact.name.length === 0 || !isValidPhoneLength(contact.number)) seIsSaveButtonDisabled(true);
    else seIsSaveButtonDisabled(false);

    if (isIdInContacts(contacts, contact.name, id)) seIsSaveButtonDisabled(true);
  }, [error.name, contact, contacts, id]);

  const onInputChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    if (name === 'number') {
      if (isAllowedKeyCode(event)) setContact((prev) => ({ ...prev, [name]: value }));
    } else setContact((prev) => ({ ...prev, [name]: value }));
  };

  const undoChanges = () => {
    setContact({ name, number });
    setIsValuesChanged(false);
  };

  const onSaveContact = () => {
    if (isIdInContacts(contacts, contact.name, id)) {
      toastMessage('warn', `There is an existing contact with name "${contact.name}"!`);
      return;
    }

    dispatch(fetchPatchSingleContact({ id, name: contact.name, number: contact.number }));
  };

  return (
    <>
      <ListItem className={styles.item}>
        <Tooltip title={`Name: ${contact.name} Number: ${contact.number}`} arrow>
          <ContactPhoneIcon className={styles.icon} />
        </Tooltip>
        <TextField
          label="Name"
          name="name"
          variant="standard"
          value={contact.name}
          onChange={onInputChange}
          error={error.name}
          helperText={error.name ? helperText.name : ' '}
          className={styles.input}
        />
        <TextField
          label="Number"
          name="number"
          variant="standard"
          value={contact.number}
          onChange={onInputChange}
          error={!isValidPhoneLength(contact.number)}
          helperText={!isValidPhoneLength(contact.number) ? helperText.number : ' '}
          className={styles.input}
        />

        <ButtonWrapper title="Undo changes" icon={<UndoIcon />} onClick={undoChanges} disabled={!isValuesChanged} />

        <ButtonWrapper
          title="Save contact"
          icon={<SaveIcon />}
          onClick={onSaveContact}
          disabled={isSaveButtonDisabled || !isValuesChanged}
          progress={isValuesChanged && <CustomizedCircularProgress />}
        />

        <ButtonWrapper
          title="Delete contact"
          icon={<DeleteIcon />}
          onClick={() => dispatch(fetchRemoveSingleContact({ id, name }))}
          progress={<CustomizedCircularProgress />}
        />
      </ListItem>
      <Divider light />
    </>
  );
}
