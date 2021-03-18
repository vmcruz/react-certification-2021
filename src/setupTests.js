// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/extend-expect';

import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faSearch,
  faBars,
  faToggleOff,
  faToggleOn,
  faSpinner,
  faTimesCircle,
  faHome,
} from '@fortawesome/free-solid-svg-icons';

library.add({
  faSearch,
  faBars,
  faToggleOff,
  faToggleOn,
  faSpinner,
  faTimesCircle,
  faHome,
});

global.fetch = jest.fn().mockResolvedValue();

jest.mock('config', () => ({
  youtube: {
    api: '<YOUTUBE_API>',
    apiKey: '<YOUTUBE_API_KEY>',
    maxResults: 24,
  },
}));
