import React from 'react';
import { render } from 'testing-utils';
import Layout from '../Layout.component';

describe('Layout component', () => {
  it('renders with children', () => {
    const { getByTestId } = render(
      <Layout>
        <div data-testid="children-test">Test</div>
      </Layout>
    );

    expect(getByTestId('children-test')).toBeInTheDocument();
  });
});
