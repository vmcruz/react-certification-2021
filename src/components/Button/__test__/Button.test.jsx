import React from 'react';
import { render } from '@testing-library/react';

import { itAcceptsAdditionalProps } from 'components/utils/testing-utils';
import Button from '../Button.component';

describe('Button component', () => {
  itAcceptsAdditionalProps(Button);

  it('renders with default props', () => {
    const { getByRole } = render(<Button>Test</Button>);
    const button = getByRole('button');

    expect(button).toBeInTheDocument();
    expect(button.textContent).toEqual('Test');
  });

  it('renders an icon', () => {
    const { getByTestId } = render(<Button icon="spinner" />);

    const icon = getByTestId('fontawesome-icon');

    expect(icon.nodeName).toEqual('svg');
    expect(icon).toHaveClass('fa-spinner');
    expect(icon).toHaveStyle('color: white');
  });

  it('renders an icon with color', () => {
    const { getByTestId } = render(<Button icon="spinner" iconColor="#f0f" />);
    const icon = getByTestId('fontawesome-icon');

    expect(icon).toHaveStyle('color: #f0f');
  });

  it('renders children with icon', () => {
    const { getByTestId } = render(
      <Button icon="spinner" iconColor="#f0f">
        <div data-testid="children-test">Test</div>
      </Button>
    );

    const icon = getByTestId('fontawesome-icon');
    const childrenText = getByTestId('children-test');

    expect(icon).toBeInTheDocument();
    expect(childrenText).toBeInTheDocument();
    expect(childrenText.textContent).toEqual('Test');
  });
});
