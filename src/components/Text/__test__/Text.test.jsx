import React from 'react';
import { render } from '@testing-library/react';

import { itAcceptsAdditionalProps } from 'components/utils/testing-utils';
import Text from '../Text.component';

describe('Text Component', () => {
  itAcceptsAdditionalProps(Text);

  it('renders with children', () => {
    const { getByTestId } = render(<Text data-testid="text-component">Sample text</Text>);

    const textComponent = getByTestId('text-component');

    expect(textComponent.textContent).toEqual('Sample text');
  });

  it('renders the correct size', () => {
    const sizes = ['sm', 'md', 'lg', 'xlg'];

    sizes.forEach((size) => {
      const { getByTestId, unmount } = render(
        <Text size={size} data-testid="text-component">
          Sample text
        </Text>
      );

      const textComponent = getByTestId('text-component');

      expect(textComponent).toHaveStyle(`font-size: var(--font-size-${size})`);

      unmount();
    });
  });

  it('renders the given color', () => {
    const { getByTestId } = render(
      <Text color="darkgray" data-testid="text-component">
        Sample text
      </Text>
    );

    const textComponent = getByTestId('text-component');

    expect(textComponent).toHaveStyle('color: darkgray');
  });

  it('renders the defaults if not specified', () => {
    const { getByTestId } = render(<Text data-testid="text-component">Sample text</Text>);

    const textComponent = getByTestId('text-component');

    expect(textComponent).toHaveStyle('font-size: var(--font-size-md)');
    expect(textComponent).toHaveStyle('color: white');
  });
});
