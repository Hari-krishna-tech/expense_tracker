import React from 'react';
import { useHistory, Redirect, Route } from 'react-router-dom';
import Cookies from 'js-cookie';

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const token = Cookies.get('token');
  const history = useHistory();
  
  return (
    <Route
      {...rest}
      render={(props) =>
        token? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

export default ProtectedRoute;
