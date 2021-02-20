import React from 'react';
import PropTypes from 'prop-types';

import Text from 'components/Text';
import { StyledButton, StyledIcon } from './styled';

function Button({ icon, color, round, children, ...otherProps }) {
  return (
    <StyledButton {...otherProps}>
      {icon && <StyledIcon icon={icon} />}
      <Text color={color} size="md">
        {children}
      </Text>
    </StyledButton>
  );
}

Button.propTypes = {
  icon: PropTypes.string,
  color: PropTypes.string,
  round: PropTypes.bool,
};

Button.defaultProps = {
  icon: '',
  color: 'white',
  round: false,
};

export default Button;
