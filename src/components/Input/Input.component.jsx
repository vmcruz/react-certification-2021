import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { InputContainer, StyledInput } from './styled';

function Input({ icon, disabled, ...otherProps }) {
  return (
    <InputContainer disabled={disabled}>
      {icon && <FontAwesomeIcon icon={icon} pulse={icon === 'spinner'} />}
      <StyledInput {...otherProps} />
    </InputContainer>
  );
}

Input.propTypes = {
  icon: PropTypes.string,
  disabled: PropTypes.bool,
};

Input.defaultProps = {
  icon: '',
  disabled: false,
};

export default Input;
