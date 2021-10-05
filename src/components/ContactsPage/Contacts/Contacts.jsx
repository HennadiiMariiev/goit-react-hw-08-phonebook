import {
  StyledItem,
  StyledName,
  StyledNumber,
  StyledDiv,
  StyledList,
  StyledSubTitle,
  StyledButton,
} from './StyledContactsComponents';

import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';

import { TextField } from '@mui/material';
import ContactItem from 'components/ContactsPage/ContactItem/ContactItem';

import { StyledBanner } from 'components/AppComponents/AppComponents';

import { StyledButton as StyledPrimaryButton } from 'components/Form/StyledFormComponents';
import { fetchRemoveSingleContact, fetchRemoveAllContacts } from 'redux/items/items-operations';
import { useSelector, useDispatch } from 'react-redux';
import { getFilteredContacts, getState, getItems, getFilter } from 'redux/contacts-selectors';
import { useMemo } from 'react';

export const Contacts = () => {
  const state = useSelector(getState);
  const dispatch = useDispatch();

  const makeContactsList = getFilteredContacts(state).map(({ name, number, id }) => {
    return <ContactItem id={id} name={name} number={number} key={id} />;
  });

  return (
    <StyledDiv>
      {makeContactsList.length === 0 ? (
        <StyledBanner>No contacts...</StyledBanner>
      ) : (
        <>
          <StyledSubTitle>Contacts</StyledSubTitle>
          <StyledList>{makeContactsList}</StyledList>
          <StyledPrimaryButton
            onClick={() => dispatch(fetchRemoveAllContacts())}
            style={{ backgroundColor: '#FAFAFA' }}
          >
            Remove all
          </StyledPrimaryButton>
        </>
      )}
    </StyledDiv>
  );
};
