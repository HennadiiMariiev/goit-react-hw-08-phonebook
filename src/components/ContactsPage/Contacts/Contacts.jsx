import {
  StyledItem,
  StyledName,
  StyledNumber,
  StyledDiv,
  StyledList,
  StyledSubTitle,
} from './StyledContactsComponents';

import ContactItem from 'components/ContactsPage/ContactItem/ContactItem';
import Divider from '@mui/material/Divider';

import { StyledBanner } from 'components/AppComponents/AppComponents';

import { fetchRemoveAllContacts } from 'redux/items/items-operations';
import { useSelector, useDispatch } from 'react-redux';
import { getFilteredContacts, getState } from 'redux/contacts-selectors';
import { Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { Typography } from '@mui/material';

export const Contacts = () => {
  const state = useSelector(getState);
  const dispatch = useDispatch();

  const makeContactsList = getFilteredContacts(state).map(({ name, number, id }) => {
    return (
      <>
        <ContactItem id={id} name={name} number={number} key={id} />
        <Divider light />
      </>
    );
  });

  return (
    <div
      style={{
        minWidth: '700px',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
      }}
    >
      <Divider variant="middle" />
      {makeContactsList.length === 0 ? (
        <Typography
          variant="h3"
          component="h3"
          style={{
            padding: '1rem',
            background: '#FFFFFF',
            color: '#1976d2',
          }}
        >
          No contacts...
        </Typography>
      ) : (
        <div
          style={{
            padding: '1rem',
          }}
        >
          <Typography
            variant="h4"
            component="h4"
            style={{
              marginBottom: '1rem',
              color: '#1976d2',
            }}
          >
            Contacts
          </Typography>
          <StyledList>{makeContactsList}</StyledList>

          <Button variant="contained" startIcon={<DeleteIcon />} onClick={() => dispatch(fetchRemoveAllContacts())}>
            Delete all
          </Button>
        </div>
      )}
    </div>
  );
};
