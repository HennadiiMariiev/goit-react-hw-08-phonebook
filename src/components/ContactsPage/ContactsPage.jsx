import React from 'react';

import { Contacts } from 'components/ContactsPage/Contacts/Contacts';
import { Filter } from 'components/Filter/Filter';
import { ContactForm } from 'components/Form/Form';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { contactsOperations } from 'redux/items';

export default function ContactsPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(contactsOperations.fetchContacts());
  }, [dispatch]);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <ContactForm />
      <Filter />
      <Contacts />
    </div>
  );
}
