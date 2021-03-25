import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Home from 'pages/Home';
import Details from 'pages/Details';
import Login from 'pages/Login';
import Error from 'pages/Error';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={['/', '/search/:query']}>
          <Home />
        </Route>
        <Route exact path="/watch/:videoId">
          <Details />
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route path="*">
          <Error />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
