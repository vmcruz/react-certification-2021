// from https://testing-library.com/docs/react-testing-library/setup/#custom-render

import React from 'react';
import { render } from '@testing-library/react';
import GlobalProvider from 'providers/Global';

const AllTheProviders = ({ children }) => {
  return <GlobalProvider>{children}</GlobalProvider>;
};

const customRender = (ui, options) =>
  render(ui, { wrapper: AllTheProviders, ...options });

// re-export everything
export * from '@testing-library/react';

// override render method
export { customRender as render };
