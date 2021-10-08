import { setFilter } from 'redux/filter/filter-actions';
import { getItems } from 'redux/contacts-selectors';

import { TextField } from '@mui/material';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

import styles from './filter.module.scss';

export const Filter = () => {
  const items = useSelector(getItems);

  const dispatch = useDispatch();

  return (
    <TextField
      label="Search name"
      placeholder="Vasya Pupkin"
      variant="outlined"
      onChange={(event) => dispatch(setFilter(event.target.value))}
      disabled={items.length ? false : true}
      className={styles.filter}
    />
  );
};
