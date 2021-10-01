import { useEffect } from 'react';
import { Form } from 'components/Form/Form';
import { Filter } from 'components/Filter/Filter';
import { ToastContainer } from 'react-toastify';

import { StyledApp } from 'components/AppComponents/AppComponents';

import { useDispatch } from 'react-redux';

import 'react-toastify/dist/ReactToastify.css';
import { contactsOperations } from 'redux/items';
import { UserMenu } from 'components/NavBar/UserMenu';
import { useState } from 'react';
import { useTabContext } from 'components/ActiveTabContext/ActiveTabContext';

import MenuAppBar from 'components/MenuAppBar/MenuAppBar';

import { Switch, Route, Redirect } from 'react-router-dom';
import { lazy, Suspense } from 'react';

const HomePage = lazy(() => import('components/HomePage/HomePage' /* webpackChunkName: "home-page"*/));
const RegisterForm = lazy(() => import('components/RegisterForm/RegisterForm' /* webpackChunkName: "register-page"*/));
const SignInForm = lazy(() => import('components/SignInForm/SignInForm' /* webpackChunkName: "signin-page"*/));
const ContactsPage = lazy(() => import('components/ContactsPage/ContactsPage' /* webpackChunkName: "contacts-page"*/));

export default function App() {
  const dispatch = useDispatch();

  const tab = useTabContext();
  // useEffect(() => {
  //   dispatch(contactsOperations.fetchContacts());
  // }, [dispatch]);

  return (
    <div>
      <MenuAppBar />

      <Suspense fallback={<p>Loading...</p>}>
        <Switch>
          <Route path="/" exact>
            <HomePage />
          </Route>
          <Route path="/login" exact>
            <SignInForm />
          </Route>
          <Route path="/register" exact>
            <RegisterForm />
          </Route>
          <Route path="/contacts">
            <ContactsPage />
          </Route>
          {/*<Route path="/movies/:movieId/cast">
            <Cast />
          </Route>
          <Route path="/movies/:movieId/reviews">
            <Reviews />
          </Route>
          <Redirect to="/" /> */}
          {/* <Route component={NotFound} /> */}
        </Switch>
      </Suspense>

      {/* {tab.active === 'register' && <RegisterForm />}
        {tab.active === 'login' && <SignInForm />} */}

      {/* <Form />
      <Filter />
      <Contacts /> */}
      <ToastContainer />
    </div>
  );
}
