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
import ContactItem from 'components/ContactItem/ContactItem';

import { StyledBanner } from 'components/AppComponents/AppComponents';

import { StyledButton as StyledPrimaryButton } from 'components/Form/StyledFormComponents';
import { fetchRemoveSingleContact, fetchRemoveAllContacts } from 'redux/items/items-operations';
import { useSelector, useDispatch } from 'react-redux';
import { getFilteredContacts, getState, getItems, getFilter } from 'redux/contacts-selectors';
import { useMemo } from 'react';

export const Contacts = () => {
  const state = useSelector(getState);
  const items = useSelector(getItems);
  const filter = useSelector(getFilter);
  const dispatch = useDispatch();

  const getFilteredItems = useMemo(
    () =>
      function () {
        if (filter.trim() === '') {
          return items;
        }

        return items.filter((contact) => {
          console.log(
            'includes:',
            contact.name.toLowerCase(),
            filter.toLowerCase(),
            contact.name.toLowerCase().includes(filter.toLowerCase())
          );
          return contact.name.toLowerCase().includes(filter.toLowerCase());
        });
      },
    [items, filter]
  );

  const makeContactsList = getFilteredItems().map(({ name, number, id }) => {
    // console.log('{ name, number, id } ', { name, number, id });
    return <ContactItem id={id} name={name} number={number} />;
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
