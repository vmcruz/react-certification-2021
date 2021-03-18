import React from 'react';
import PropTypes from 'prop-types';

import Overlay from 'components/Overlay';
import { Content, DismissIcon } from './styled';

function Modal({ onDismiss, children, ...otherProps }) {
  return (
    <Overlay onDismiss={onDismiss} {...otherProps}>
      <Content data-testid="modal-content" onClick={(e) => e.stopPropagation()}>
        <DismissIcon
          icon="times-circle"
          onClick={onDismiss}
          size="2x"
          data-testid="fontawesome-icon"
          role="button"
        />
        {children}
      </Content>
    </Overlay>
  );
}

Modal.propTypes = {
  onDismiss: PropTypes.func.isRequired,
};

export default Modal;
