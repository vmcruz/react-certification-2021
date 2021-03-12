import React from 'react';
import { render } from '@testing-library/react';

import { itAcceptsAdditionalProps } from 'components/utils/testing-utils';
import Error from '../Error.component';

describe('Error component', () => {
  itAcceptsAdditionalProps(Error, { message: 'test' });

  it('renders error message', () => {
    const { getByTestId } = render(<Error message="testing" />);
    const errorMessage = getByTestId('error-message');

    expect(errorMessage).toBeInTheDocument();
    expect(errorMessage.textContent).toEqual('testing');
  });
});
