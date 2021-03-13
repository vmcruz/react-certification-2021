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
} from '@fortawesome/free-solid-svg-icons';

import GlobalProvider from 'providers/Global';
import GlobalStyles from 'components/GlobalStyles';
import App from 'App';

library.add({ faSearch, faBars, faToggleOff, faToggleOn, faSpinner, faTimesCircle });

ReactDOM.render(
  <React.StrictMode>
    <GlobalProvider>
      <GlobalStyles />
      <App />
    </GlobalProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
