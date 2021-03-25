import styled from 'styled-components';
import PropTypes from 'prop-types';

import FlexContainer from 'components/FlexContainer';

export const InputContainer = styled(FlexContainer)`
  border-radius: var(--border-radius-sm);
  background-color: rgba(255, 255, 255, 0.15);
  height: 35px;
  color: ${({ color }) => color};
  width: 100%;

  &:hover {
    background-color: rgba(255, 255, 255, 0.25);
  }
`;

export const StyledInput = styled.input`
  border: 0
  border-radius: var(--border-radius-sm);
  height: 100%;
  padding: 0 var(--spacing-md);
  font-size: var(--font-size-default);
  background: transparent;
  color: inherit;
  width: calc(
    100% - ${({ hasIcon }) => (hasIcon ? '16px - var(--spacing-md) * 2' : '0px')}
  );

  &::placeholder,
  &:disabled {
    color: rgb(150, 150, 150);
  }
`;

StyledInput.propTypes = {
  hasIcon: PropTypes.bool.isRequired,
};

InputContainer.propTypes = {
  color: PropTypes.string.isRequired,
};
