import React from 'react';
import { render } from '@testing-library/react';

import Input from '../Input.component';

describe('Input component', () => {
  it('renders component with props', () => {
    const { getByRole } = render(
      <Input placeholder="Test..." value="some value" onChange={() => {}} />
    );

    const input = getByRole('textbox');

    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('placeholder', 'Test...');
    expect(input.value).toEqual('some value');
  });

  it('renders with unanimated icon', () => {
    const { getByTestId } = render(<Input data-testid="container" icon="search" />);

    const icon = getByTestId('fontawesome-icon');

    expect(icon).toHaveClass('fa-search');
    expect(icon).not.toHaveClass('fa-pulse');
  });

  it('renders animated icon when icon is spinner', () => {
    const { getByTestId } = render(<Input data-testid="container" icon="spinner" />);

    const icon = getByTestId('fontawesome-icon');

    expect(icon).toHaveClass('fa-pulse');
  });
});
