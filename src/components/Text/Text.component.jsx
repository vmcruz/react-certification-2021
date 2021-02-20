import React from 'react';
import PropTypes from 'prop-types';

import { StyledText } from './styled';

function Text({ color, size, children, ...otherProps }) {
  return (
    <StyledText size={size} color={color} {...otherProps}>
      {children}
    </StyledText>
  );
}

Text.propTypes = {
  color: PropTypes.string,
  size: PropTypes.oneOf(['sm', 'md', 'lg', 'xlg']),
};

Text.defaultProps = {
  color: 'white',
  size: 'md',
};

export default Text;
