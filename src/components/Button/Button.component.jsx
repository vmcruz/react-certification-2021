import React from 'react';
import PropTypes from 'prop-types';

import { StyledButton, StyledIcon } from './styled';

function Button({
  primary,
  icon,
  iconColor,
  iconSize,
  regularIcon,
  children,
  ...otherProps
}) {
  return (
    <StyledButton primary={primary} {...otherProps}>
      {icon && (
        <StyledIcon
          icon={[regularIcon ? 'far' : 'fas', icon]}
          size={iconSize}
          color={iconColor}
          data-testid="button-icon"
          pulse={icon === 'spinner'}
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
  primary: PropTypes.bool,
  regularIcon: PropTypes.bool,
};

Button.defaultProps = {
  icon: '',
  iconColor: 'white',
  iconSize: '1x',
  primary: false,
  regularIcon: false,
};

export default Button;
