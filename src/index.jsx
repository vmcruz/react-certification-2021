import React from 'react';
import ReactDOM from 'react-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faSearch,
  faBars,
  faToggleOff,
  faToggleOn,
  faSpinner,
  faTimesCircle,
  faHome,
  faHeart as fasHeart,
} from '@fortawesome/free-solid-svg-icons';
import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons';

import GlobalProvider from 'providers/Global';
import GlobalStyles from 'themes/GlobalStyles';
import App from 'App';

library.add({
  faSearch,
  faBars,
  faToggleOff,
  faToggleOn,
  faSpinner,
  faTimesCircle,
  faHome,
  fasHeart,
  farHeart,
});

ReactDOM.render(
  <React.StrictMode>
    <GlobalProvider>
      <GlobalStyles />
      <App />
    </GlobalProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
