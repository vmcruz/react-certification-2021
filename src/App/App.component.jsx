import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import HomePage from 'pages/Home';
import DetailsView from 'pages/DetailsView';
import ErrorPage from 'pages/ErrorPage';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={['/', '/search/:query']}>
          <HomePage />
        </Route>
        <Route exact path="/watch/:videoId">
          <DetailsView />
        </Route>
        <Route path="*">
          <ErrorPage />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
