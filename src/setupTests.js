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

export const localStorageMock = (function localStorageMock() {
  let storage = {};

  const setItem = jest.fn((key, data) => {
    storage[key] = data;
  });

  const getItem = jest.fn((key) => storage[key]);

  const removeItem = jest.fn((key) => {
    delete storage[key];
  });

  const clear = jest.fn(() => {
    storage = {};
  });

  return {
    setItem,
    getItem,
    removeItem,
    clear,
    get length() {
      return Object.keys(storage).length;
    },
    mockClear: () => {
      storage = {};
      setItem.mockClear();
      getItem.mockClear();
      clear.mockClear();
      removeItem.mockClear();
    },
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});
