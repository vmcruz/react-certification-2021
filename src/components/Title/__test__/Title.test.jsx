import React from 'react';
import { render } from '@testing-library/react';

import { itAcceptsAdditionalProps } from 'components/utils/testing-utils';
import Title from '../Title.component';

describe('Title Component', () => {
  itAcceptsAdditionalProps(Title);

  it('renders with children', () => {
    const { getByTestId } = render(
      <Title data-testid="title-component">Sample Title</Title>
    );

    const titleComponent = getByTestId('title-component');

    expect(titleComponent.textContent).toEqual('Sample Title');
  });

  it('renders the correct size', () => {
    const sizesMap = [
      { size: 'xsm', html: 'H5' },
      { size: 'sm', html: 'H4' },
      { size: 'md', html: 'H3' },
      { size: 'lg', html: 'H2' },
      { size: 'xlg', html: 'H1' },
    ];

    sizesMap.forEach((sizeObj) => {
      const { getByTestId, unmount } = render(
        <Title size={sizeObj.size} data-testid="title-component">
          Sample Title
        </Title>
      );

      const titleComponent = getByTestId('title-component');

      expect(titleComponent.nodeName).toEqual(sizeObj.html);

      unmount();
    });
  });

  it('renders the given color', () => {
    const { getByTestId } = render(
      <Title color="darkgray" data-testid="title-component">
        Sample Title
      </Title>
    );

    const titleComponent = getByTestId('title-component');

    expect(titleComponent).toHaveStyle('color: darkgray');
  });

  it('renders the defaults if not specified', () => {
    const { getByTestId } = render(
      <Title data-testid="title-component">Sample Title</Title>
    );

    const titleComponent = getByTestId('title-component');

    expect(titleComponent.nodeName).toEqual('H1');
    expect(titleComponent).toHaveStyle('color: black');
  });
});
