import styled from 'styled-components';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const StyledButton = styled.button`
  background: transparent;
  border: 0;
  padding: var(--spacing-sm);
  margin-right: var(--spacing-md);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const StyledIcon = styled(FontAwesomeIcon)`
  color: ${({ color }) => color};
  margin-right: var(--spacing-md);
  transition: color 300ms;
`;

StyledIcon.propTypes = {
  color: PropTypes.string,
};

StyledIcon.defaultProps = {
  color: 'white',
};
