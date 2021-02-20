import React from 'react';
import ReactDOM from 'react-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faSearch,
  faBars,
  faToggleOff,
  faToggleOn,
} from '@fortawesome/free-solid-svg-icons';

import GlobalStyles from 'components/GlobalStyles';
import App from 'components/App';

library.add({ faSearch, faBars, faToggleOff, faToggleOn });

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyles />
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
