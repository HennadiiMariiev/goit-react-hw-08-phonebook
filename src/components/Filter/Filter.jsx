import { setFilter } from 'redux/filter/filter-actions';
import { getItems, getFilter } from 'redux/contacts-selectors';

import { TextField } from '@mui/material';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

export const Filter = () => {
  const items = useSelector(getItems);

  const dispatch = useDispatch();

  return (
    <TextField
      label="Search name"
      variant="outlined"
      onChange={(event) => dispatch(setFilter(event.target.value))}
      disabled={items.length ? false : true}
      style={{
        marginBottom: '2rem',
        background: '#FFFFFF',
        minWidth: '350px',
      }}
    />
  );
};
