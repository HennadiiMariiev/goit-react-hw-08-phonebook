import { useEffect } from 'react';
import { Form } from 'components/Form/Form';
import { Contacts } from 'components/Contacts/Contacts';
import { Filter } from 'components/Filter/Filter';
import { ToastContainer } from 'react-toastify';

import { StyledApp } from 'components/AppComponents/AppComponents';

import { useDispatch } from 'react-redux';

import 'react-toastify/dist/ReactToastify.css';
import { contactsOperations } from 'redux/items';

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(contactsOperations.fetchContacts());
  }, [dispatch]);

  return (
    <StyledApp>
      <Form />
      <Filter />
      <Contacts />
      <ToastContainer />
    </StyledApp>
  );
}
