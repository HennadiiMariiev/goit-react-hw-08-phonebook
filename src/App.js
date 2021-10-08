import { useDispatch, useSelector } from 'react-redux';
import { lazy, Suspense, useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { PrivateRoute } from 'components/AppRoutes/PrivateRoute';
import { PublicRoute } from 'components/AppRoutes/PublicRoute';
import { ToastContainer } from 'react-toastify';
import MenuAppBar from 'components/MenuAppBar/MenuAppBar';
import { Footer } from 'components/Footer/Footer';
import { CustomContainer } from 'components/CustomContainer/CustomContainer';
import * as authOperations from 'redux/auth/auth-operations';
import { getIsFetching } from 'redux/auth/auth-selectors';
import { CircularProgress } from '@mui/material';
import 'react-toastify/dist/ReactToastify.css';

import styles from './components/App/app.module.scss';

const HomePage = lazy(() => import('components/HomePage/HomePage' /* webpackChunkName: "home-page"*/));
const TemplateForm = lazy(() => import('components/TemplateForm/TemplateForm' /* webpackChunkName: "form-page"*/));
const ContactsPage = lazy(() => import('components/ContactsPage/ContactsPage' /* webpackChunkName: "contacts-page"*/));

export default function App() {
  const dispatch = useDispatch();
  const isFetching = useSelector(getIsFetching);

  useEffect(() => {
    dispatch(authOperations.fetchCurrentUser());
  }, [dispatch]);

  return (
    <div>
      <MenuAppBar />

      {!isFetching ? (
        <CustomContainer>
          <Suspense fallback={<CircularProgress className={styles.loader} />}>
            <Switch>
              <Route path="/" exact>
                <HomePage />
              </Route>
              <PublicRoute path="/login" redirectTo="/contacts" restricted exact>
                <TemplateForm type="login" />
              </PublicRoute>
              <PublicRoute path="/register" redirectTo="/contacts" restricted exact>
                <TemplateForm type="register" />
              </PublicRoute>
              <PrivateRoute path="/contacts" redirectTo="/login" restricted exact>
                <ContactsPage />
              </PrivateRoute>
              <Redirect to="/" />
            </Switch>
          </Suspense>
        </CustomContainer>
      ) : (
        <CircularProgress className={styles.loader} />
      )}

      <Footer />
      <ToastContainer position="bottom-right" />
    </div>
  );
}
