import React, { useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';

import { OverlayLayer } from './styled';

function Overlay({ children, onDismiss, ...otherProps }) {
  const handleKeyUp = useCallback(
    (e) => {
      // ESC
      if (e.keyCode === 27) {
        onDismiss();
      }
    },
    [onDismiss]
  );

  useEffect(() => {
    // runs on mount
    window.addEventListener('keyup', handleKeyUp);
    document.body.style.overflow = 'hidden';

    return () => {
      // runs on unmount
      window.removeEventListener('keyup', handleKeyUp);
      document.body.style.overflow = 'auto';
    };
  }, [handleKeyUp]);

  return (
    <OverlayLayer onClick={onDismiss} {...otherProps}>
      {children}
    </OverlayLayer>
  );
}

Overlay.propTypes = {
  onDismiss: PropTypes.func.isRequired,
};

export default Overlay;
