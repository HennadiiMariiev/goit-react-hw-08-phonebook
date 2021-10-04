import React, { useEffect } from 'react';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import { TextField } from '@mui/material';

import { fetchRemoveSingleContact, fetchPatchSingleContact } from 'redux/items/items-operations';

export default function ContactItem({ id, name, number }) {
  const dispatch = useDispatch();

  const [nameValue, setNameValue] = useState('');
  const [numberValue, setNumberValue] = useState('');

  const [isValuesChanged, setIsValueChanged] = useState(false);

  useEffect(() => {
    setNameValue(name);
    setNumberValue(number);
  }, []);

  useEffect(() => {
    if (nameValue !== name || numberValue !== number) setIsValueChanged(true);
    else setIsValueChanged(false);
  }, [nameValue, numberValue]);

  return (
    <li key={id}>
      <TextField label="Name" variant="standard" value={nameValue} onChange={(e) => setNameValue(e.target.value)} />

      <TextField
        label="Number"
        variant="standard"
        value={numberValue}
        onChange={(e) => setNumberValue(e.target.value)}
      />

      <IconButton
        color="primary"
        aria-label="Edit contact"
        component="span"
        disabled={!isValuesChanged}
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
        onClick={() => {
          console.log('{id, name}: ', { id, name });
          dispatch(fetchRemoveSingleContact({ id, name }));
        }}
      >
        <DeleteIcon />
      </IconButton>
    </li>
  );
}
