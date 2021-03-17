import React from 'react';
import { render } from '@testing-library/react';

import { itAcceptsAdditionalProps } from 'components/utils/testing-utils';
import FlexContainer from '..';

describe('FlexContainer component', () => {
  itAcceptsAdditionalProps(FlexContainer);

  it('renders with default props', () => {
    const { getByTestId } = render(
      <FlexContainer data-testid="container">
        <div data-testid="children">Test</div>
      </FlexContainer>
    );

    const container = getByTestId('container');
    const children = getByTestId('children');

    expect(container).toHaveStyle('align-items: center');
    expect(container).toHaveStyle('justify-content: center');
    expect(container).toHaveStyle('flex-wrap: wrap');
    expect(container).toHaveStyle('flex-direction: row');
    expect(container).not.toHaveStyle('width: 100%');
    expect(children).toBeInTheDocument();
    expect(children.textContent).toEqual('Test');
  });

  it('renders the content as columns', () => {
    const { getByTestId } = render(<FlexContainer data-testid="container" column />);
    const container = getByTestId('container');

    expect(container).toHaveStyle('flex-wrap: initial');
    expect(container).toHaveStyle('flex-direction: column');
  });

  it('renders fluid', () => {
    const { getByTestId } = render(<FlexContainer data-testid="container" fluid />);
    const container = getByTestId('container');

    expect(container).toHaveStyle('width: 100%');
  });

  it('aligns items', () => {
    const { getByTestId } = render(
      <FlexContainer data-testid="container" align="flex-start" />
    );
    const container = getByTestId('container');

    expect(container).toHaveStyle('align-items: flex-start');
  });

  it('justifies content', () => {
    const { getByTestId } = render(
      <FlexContainer data-testid="container" justify="flex-end" />
    );
    const container = getByTestId('container');

    expect(container).toHaveStyle('justify-content: flex-end');
  });
});
