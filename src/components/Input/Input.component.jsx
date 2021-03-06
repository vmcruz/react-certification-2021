import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { InputContainer, StyledInput } from './styled';

function Input({ icon, ...otherProps }) {
  return (
    <InputContainer>
      {icon && <FontAwesomeIcon icon={icon} />}
      <StyledInput {...otherProps} />
    </InputContainer>
  );
}

Input.propTypes = {
  icon: PropTypes.string,
};

Input.defaultProps = {
  icon: '',
};

export default Input;
