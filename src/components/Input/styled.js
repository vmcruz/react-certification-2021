import styled from 'styled-components';
import FlexContainer from 'components/FlexContainer';

const InputContainer = styled(FlexContainer)`
  border-radius: var(--border-radius-sm);
  background-color: rgba(255, 255, 255, 0.15);
  height: 35px;
  color: #fff;
  padding: 0 var(--spacing-lg);

  &:hover {
    background-color: rgba(255, 255, 255, 0.25);
  }
`;

const StyledInput = styled.input`
  border: 0;
  height: 100%;
  padding: 0 var(--spacing-sm);
  font-size: var(--font-size-default);
  background: transparent;
  color: inherit;

  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }
`;

export { InputContainer, StyledInput };
