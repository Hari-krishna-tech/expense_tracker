import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import Cookies from 'js-cookie';

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const token = Cookies.get('token');
  return (
    <Route
      {...rest}
      render={(props) =>
        token ? <Component {...props} token={token} /> : <Redirect to="/login" />
      }
    />
  );
};

export default ProtectedRoute;
