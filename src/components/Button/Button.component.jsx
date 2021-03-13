import React from 'react';
import PropTypes from 'prop-types';

import { StyledButton, StyledIcon } from './styled';

function Button({ icon, iconColor, iconSize, children, ...otherProps }) {
  return (
    <StyledButton {...otherProps}>
      {icon && (
        <StyledIcon
          icon={icon}
          size={iconSize}
          color={iconColor}
          data-testid="button-icon"
        />
      )}
      {children}
    </StyledButton>
  );
}

Button.propTypes = {
  icon: PropTypes.string,
  iconColor: PropTypes.string,
  iconSize: PropTypes.string,
};

Button.defaultProps = {
  icon: '',
  iconColor: 'white',
  iconSize: '1x',
};

export default Button;
