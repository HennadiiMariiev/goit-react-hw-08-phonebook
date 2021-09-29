import {
  StyledItem,
  StyledName,
  StyledNumber,
  StyledDiv,
  StyledList,
  StyledSubTitle,
  StyledButton,
} from './StyledContactsComponents';

import { StyledBanner } from 'components/AppComponents/AppComponents';

import { StyledButton as StyledPrimaryButton } from 'components/Form/StyledFormComponents';
import { fetchRemoveSingleContact, fetchRemoveAllContacts } from 'redux/items/items-operations';
import { useSelector, useDispatch } from 'react-redux';
import { getFilteredContacts, getState } from 'redux/contacts-selectors';

export const Contacts = () => {
  const state = useSelector(getState);
  const dispatch = useDispatch();

  const makeContactsList = getFilteredContacts(state).map(({ name, number, id }) => {
    return (
      <StyledItem key={id}>
        <StyledName>{name}</StyledName>
        <StyledNumber>{number}</StyledNumber>
        <StyledButton
          onClick={(event) => {
            dispatch(fetchRemoveSingleContact({ id: event.target.value, name }));
          }}
          value={id}
        >
          Remove
        </StyledButton>
      </StyledItem>
    );
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
