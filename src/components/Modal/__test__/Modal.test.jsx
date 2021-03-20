import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import { itAcceptsAdditionalProps } from 'components/utils/testing-utils';
import Modal from '../Modal.component';

const props = {
  onDismiss: jest.fn(),
};

describe('Modal Component', () => {
  beforeEach(() => {
    props.onDismiss.mockClear();
  });

  itAcceptsAdditionalProps(Modal, props);

  it('has a close option', () => {
    const { getByTestId } = render(<Modal {...props} />);

    const icon = getByTestId('modal-close-icon');

    expect(icon).toBeInTheDocument();
    expect(icon).toHaveClass('fa-times-circle');

    fireEvent.click(icon);

    expect(props.onDismiss).toHaveBeenCalledTimes(1);
  });

  it('stops click propagation to overlay component', () => {
    const { getByTestId } = render(<Modal {...props} />);

    const modalContent = getByTestId('modal-content');

    fireEvent.click(modalContent);

    expect(props.onDismiss).toHaveBeenCalledTimes(0);
  });

  it('renders with children', () => {
    const { getByTestId } = render(
      <Modal {...props}>
        <div data-testid="div-children">Test</div>
      </Modal>
    );

    const divChildren = getByTestId('div-children');
    expect(divChildren).toBeInTheDocument();
    expect(divChildren.textContent).toEqual('Test');
  });
});
