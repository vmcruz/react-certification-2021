import React from 'react';
import { render } from '@testing-library/react';

import { itAcceptsAdditionalProps } from 'components/utils/testing-utils';
import List from '../List.component';

describe('List Component', () => {
  itAcceptsAdditionalProps(List);
  itAcceptsAdditionalProps(List.Item);

  it('renders a list of items', () => {
    const { getByTestId, getAllByTestId } = render(
      <List data-testid="list-component">
        <List.Item data-testid="list-item">Item 1</List.Item>
        <List.Item data-testid="list-item">Item 2</List.Item>
      </List>
    );

    const list = getByTestId('list-component');
    expect(list.children).toHaveLength(2);

    const listItems = getAllByTestId('list-item');
    expect(listItems).toHaveLength(2);
    expect(listItems[0].textContent).toEqual('Item 1');
    expect(listItems[1].textContent).toEqual('Item 2');
  });
});
