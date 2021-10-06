import React from 'react';

import { Contacts } from 'components/ContactsPage/Contacts/Contacts';
import { Filter } from 'components/Filter/Filter';
import { ContactForm } from 'components/ContactForm/ContactForm';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { contactsOperations } from 'redux/items';

import styles from 'components/ContactsPage/contactPage.module.scss';

export default function ContactsPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(contactsOperations.fetchContacts());
  }, [dispatch]);

  return (
    <div className={styles.wrapper}>
      <ContactForm />
      <Filter />
      <Contacts />
    </div>
  );
}
