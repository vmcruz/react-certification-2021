import React from 'react';
import { render, fireEvent } from '@testing-library/react';

function itAcceptsAdditionalProps(Component, requiredProps) {
  it('accepts additional props', () => {
    const onClickMock = jest.fn();
    const { getByTestId } = render(
      <Component onClick={onClickMock} data-testid="component-test" {...requiredProps} />
    );
    const component = getByTestId('component-test');

    fireEvent.click(component);

    expect(onClickMock).toHaveBeenCalledTimes(1);
  });
}

export { itAcceptsAdditionalProps };
