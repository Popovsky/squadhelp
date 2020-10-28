import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

function AuthRoute({ redirectTo, ...rest }) {
  const user = useSelector(state => state.auth.user);
  if (user) {
    return <Route {...rest} />;
  }
  return <Redirect to={redirectTo} />;
}

AuthRoute.defaultProps = {
  redirectTo: '/login',
};

export default AuthRoute;
