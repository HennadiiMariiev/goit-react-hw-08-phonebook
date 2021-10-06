import { ToastContainer } from 'react-toastify';
import { useDispatch } from 'react-redux';
import MenuAppBar from 'components/MenuAppBar/MenuAppBar';
import { Switch, Route, Redirect } from 'react-router-dom';
import { lazy, Suspense, useEffect } from 'react';
import { PrivateRoute } from 'components/AppRoutes/PrivateRoute';
import { PublicRoute } from 'components/AppRoutes/PublicRoute';
import * as authOperations from 'redux/auth/auth-operations';
import { CustomizedSnackbar } from 'components/CustomizedSnackbar/CustomizedSnackbar';
import { Footer } from 'components/Footer/Footer';
import 'react-toastify/dist/ReactToastify.css';

const HomePage = lazy(() => import('components/HomePage/HomePage' /* webpackChunkName: "home-page"*/));
const TemplateForm = lazy(() => import('components/TemplateForm/TemplateForm' /* webpackChunkName: "form-page"*/));
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

      <Footer></Footer>
      <CustomizedSnackbar />
      <ToastContainer />
    </div>
  );
}
