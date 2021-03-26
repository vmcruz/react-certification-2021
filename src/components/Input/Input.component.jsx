import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { InputContainer, StyledInput } from './styled';

const Input = React.forwardRef(
  ({ icon, 'data-testid': dataTestid, color, className, ...otherProps }, ref) => {
    return (
      <InputContainer color={color} className={className}>
        {icon && (
          <FontAwesomeIcon
            icon={icon}
            pulse={icon === 'spinner'}
            data-testid="input-icon"
          />
        )}
        <StyledInput
          data-testid={dataTestid}
          {...otherProps}
          hasIcon={Boolean(icon)}
          ref={ref}
        />
      </InputContainer>
    );
  }
);

Input.propTypes = {
  icon: PropTypes.string,
  color: PropTypes.string,
};

Input.defaultProps = {
  icon: '',
  color: '#fff',
};

export default Input;
