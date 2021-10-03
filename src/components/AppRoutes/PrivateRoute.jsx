import React from 'react';
import { Route, Redirect } from 'react-router';
import { useSelector } from 'react-redux';
import { getIsLoggedIn } from 'redux/auth/auth-selectors';

export function PrivateRoute({ children, redirectTo, ...routeProps }) {
  const isLoggedIn = useSelector(getIsLoggedIn);
  const shouldRedirect = !isLoggedIn && routeProps.restricted;
  console.log('shouldRedirect: ', shouldRedirect);

  return <Route {...routeProps}>{shouldRedirect ? <Redirect to={redirectTo} /> : children}</Route>;
}
