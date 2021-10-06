import React, { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useContactInput } from 'hooks/useContactInput';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import { TextField } from '@mui/material';
import { ListItem } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import * as regexp from 'helpers/regexpPatterns';
import { fetchRemoveSingleContact, fetchPatchSingleContact } from 'redux/items/items-operations';
import * as helperText from 'helpers/helper-text';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import { Divider } from '@mui/material';
import { isAllowedKeyCode } from 'helpers/checkKeyCode';
import { isValidPhoneLength } from 'helpers/checkPhoneLength';

import styles from 'components/ContactsPage/contactPage.module.scss';

export default function ContactItem({ id, name, number }) {
  const [nameValue, setNameValue, isNameError] = useContactInput('', regexp.name, name);
  const [numberValue, setNumberValue] = useContactInput('', regexp.number, number);
  const [isValuesChanged, setIsValueChanged] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    if (nameValue !== name || numberValue !== number) setIsValueChanged(true);
    else setIsValueChanged(false);
  }, [nameValue, numberValue]);

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
        <Tooltip title="Save contact" arrow>
          <IconButton
            color="primary"
            aria-label="Edit contact"
            component="span"
            disabled={isSaveButtonDisabled() || !isValuesChanged}
            onClick={() => {
              dispatch(fetchPatchSingleContact({ id, name: nameValue, number: numberValue }));
              setIsValueChanged(false);
            }}
          >
            <SaveIcon />
          </IconButton>
        </Tooltip>

        <Tooltip title="Delete contact" arrow>
          <IconButton
            color="primary"
            aria-label="Remove contact"
            component="span"
            onClick={() => dispatch(fetchRemoveSingleContact({ id, name }))}
          >
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </ListItem>
      <Divider light />
    </>
  );
}
