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

export default function ContactItem({ id, name, number }) {
  const [nameValue, setNameValue, isNameError] = useContactInput('', name, regexp.name);
  const [numberValue, setNumberValue, isNumberError] = useContactInput('', number, regexp.number);
  const [isValuesChanged, setIsValueChanged] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    if (nameValue !== name || numberValue !== number) setIsValueChanged(true);
    else setIsValueChanged(false);
  }, [nameValue, numberValue]);

  return (
    <ListItem
      style={{
        background: '#FFFFFF',
        padding: '1rem 2rem',
        minHeight: '5.5rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
      }}
    >
      <Tooltip title={`Name: ${nameValue} Number: ${numberValue}`} arrow>
        <ContactPhoneIcon style={{ marginRight: '1rem', alignSelf: 'center', color: '#1976d2' }} />
      </Tooltip>
      <TextField
        // label="Name"
        variant="standard"
        value={nameValue}
        onChange={(e) => setNameValue(e.target.value)}
        error={isNameError}
        helperText={isNameError ? helperText.name : ''}
        style={{ marginRight: '0.5rem', minWidth: '250px' }}
      />

      <TextField
        // label="Number"
        variant="standard"
        value={numberValue}
        onChange={(e) => setNumberValue(e.target.value)}
        error={isNumberError}
        helperText={isNumberError ? helperText.number : ''}
        style={{ marginRight: '0.5rem', minWidth: '250px' }}
      />
      <Tooltip title="Save contact" arrow>
        <IconButton
          color="primary"
          aria-label="Edit contact"
          component="span"
          disabled={Boolean(!isValuesChanged || isNameError || isNumberError)}
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
  );
}
