import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import { OverlayLayer } from './styled';

function Overlay({ children, onDismiss, ...otherProps }) {
  function handleDismiss() {
    document.body.style.overflow = 'auto';
    onDismiss();
  }

  useEffect(() => {
    document.body.style.overflow = 'hidden';
  }, []);

  function handleKeyUp(e) {
    // ESC
    if (e.keyCode === 27) {
      handleDismiss();
    }
  }

  useEffect(() => {
    window.addEventListener('keyup', handleKeyUp);

    return () => window.removeEventListener('keyup', handleKeyUp);
  });

  return (
    <OverlayLayer onClick={handleDismiss} {...otherProps}>
      {children}
    </OverlayLayer>
  );
}

Overlay.propTypes = {
  onDismiss: PropTypes.func.isRequired,
};

export default Overlay;
