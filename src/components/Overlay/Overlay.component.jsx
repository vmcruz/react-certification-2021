import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import { BackgroundContainer, Container, DismissIcon } from './styled';

function Overlay({ children, scroll, onDismiss }) {
  function handleDismiss() {
    if (!scroll) {
      document.body.style.overflow = 'auto';
    }

    onDismiss();
  }

  useEffect(() => {
    if (!scroll) {
      document.body.style.overflow = 'hidden';
    }
  }, [scroll]);

  async function handleKeyUp(e) {
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
    <BackgroundContainer>
      <Container fluid>
        <DismissIcon icon="times-circle" onClick={handleDismiss} size="2x" />
        {children}
      </Container>
    </BackgroundContainer>
  );
}

Overlay.propTypes = {
  scroll: PropTypes.bool,
  onDismiss: PropTypes.func,
};

Overlay.defaultProps = {
  scroll: false,
  onDismiss: () => {},
};

export default Overlay;
