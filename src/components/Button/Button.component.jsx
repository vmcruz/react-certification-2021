import React from 'react';
import PropTypes from 'prop-types';

import { StyledButton, StyledIcon } from './styled';

function Button({ icon, iconColor, round, children, ...otherProps }) {
  return (
    <StyledButton {...otherProps}>
      {icon && (
        <StyledIcon icon={icon} color={iconColor} data-testid="fontawesome-icon" />
      )}
      {children}
    </StyledButton>
  );
}

Button.propTypes = {
  icon: PropTypes.string,
  iconColor: PropTypes.string,
  round: PropTypes.bool,
};

Button.defaultProps = {
  icon: '',
  iconColor: 'white',
  round: false,
};

export default Button;
