import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useGlobalState } from 'providers/Global';

function ProtectedRoute({ children, ...rest }) {
  const { state } = useGlobalState();

  if (!state.user) {
    return <Redirect to={{ pathname: '/login', state: { from: rest.path } }} />;
  }

  return <Route {...rest}>{children}</Route>;
}

export default ProtectedRoute;
