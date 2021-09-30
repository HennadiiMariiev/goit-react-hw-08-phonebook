import { useEffect } from 'react';
import { Form } from 'components/Form/Form';
import { Contacts } from 'components/Contacts/Contacts';
import { Filter } from 'components/Filter/Filter';
import { ToastContainer } from 'react-toastify';

import { StyledApp } from 'components/AppComponents/AppComponents';

import { useDispatch } from 'react-redux';

import 'react-toastify/dist/ReactToastify.css';
import { contactsOperations } from 'redux/items';
import { RegisterForm } from 'components/RegisterForm/RegisterForm';
import { UserMenu } from 'components/NavBar/UserMenu';
import { useState } from 'react';
import { useTabContext } from 'components/ActiveTabContext/ActiveTabContext';

import MenuAppBar from 'components/MenuAppBar/MenuAppBar';
import { SignInForm } from 'components/SignInForm/SignInFrom';

export default function App() {
  const dispatch = useDispatch();

  const tab = useTabContext();
  // useEffect(() => {
  //   dispatch(contactsOperations.fetchContacts());
  // }, [dispatch]);

  return (
    <>
      <MenuAppBar />
      <StyledApp>
        <UserMenu />
        {tab.active === 'register' && <RegisterForm />}
        {tab.active === 'login' && <SignInForm />}

        {/* <Form />
      <Filter />
      <Contacts /> */}
        <ToastContainer />
      </StyledApp>
    </>
  );
}
