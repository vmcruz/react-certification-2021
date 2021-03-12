import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { InputContainer, StyledInput } from './styled';

function Input({ icon, 'data-testid': dataTestid, ...otherProps }) {
  return (
    <InputContainer data-testid={dataTestid}>
      {icon && (
        <FontAwesomeIcon
          icon={icon}
          pulse={icon === 'spinner'}
          data-testid="fontawesome-icon"
        />
      )}
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
