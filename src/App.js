import { ToastContainer } from 'react-toastify';

import { useDispatch } from 'react-redux';

import 'react-toastify/dist/ReactToastify.css';

import MenuAppBar from 'components/MenuAppBar/MenuAppBar';

import { Switch, Route, Redirect } from 'react-router-dom';
import { lazy, Suspense, useEffect } from 'react';
import { PrivateRoute } from 'components/AppRoutes/PrivateRoute';
import { PublicRoute } from 'components/AppRoutes/PublicRoute';
import * as authOperations from 'redux/auth/auth-operations';

const HomePage = lazy(() => import('components/HomePage/HomePage' /* webpackChunkName: "home-page"*/));
const RegisterForm = lazy(() => import('components/RegisterForm/RegisterForm' /* webpackChunkName: "register-page"*/));
const SignInForm = lazy(() => import('components/SignInForm/SignInForm' /* webpackChunkName: "signin-page"*/));
const ContactsPage = lazy(() => import('components/ContactsPage/ContactsPage' /* webpackChunkName: "contacts-page"*/));

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authOperations.fetchCurrentUser());
  }, [dispatch]);

  return (
    <div>
      <MenuAppBar />

      <Suspense fallback={<p>Loading...</p>}>
        <Switch>
          <Route path="/" exact>
            <HomePage />
          </Route>
          <PublicRoute path="/login" redirectTo="/contacts" restricted exact>
            <SignInForm />
          </PublicRoute>
          <PublicRoute path="/register" redirectTo="/contacts" restricted exact>
            <RegisterForm />
          </PublicRoute>
          <PrivateRoute path="/contacts" redirectTo="/login" restricted exact>
            <ContactsPage />
          </PrivateRoute>
          <Redirect to="/" />
        </Switch>
      </Suspense>

      <ToastContainer />
    </div>
  );
}
