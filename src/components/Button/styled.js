import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const StyledButton = styled.button`
  background: transparent;
  border: 0;
  padding: var(--spacing-sm);
  margin-right: var(--spacing-md);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledIcon = styled(FontAwesomeIcon)`
  color: #fff;
  font-size: var(--font-size-lg);
  margin-right: var(--spacing-md);
`;

export { StyledButton, StyledIcon };
