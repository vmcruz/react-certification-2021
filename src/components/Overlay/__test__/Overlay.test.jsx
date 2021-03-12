import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import Overlay from '../Overlay.component';

const props = {
  onDismiss: jest.fn(),
  'data-testid': 'overlay',
  scroll: true,
};

const keys = {
  ESC: 27,
  RETURN: 13,
};

describe('Overlay component', () => {
  beforeEach(() => {
    props.onDismiss.mockClear();
    document.body.style.overflow = '';
  });

  it('renders with default props', () => {
    const { getByTestId } = render(<Overlay {...props} />);

    const overlay = getByTestId('overlay');

    expect(overlay).toBeInTheDocument();
  });

  it('has a close option', () => {
    const { getByTestId } = render(<Overlay {...props} />);

    const icon = getByTestId('fontawesome-icon');

    expect(icon).toBeInTheDocument();
    expect(icon).toHaveClass('fa-times-circle');

    fireEvent.click(icon);

    expect(props.onDismiss).toHaveBeenCalledTimes(1);
  });

  it('triggers onDismiss when and only when Esc key is pressed', () => {
    render(<Overlay {...props} />);

    fireEvent.keyUp(global.window, { keyCode: keys.RETURN });

    expect(props.onDismiss).toHaveBeenCalledTimes(0);

    fireEvent.keyUp(global.window, { keyCode: keys.ESC });

    expect(props.onDismiss).toHaveBeenCalledTimes(1);
  });

  it('blocks body scrolling when scroll is set to false', () => {
    expect(document.body.style.overflow).toEqual('');

    render(<Overlay {...props} scroll={false} />);

    expect(document.body.style.overflow).toEqual('hidden');
  });

  it('unblocks body scrolling when scroll is set to false and onDismiss is triggered', () => {
    expect(document.body.style.overflow).toEqual('');

    render(<Overlay {...props} scroll={false} />);

    expect(document.body.style.overflow).toEqual('hidden');

    fireEvent.keyUp(global.window, { keyCode: keys.ESC });

    expect(document.body.style.overflow).toEqual('auto');
  });
});
