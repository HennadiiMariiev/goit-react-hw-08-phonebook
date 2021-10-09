import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useContactInput } from 'hooks/useContactInput';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import UndoIcon from '@mui/icons-material/Undo';
import { TextField, ListItem, Divider } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import * as regexp from 'helpers/regexpPatterns';
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
  const [nameValue, setNameValue, isNameError] = useContactInput('', regexp.name, name);
  const [numberValue, setNumberValue] = useContactInput('', regexp.number, number);
  const [isValuesChanged, setIsValuesChanged] = useState(false);

  const dispatch = useDispatch();
  const isLoading = useSelector(getIsLoading);
  const contacts = useSelector(getItems);

  useEffect(() => {
    if (nameValue !== name || numberValue !== number) setIsValuesChanged(true);
    else setIsValuesChanged(false);
  }, [nameValue, numberValue, name, number]);

  useEffect(() => {
    if (!isLoading) setIsValuesChanged(false);
  }, [isLoading]);

  const onInputChange = (event) => {
    switch (event.target.name) {
      case 'name':
        setNameValue(event.target.value);
        break;

      case 'number':
        if (isAllowedKeyCode(event)) setNumberValue(event.target.value);
        break;

      default:
        return;
    }
  };

  const undoChanges = () => {
    setNameValue(name);
    setNumberValue(number);
    setIsValuesChanged(false);
  };

  const onSaveContact = () => {
    if (isIdInContacts(contacts, nameValue, id)) {
      toastMessage('warn', `There is an existing contact with name "${nameValue}"!`);
      return;
    }

    dispatch(fetchPatchSingleContact({ id, name: nameValue, number: numberValue }));
  };

  const isSaveButtonDisabled = () => {
    if (isNameError || !isValidPhoneLength(numberValue)) return true;
    return false;
  };

  return (
    <>
      <ListItem className={styles.item}>
        <Tooltip title={`Name: ${nameValue} Number: ${numberValue}`} arrow>
          <ContactPhoneIcon className={styles.icon} />
        </Tooltip>
        <TextField
          label="Name"
          name="name"
          variant="standard"
          value={nameValue}
          onChange={onInputChange}
          error={isNameError}
          helperText={isNameError ? helperText.name : ' '}
          className={styles.input}
        />
        <TextField
          label="Number"
          name="number"
          variant="standard"
          value={numberValue}
          onChange={onInputChange}
          error={!isValidPhoneLength(numberValue)}
          helperText={!isValidPhoneLength(numberValue) ? helperText.number : ' '}
          className={styles.input}
        />

        <ButtonWrapper title="Undo changes" icon={<UndoIcon />} onClick={undoChanges} disabled={!isValuesChanged} />

        <ButtonWrapper
          title="Save contact"
          icon={<SaveIcon />}
          onClick={onSaveContact}
          disabled={isSaveButtonDisabled() || !isValuesChanged}
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
