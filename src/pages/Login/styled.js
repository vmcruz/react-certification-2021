import styled from 'styled-components';

import FlexContainer from 'components/FlexContainer';
import Button from 'components/Button';
import Input from 'components/Input';

export const Container = styled(FlexContainer)`
  background-color: ${({ theme }) => theme.login.colors.background};
  border-radius: var(--border-radius-sm);
  width: 25%;
  min-width: 330px;
  box-shadow: 0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%),
    0px 1px 3px 0px rgb(0 0 0 / 12%);
`;

export const Submit = styled(Button)`
  border: 1px solid ${({ theme }) => theme.login.colors.submit};
  border-radius: var(--border-radius-sm);

  &:hover {
    background-color: rgba(0, 0, 0, 0.2);
  }
`;

export const FormInput = styled(Input)`
  border: 1px solid ${({ color }) => color};
`;
