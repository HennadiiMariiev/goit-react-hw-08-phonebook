import React, { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useContactInput } from 'hooks/useContactInput';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import { TextField } from '@mui/material';
import { ListItem } from '@mui/material';
import * as regexp from 'helpers/regexpPatterns';
import { fetchRemoveSingleContact, fetchPatchSingleContact } from 'redux/items/items-operations';

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
    <ListItem>
      <TextField
        label="Name"
        variant="standard"
        value={nameValue}
        onChange={(e) => setNameValue(e.target.value)}
        error={isNameError}
        helperText={isNameError ? 'Min 2 letters & start with capital letter.' : ' '}
      />

      <TextField
        label="Number"
        variant="standard"
        value={numberValue}
        onChange={(e) => setNumberValue(e.target.value)}
        error={isNumberError}
        helperText={isNumberError ? 'Should contain 10 digits, - and ( ).' : ' '}
      />

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

      <IconButton
        color="primary"
        aria-label="Remove contact"
        component="span"
        onClick={() => dispatch(fetchRemoveSingleContact({ id, name }))}
      >
        <DeleteIcon />
      </IconButton>
    </ListItem>
  );
}
